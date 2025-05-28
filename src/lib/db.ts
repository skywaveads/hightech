'use server';

import { Product } from '@/types/product';
import { promises as fs } from 'fs';
import path from 'path';

// Path to the JSON database file
const dbPath = path.join(process.cwd(), 'src/data/products.json');

// Initial products data
const initialProducts: Product[] = [
  {
    _id: '1',
    name_ar: 'هاي كت A3',
    name_en: 'High Cut A3',
    slug: 'high-cut-a3-plotter',
    short_desc: 'كتر بلوتر مثالي للمساحات الصغيرة ومحلات الهدايا',
    description: '<p>كتر بلوتر مثالي للمساحات الصغيرة ومحلات الهدايا وطباعة التيشيرتات</p>',
    price: 4500,
    sale_price: 5000,
    quantity: 15,
    category: 'cutters',
    tags: ['كتر بلوتر', 'طابعة', 'A3'],
    sku: 'HCTA3-2025',
    images: [
      {
        url: '/images/products/highcut-a3.jpg',
        alt: 'هاي كت A3'
      }
    ],
    isActive: true,
    createdAt: new Date('2023-12-01').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    _id: '2',
    name_ar: 'هاي كت 720',
    name_en: 'High Cut 720',
    slug: 'high-cut-720-plotter',
    short_desc: 'كتر بلوتر احترافي لمراكز الطباعة المتوسطة',
    description: '<p>كتر بلوتر احترافي لمراكز الطباعة المتوسطة وشركات الإعلان والدعاية</p>',
    price: 12000,
    sale_price: null,
    quantity: 8,
    category: 'cutters',
    tags: ['كتر بلوتر', 'طابعة', '720'],
    sku: 'HCT720-2025',
    images: [
      {
        url: '/images/products/highcut-720.jpg',
        alt: 'هاي كت 720'
      }
    ],
    isActive: true,
    createdAt: new Date('2023-11-15').toISOString(),
    updatedAt: new Date('2024-01-10').toISOString()
  },
  {
    _id: '3',
    name_ar: 'ريفينا برو',
    name_en: 'Revina Pro',
    slug: 'revina-pro-plotter',
    short_desc: 'كتر بلوتر متطور للمطابع الكبرى',
    description: '<p>كتر بلوتر متطور للمطابع الكبرى ومصانع الملابس ومراكز الإنتاج الصناعي</p>',
    price: 25000,
    sale_price: null,
    quantity: 3,
    category: 'cutters',
    tags: ['كتر بلوتر', 'طابعة', 'احترافي'],
    sku: 'RVNPRO-2025',
    images: [
      {
        url: '/images/products/revina-pro.jpg',
        alt: 'ريفينا برو'
      }
    ],
    isActive: false,
    createdAt: new Date('2023-10-20').toISOString(),
    updatedAt: new Date('2023-12-05').toISOString()
  },
  {
    _id: '4',
    name_ar: 'هاي كت A4',
    name_en: 'High Cut A4',
    slug: 'high-cut-a4-plotter',
    short_desc: 'كتر بلوتر مدمج للاستخدام المنزلي',
    description: '<p>كتر بلوتر مدمج للاستخدام المنزلي والمشاريع الصغيرة</p>',
    price: 2500,
    sale_price: null,
    quantity: 22,
    category: 'cutters',
    tags: ['كتر بلوتر', 'طابعة', 'A4'],
    sku: 'HCTA4-2025',
    images: [
      {
        url: '/images/products/highcut-a4.jpg',
        alt: 'هاي كت A4'
      }
    ],
    isActive: true,
    createdAt: new Date('2024-01-05').toISOString(),
    updatedAt: new Date('2024-01-05').toISOString()
  },
  {
    _id: '5',
    name_ar: 'مكبس حراري بريميوم برو',
    name_en: 'Premium Heat Press Pro',
    slug: 'premium-heat-press',
    short_desc: 'مكبس حراري احترافي لطباعة التيشيرتات',
    description: '<p>مكبس حراري احترافي لطباعة التيشيرتات والأقمشة بتقنية السبليميشن</p>',
    price: 8500,
    sale_price: null,
    quantity: 5,
    category: 'heat-press',
    tags: ['مكبس', 'حراري', 'سبليميشن'],
    sku: 'HTHP-2025',
    images: [
      {
        url: '/images/products/heat-press.jpg',
        alt: 'مكبس حراري بريميوم برو'
      }
    ],
    isActive: true,
    createdAt: new Date('2023-09-15').toISOString(),
    updatedAt: new Date('2023-11-20').toISOString()
  },
  {
    _id: '6',
    name_ar: 'فينيل حراري بريميوم',
    name_en: 'Premium Vinyl',
    slug: 'premium-vinyl',
    short_desc: 'فينيل حراري عالي الجودة للطباعة',
    description: '<p>فينيل حراري عالي الجودة للطباعة على الأقمشة والتيشيرتات</p>',
    price: 450,
    sale_price: 550,
    quantity: 150,
    category: 'vinyl',
    tags: ['فينيل', 'حراري', 'طباعة'],
    sku: 'RVNVI-2025',
    images: [
      {
        url: '/images/products/vinyl.jpg',
        alt: 'فينيل حراري بريميوم'
      }
    ],
    isActive: true,
    createdAt: new Date('2023-08-10').toISOString(),
    updatedAt: new Date('2023-10-15').toISOString()
  }
];

