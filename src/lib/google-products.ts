import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';
import { Readable } from 'stream';
import { Product } from '@/types/product';
import fs from 'fs';
import path from 'path';

// Products Google Sheets configuration
let PRODUCTS_SHEET_ID = process.env.PRODUCTS_SHEET_ID || '1RXql2CacN5haqIEq7DM3ZgSLj8ml_KR8PzRJbjDb-As';

// Google Drive configuration
let GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '1q1tt-HIQOE3gthmNq_Kl1SX1FkuEZ1Si';

// Connection pooling
let authClient: JWT | null = null;
let productsWorksheet: any = null;
let productsWorksheetCacheTime = 0;
const WORKSHEET_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Create reusable auth client with correct private key
function getAuthClient(): JWT {
  if (!authClient) {
    try {
      // التحقق من وجود المتغيرات وإلا رمي Error
      if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
        throw new Error("GOOGLE_SHEETS_CLIENT_EMAIL is not defined in environment variables");
      }

      // استخدام المفتاح الصحيح مباشرة
      const correctPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDErvT2/t2bmBdn
tFJxiKor61Dk3VskW+SHk/PJIi0aga2tDRQNuui865cyfom2A/nRvLxdPSpPu4LC
MQGjkB8Qeo8jh2e29zZYj6tbTyl/UhvILxMU+jHliQ7ENacLYpfRiGWxxux+Tn6J
5XlTmrSklxIwW+ap4T5GbES8a6XNdCHHtdAKxTknIxnClpEhbjhVIb1IqKS/Tb5i
yfUp9N4wnEicThKUlzZ7eVuas7sGew0Wur6p4Ec/RzvudsdiAflNZgJxj12FYJPI
ZouDQpR8DY4/iVorskKiVntJ4Ys/CmRb1mE8o8r+VC8JijlYbaZ6of0cs5cNKPUf
R1lrllD7AgMBAAECggEAAR6RzFoU/s61y2ROV9EUTt2u/y53V1Sij1b7OzjTkuQM
DgEWDSH0MycQHDx2IjARmuz9EXbIp92EWACZZsnqM1jPOb+KipMLnyNqMUHZFZ1t
BQ2niSYHZKwMBnfbtIfiH1Isaf+c1vcxZy2ELEKkJo+pjdboEC11AkeZeI0QS4QM
IWvhLpH2kKs82J7LzjikkQxu4bKVSi08R1OeN4PR2x57CsFkitTEQ+FmmwSdXBjW
H9YhNmAQ63KVNwP+WuqLzkxifpcsTkJ4o28p7jg/J4zm6X1bl/IucmTgOEDA+jt6
w5tfUKa/AZq+RLfHRxbsfu5yZ6kARj6/OO3P/B32SQKBgQDx+rbHUNhIURa7imji
+wHiALAjDJDjLkgVtdin7HW3nEPHMmf784jELp3/OwZh+4Zbl0sKasTfUHCmrCEi
4YonKWrQqbc82ldw9GyK5DQhgsJqqonaPybIX2+0UHaDo4lVzwOnb8mbd66hGqYK
8uo6jFg2TILXpreQirGmcIIGFwKBgQDQFF4E/GZT63W1ev9nckw5t0ZpanGsdIWw
hpRGSSOdWyZLCCRW/X+f1wmykEFVzxxZL6Xj8VxnlJWdFZSHvO6/B7YEgAIQlemi
jLv7jcbQdBt3C4wjv2bVJdqwPLI/5VBUfwDDZH0UhMJ3p3stHU+LmejGDa5j8yAV
4A6NR/v+vQKBgQDDALZ3XVFOxfo53Eq2UG2uAbvwItpIGi4BQPB+MvKSqx1708U0
p4eaAa9V1e1I3Pfjq8LPfEd3Z03BI4n4oCVDdf8cdQizw4kf//nQ3CKets+SQiih
dq78XtyYRRec8hdkzVU2g8HGxeY28lDJFgVodV1JNNNkknfvxbVwWc6OtQKBgH14
+qTpCk9qecVgkOhxPNPE15mzjS5f6UnkLT8g1XAKydGO7FLkc/QPuJJLeIpk5IRH
PjJwlbcEGx/pJnKflBvva2vVQOl9bLAPSz/KY2vJx9IGTZA0166KMA/72cS746/A
EdbBHsejspxyis1Okmvs+DeNgm5U6jEmtb+t+5/FAoGATHsqxLokeg2aNenYBNgg
0f/2foq7levDhwFX9gavGJGkp3tn74pF0c8dJ1dcX1TOn/hIQOSPQn2sojvz04nI
WgkbIPQQG4v3+Qh6jy7knpZ+GKTjnD8lAUUdLBIjeG0tUieeMkPtosoZ6obm8YZc
jQexcfyPydIirjqtlP5XkVs=
-----END PRIVATE KEY-----`;
      
      console.log('[GoogleProducts] Using correct private key directly');
      
      authClient = new JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: correctPrivateKey,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive'
        ],
      });

      console.log('[GoogleProducts] JWT client created successfully with correct key');
    } catch (error) {
      console.error('[GoogleProducts] Failed to create JWT client:', error);
      throw new Error(`Failed to create Google auth client: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  return authClient;
}

// ==================== GOOGLE DRIVE FUNCTIONS ====================

// Initialize Google Drive client
function getDriveClient() {
  const auth = getAuthClient();
  return google.drive({ version: 'v3', auth });
}

// Upload image to Google Drive
export async function uploadImageToDrive(
  imageBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  try {
    console.log(`[GoogleDrive] Starting upload for: ${fileName}, size: ${imageBuffer.length} bytes, type: ${mimeType}`);
    console.log(`[GoogleDrive] Target folder ID: ${GOOGLE_DRIVE_FOLDER_ID}`);
    
    const drive = getDriveClient();
    
    const fileMetadata = {
      name: fileName,
      parents: [GOOGLE_DRIVE_FOLDER_ID],
    };

    const media = {
      mimeType,
      body: Readable.from(imageBuffer),
    };

    console.log(`[GoogleDrive] Creating file with metadata:`, fileMetadata);
    
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    console.log(`[GoogleDrive] File creation response:`, response.data);

    const fileId = response.data.id;
    if (!fileId) {
      throw new Error('Failed to get file ID from upload response');
    }

    console.log(`[GoogleDrive] File uploaded with ID: ${fileId}, setting permissions...`);

    // Make the file publicly viewable
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    console.log(`[GoogleDrive] Permissions set successfully for file: ${fileId}`);

    // Return the direct link to the image
    const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    console.log(`[GoogleDrive] Image uploaded successfully: ${imageUrl}`);
    
    return imageUrl;
  } catch (error) {
    console.error('[GoogleDrive] Error uploading image:', error);
    throw error;
  }
}
// Delete image from Google Drive
export async function deleteImageFromDrive(fileId: string): Promise<void> {
  try {
    console.log(`[GoogleDrive] Deleting file with ID: ${fileId}`);
    const drive = getDriveClient();
    await drive.files.delete({ fileId });
    console.log(`[GoogleDrive] File deleted successfully: ${fileId}`);
  } catch (error) {
    // Log error but don't throw, as failure to delete an image shouldn't block product deletion
    console.error(`[GoogleDrive] Error deleting file ${fileId}:`, error);
  }
}

// ==================== PRODUCTS GOOGLE SHEETS FUNCTIONS ====================

// Get or create products worksheet
async function getProductsWorksheet() {
  const now = Date.now();
  
  // Return cached worksheet if still valid
  // Temporarily disabling cache for debugging timeout issue
  // if (productsWorksheet && (now - productsWorksheetCacheTime) < WORKSHEET_CACHE_DURATION) {
  //   console.log('[GoogleSheetsProducts] Using cached worksheet (Cache Temporarily Disabled)');
  //   return productsWorksheet;
  // }
  console.log('[GoogleSheetsProducts] Cache temporarily disabled for debugging. Forcing fresh worksheet load.');

  console.log('[GoogleSheetsProducts] Connecting to Google Sheets...');
  console.log('[GoogleSheetsProducts] Sheet ID:', PRODUCTS_SHEET_ID);

  const auth = getAuthClient();
  const doc = new GoogleSpreadsheet(PRODUCTS_SHEET_ID, auth);
  
  try {
    console.log('[GoogleSheetsProducts] Loading document info...');
    await doc.loadInfo();
    console.log('[GoogleSheetsProducts] Document title:', doc.title);
    console.log('[GoogleSheetsProducts] Number of sheets:', doc.sheetCount);
    
    // Try to get the first sheet or create one
    let sheet = doc.sheetsByIndex[0];
    
    if (!sheet) {
      console.log('📝 Creating products worksheet...');
      sheet = await doc.addSheet({
        title: 'products',
        headerValues: [
          '_id',
          'name_ar',
          'name_en',
          'slug',
          'short_desc',
          'description',
          'price',
          'sale_price',
          'quantity',
          'category',
          'tags',
          'sku',
          'images',
          'isActive',
          'createdAt',
          'updatedAt'
        ]
      });
      console.log('✅ Products worksheet created');
    } else {
      console.log('[GoogleSheetsProducts] Found existing sheet:', sheet.title);
      console.log('[GoogleSheetsProducts] Sheet row count:', sheet.rowCount);
      
      // Always load headers to ensure they're available
      await sheet.loadHeaderRow();
      console.log('[GoogleSheetsProducts] Headers loaded:', sheet.headerValues);
      
      // Check if headers are properly set
      const expectedHeaders = [
        '_id', 'name_ar', 'name_en', 'slug', 'short_desc', 'description',
        'price', 'sale_price', 'quantity', 'category', 'tags', 'sku',
        'images', 'isActive', 'createdAt', 'updatedAt'
      ];
      
      const currentHeaders = sheet.headerValues;
      const headersMatch = expectedHeaders.every(header => currentHeaders.includes(header));
      
      if (!headersMatch || currentHeaders.length === 0) {
        console.log('[GoogleSheetsProducts] Headers mismatch or empty, setting headers...');
        await sheet.setHeaderRow(expectedHeaders);
        console.log('[GoogleSheetsProducts] Headers set successfully');
      }
    }
    
    // Cache the worksheet
    productsWorksheet = sheet;
    productsWorksheetCacheTime = now;
    
    return sheet;
  } catch (error) {
    console.error('❌ Failed to get products worksheet:', error);
    throw error;
  }
}

// Convert row to Product object
function rowToProduct(row: any): Product {
  try {
    return {
      _id: row.get('_id') || '',
      name_ar: row.get('name_ar') || '',
      name_en: row.get('name_en') || '',
      slug: row.get('slug') || '',
      short_desc: row.get('short_desc') || '',
      description: row.get('description') || '',
      price: parseFloat(row.get('price') || '0'),
      sale_price: row.get('sale_price') ? parseFloat(row.get('sale_price')) : null,
      quantity: parseInt(row.get('quantity') || '0'),
      category: row.get('category') || '',
      tags: row.get('tags') ? row.get('tags').split(',').map((tag: string) => tag.trim()) : [],
      sku: row.get('sku') || '',
      images: row.get('images') ? row.get('images').split(',').map((url: string) => ({
        url: url.trim(),
        alt: row.get('name_ar') || row.get('name_en') || ''
      })) : [],
      isActive: (() => {
        const value = row.get('isActive');
        return value === 'true' || value === true || value === 'TRUE' || value === 1 || value === '1';
      })(),
      createdAt: row.get('createdAt') ? new Date(row.get('createdAt')).toISOString() : new Date().toISOString(),
      updatedAt: row.get('updatedAt') ? new Date(row.get('updatedAt')).toISOString() : new Date().toISOString()
    };
  } catch (error) {
    console.error('[GoogleProducts] Error converting row to product:', error);
    // Return a default product if conversion fails
    return {
      _id: '',
      name_ar: 'منتج غير صحيح',
      name_en: 'Invalid Product',
      slug: 'invalid-product',
      short_desc: 'منتج غير صحيح',
      description: 'منتج غير صحيح',
      price: 0,
      sale_price: null,
      quantity: 0,
      category: 'other',
      tags: [],
      sku: '',
      images: [],
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

// Convert Product object to row data
function productToRowData(product: Product) {
  return {
    _id: product._id?.toString() || '',
    name_ar: product.name_ar,
    name_en: product.name_en,
    slug: product.slug,
    short_desc: product.short_desc,
    description: product.description,
    price: product.price.toString(),
    sale_price: product.sale_price?.toString() || '',
    quantity: product.quantity.toString(),
    category: product.category,
    tags: product.tags.join(','),
    sku: product.sku,
    images: product.images.map(img => typeof img === 'string' ? img : img.url).join(','),
    isActive: product.isActive.toString(),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  };
}

// Google Sheets Products Database operations
export class GoogleSheetsProductsDatabase {
  // Get all products
  static async getAllProducts(): Promise<Product[]> {
    try {
      console.log('[GoogleSheetsProducts] Getting all products');
      
      const sheet = await getProductsWorksheet();
      const rows = await sheet.getRows();
      
      // If no rows, return empty array
      if (!rows || rows.length === 0) {
        console.log('[GoogleSheetsProducts] No products found in sheet');
        return [];
      }
      
      console.log(`[GoogleSheetsProducts] Found ${rows.length} rows in sheet`);
      
      // Debug: log first row data
      if (rows.length > 0 && rows[0]) {
        console.log('[GoogleSheetsProducts] First row data:', {
          _id: rows[0].get('_id'),
          name_ar: rows[0].get('name_ar'),
          name_en: rows[0].get('name_en')
        });
      }
      
      const products = rows.map(rowToProduct);
      console.log(`[GoogleSheetsProducts] Converted ${products.length} products`);
      
      // Debug: log converted products
      products.forEach((product: Product, index: number) => {
        console.log(`[GoogleSheetsProducts] Product ${index + 1}: ID=${product._id}, Name=${product.name_ar}`);
      });
      
      const validProducts = products.filter((product: Product) => product._id !== '');
      
      console.log(`[GoogleSheetsProducts] Found ${validProducts.length} valid products`);
      return validProducts;
    } catch (error) {
      console.error('[GoogleSheetsProducts] Error getting all products:', error);
      // Return empty array instead of throwing error to prevent page crash
      return [];
    }
  }

  // Get product by ID
  static async getProductById(id: string): Promise<Product | null> {
    try {
      console.log(`[GoogleSheetsProducts] Getting product by ID: ${id}`);
      
      const sheet = await getProductsWorksheet();
      const rows = await sheet.getRows();
      
      const row = rows.find((r: any) => r.get('_id') === id);
      if (!row) {
        console.log(`[GoogleSheetsProducts] Product not found: ${id}`);
        return null;
      }
      
      const product = rowToProduct(row);
      console.log(`[GoogleSheetsProducts] Found product: ${product.name_ar}`);
      return product;
    } catch (error) {
      console.error(`[GoogleSheetsProducts] Error getting product ${id}:`, error);
      throw error;
    }
  }

  // Get product by slug
  static async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      console.log(`[GoogleSheetsProducts] Getting product by slug: ${slug}`);
      
      const sheet = await getProductsWorksheet();
      const rows = await sheet.getRows();
      
      const row = rows.find((r: any) => r.get('slug') === slug);
      if (!row) {
        console.log(`[GoogleSheetsProducts] Product not found with slug: ${slug}`);
        return null;
      }
      
      const product = rowToProduct(row);
      console.log(`[GoogleSheetsProducts] Found product: ${product.name_ar}`);
      return product;
    } catch (error) {
      console.error(`[GoogleSheetsProducts] Error getting product by slug ${slug}:`, error);
      throw error;
    }
  }

  // Add new product
  static async addProduct(productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      console.log(`[GoogleSheetsProducts] Adding product: ${productData.name_ar}`);
      
      const sheet = await getProductsWorksheet();
      
      // Generate new ID - use timestamp to ensure uniqueness
      const timestamp = Date.now();
      const rows = await sheet.getRows();
      const maxId = rows.reduce((max: number, row: any) => {
        const id = parseInt(row.get('_id') || '0');
        return id > max ? id : max;
      }, 0);
      
      // Use either maxId + 1 or timestamp-based ID for uniqueness
      const newId = Math.max(maxId + 1, Math.floor(timestamp / 1000));
      
      const product: Product = {
        ...productData,
        _id: newId.toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const rowData = productToRowData(product);
      await sheet.addRow(rowData);
      
      console.log(`[GoogleSheetsProducts] Product added successfully: ${product._id}`);
      return product;
    } catch (error) {
      console.error('[GoogleSheetsProducts] Error adding product:', error);
      throw error;
    }
  }

  // Update product
  static async updateProduct(id: string, updateData: Partial<Product>): Promise<boolean> {
    try {
      console.log(`[GoogleSheetsProducts] Updating product: ${id}`);
      
      const sheet = await getProductsWorksheet();
      const rows = await sheet.getRows();
      
      const row = rows.find((r: any) => r.get('_id') === id);
      if (!row) {
        console.log(`[GoogleSheetsProducts] Product not found for update: ${id}`);
        return false;
      }
      
      // Get current product data
      const currentProduct = rowToProduct(row);
      
      // Merge with update data
      const updatedProduct = {
        ...currentProduct,
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      // Update row
      const rowData = productToRowData(updatedProduct);
      Object.keys(rowData).forEach(key => {
        row.set(key, rowData[key as keyof typeof rowData]);
      });
      
      await row.save();
      
      console.log(`[GoogleSheetsProducts] Product updated successfully: ${id}`);
      return true;
    } catch (error) {
      console.error(`[GoogleSheetsProducts] Error updating product ${id}:`, error);
      throw error;
    }
  }

  // Delete product
  static async deleteProduct(id: string): Promise<boolean> {
    try {
      console.log(`[GoogleSheetsProducts] Deleting product: ${id}`);
      
      // Get product details first to get image URLs
      const productToDelete = await this.getProductById(id);

      if (!productToDelete) {
        console.log(`[GoogleSheetsProducts] Product not found for deletion: ${id}`);
        return false;
      }

      // Delete images from Google Drive
      if (productToDelete.images && productToDelete.images.length > 0) {
        console.log(`[GoogleSheetsProducts] Deleting ${productToDelete.images.length} images from Google Drive for product ${id}`);
        for (const image of productToDelete.images) {
          try {
            const urlParts = image.url.split('id=');
            if (urlParts.length > 1 && urlParts[1]) {
              const fileId = urlParts[1].split('&')[0]; // Extract file ID
              if (fileId) {
                await deleteImageFromDrive(fileId);
              }
            }
          } catch (imgError) {
            // Log and continue, don't let image deletion failure stop product deletion
            console.error(`[GoogleSheetsProducts] Failed to delete image ${image.url} for product ${id}:`, imgError);
          }
        }
      }

      const sheet = await getProductsWorksheet();
      const rows = await sheet.getRows();
      
      const row = rows.find((r: any) => r.get('_id') === id);
      if (!row) {
        // This case should ideally not happen if productToDelete was found
        console.log(`[GoogleSheetsProducts] Product row not found in sheet for deletion: ${id}`);
        return false;
      }
      
      await row.delete();
      
      console.log(`[GoogleSheetsProducts] Product entry deleted successfully from sheet: ${id}`);
      return true;
    } catch (error) {
      console.error(`[GoogleSheetsProducts] Error deleting product ${id}:`, error);
      throw error;
    }
  }

  // Toggle product status
  static async toggleProductStatus(id: string): Promise<Product | null> {
    try {
      console.log(`[GoogleSheetsProducts] Toggling product status: ${id}`);
      
      const product = await this.getProductById(id);
      if (!product) return null;
      
      const success = await this.updateProduct(id, { isActive: !product.isActive });
      if (!success) return null;
      
      return await this.getProductById(id);
    } catch (error) {
      console.error(`[GoogleSheetsProducts] Error toggling product status ${id}:`, error);
      throw error;
    }
  }

  // Delete multiple products
  static async deleteProducts(ids: string[]): Promise<number> {
    try {
      console.log(`[GoogleSheetsProducts] Bulk deleting ${ids.length} products`);
      
      let deletedCount = 0;
      for (const id of ids) {
        const success = await this.deleteProduct(id);
        if (success) deletedCount++;
      }
      
      console.log(`[GoogleSheetsProducts] Successfully deleted ${deletedCount} out of ${ids.length} products`);
      return deletedCount;
    } catch (error) {
      console.error('[GoogleSheetsProducts] Error in bulk delete:', error);
      throw error;
    }
  }
}