// Initialize the database file if it doesn't exist
async function initDB() {
  try {
    try {
      // Try to read the file first to see if it exists
      await fs.readFile(dbPath, 'utf-8');
    } catch (error) {
      // If the file doesn't exist, create the directory and write initial data
      const dir = path.dirname(dbPath);
      try {
        await fs.mkdir(dir, { recursive: true });
      } catch (mkdirError) {
        // Ignore errors if the directory already exists
      }
      
      // Write initial data to the file
      await fs.writeFile(dbPath, JSON.stringify(initialProducts, null, 2));
      console.log('Products database initialized with default data');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  try {
    // Initialize DB if needed
    await initDB();
    
    // Read the file
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return initialProducts; // Return mock data as fallback
  }
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const products = await getAllProducts();
    const product = products.find(p => p._id === id);
    return product || null;
  } catch (error) {
    console.error(`Error getting product ${id}:`, error);
    return null;
  }
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = await getAllProducts();
    const product = products.find(p => p.slug === slug);
    return product || null;
  } catch (error) {
    console.error(`Error getting product with slug ${slug}:`, error);
    return null;
  }
}

// Add a new product
export async function addProduct(product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  try {
    const products = await getAllProducts();
    
    // Generate a simple ID
    const newId = (parseInt(products[products.length - 1]?._id || '0') + 1).toString();
    
    const newProduct: Product = {
      ...product,
      _id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    
    // Save to file
    await fs.writeFile(dbPath, JSON.stringify(products, null, 2));
    
    return newProduct;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

// Update an existing product
export async function updateProduct(id: string, product: Partial<Product>): Promise<Product | null> {
  try {
    const products = await getAllProducts();
    const index = products.findIndex(p => p._id === id);
    
    if (index === -1) return null;
    
    // Update the product
    const updatedProduct = {
      ...products[index],
      ...product,
      updatedAt: new Date().toISOString()
    } as Product;

    products[index] = updatedProduct;
    
    // Save to file
    await fs.writeFile(dbPath, JSON.stringify(products, null, 2));
    
    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
}

// Delete a product
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const products = await getAllProducts();
    const filteredProducts = products.filter(p => p._id !== id);
    
    // If no product was removed
    if (filteredProducts.length === products.length) {
      return false;
    }
    
    // Save to file
    await fs.writeFile(dbPath, JSON.stringify(filteredProducts, null, 2));
    
    return true;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
}

// Delete multiple products
export async function deleteProducts(ids: string[]): Promise<number> {
  try {
    const products = await getAllProducts();
    const filteredProducts = products.filter(p => !ids.includes(p._id));
    
    const deletedCount = products.length - filteredProducts.length;
    
    // Save to file
    await fs.writeFile(dbPath, JSON.stringify(filteredProducts, null, 2));
    
    return deletedCount;
  } catch (error) {
    console.error(`Error deleting products:`, error);
    throw error;
  }
}

// Toggle product active status
export async function toggleProductStatus(id: string): Promise<Product | null> {
  try {
    const product = await getProductById(id);
    if (!product) return null;
    
    return await updateProduct(id, { isActive: !product.isActive });
  } catch (error) {
    console.error(`Error toggling product status ${id}:`, error);
    throw error;
  }
} 