import { google } from 'googleapis';
import { Order, OrderItem, CustomerInfo } from '@/types/order';

// إعداد Google Sheets API
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const ORDERS_SPREADSHEET_ID = process.env.ORDERS_SHEET_ID || '17MRkrcJA5Fxxn-cZ5NIUGSxnBYDWaBMlPZVvwrAPX0Y'; // Use environment variable
const ORDERS_SHEET_NAME = 'Orders';

// إنشاء عميل المصادقة
function getAuthClient() {
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
    
    console.log('[GoogleOrders] Using correct private key directly');
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: correctPrivateKey,
      },
      scopes: SCOPES,
    });

    return auth;
  } catch (error) {
    console.error('خطأ في إعداد مصادقة Google:', error);
    throw new Error('فشل في إعداد مصادقة Google Sheets');
  }
}

// إنشاء عميل Sheets
async function getSheetsClient() {
  const auth = getAuthClient();
  const authClient = await auth.getClient();
  
  return google.sheets({ 
    version: 'v4', 
    auth: authClient as any 
  });
}

// تهيئة ورقة الطلبات
export async function initializeOrdersSheet() {
  try {
    const sheets = await getSheetsClient();
    
    // التحقق من وجود الورقة
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: ORDERS_SPREADSHEET_ID,
    });

    const sheetExists = spreadsheet.data.sheets?.some(
      sheet => sheet.properties?.title === ORDERS_SHEET_NAME
    );

    if (!sheetExists) {
      // إنشاء ورقة جديدة
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: ORDERS_SPREADSHEET_ID,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: ORDERS_SHEET_NAME,
              }
            }
          }]
        }
      });
    }

    // إضافة العناوين
    const headers = [
      'رقم الطلب',
      'تاريخ الطلب',
      'الاسم الأول',
      'الاسم الأخير',
      'البريد الإلكتروني',
      'رقم الهاتف',
      'الدولة',
      'رمز الدولة',
      'رمز الهاتف',
      'المدينة',
      'العنوان',
      'الرمز البريدي',
      'ملاحظات',
      'المنتجات',
      'الكميات',
      'الأسعار',
      'المجموع الفرعي',
      'الشحن',
      'المجموع الكلي',
      'حالة الطلب',
      'تاريخ التحديث'
    ];

    // التحقق من وجود العناوين
    const headerRange = `${ORDERS_SHEET_NAME}!A1:U1`;
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: ORDERS_SPREADSHEET_ID,
      range: headerRange,
    });

    if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
      // إضافة العناوين
      await sheets.spreadsheets.values.update({
        spreadsheetId: ORDERS_SPREADSHEET_ID,
        range: headerRange,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers],
        },
      });

      // تنسيق العناوين
      // Find the sheetId for ORDERS_SHEET_NAME to correctly format headers
      const currentSpreadsheet = await sheets.spreadsheets.get({ spreadsheetId: ORDERS_SPREADSHEET_ID });
      const targetSheet = currentSpreadsheet.data.sheets?.find(s => s.properties?.title === ORDERS_SHEET_NAME);
      const targetSheetId = targetSheet?.properties?.sheetId;

      if (targetSheetId !== undefined && targetSheetId !== null) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: ORDERS_SPREADSHEET_ID,
          requestBody: {
            requests: [{
              repeatCell: {
                range: {
                  sheetId: targetSheetId, // Use the dynamically found sheetId
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: headers.length,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: {
                      red: 0.2,
                      green: 0.4,
                      blue: 0.8,
                    },
                    textFormat: {
                      foregroundColor: {
                        red: 1.0,
                        green: 1.0,
                        blue: 1.0,
                      },
                      bold: true,
                    },
                  },
                },
                fields: 'userEnteredFormat(backgroundColor,textFormat)',
              },
            }],
          },
        });
      } else {
        console.warn(`[GoogleOrders] Could not find sheetId for ${ORDERS_SHEET_NAME} to format headers.`);
      }
    }

    return { success: true, message: 'تم تهيئة ورقة الطلبات بنجاح' };
  } catch (error) {
    console.error('خطأ في تهيئة ورقة الطلبات:', error);
    throw new Error('فشل في تهيئة ورقة الطلبات');
  }
}

// إضافة طلب جديد
export async function addOrderToSheet(order: Order): Promise<{ success: boolean; message: string }> {
  try {
    const sheets = await getSheetsClient();

    // تحضير بيانات الطلب
    const productsNames = order.items.map(item => item.productName).join(' | ');
    const quantities = order.items.map(item => item.quantity.toString()).join(' | ');
    const prices = order.items.map(item => `${item.price} ج.م`).join(' | ');

    const orderRow = [
      order.orderNumber,
      order.createdAt,
      order.customer.firstName,
      order.customer.lastName,
      order.customer.email,
      order.customer.phone,
      order.customer.country,
      order.customer.countryCode,
      order.customer.dialCode,
      order.customer.city,
      order.customer.address,
      order.customer.postalCode || '',
      order.customer.notes || '',
      productsNames,
      quantities,
      prices,
      `${order.subtotal} ج.م`,
      `${order.shipping} ج.م`,
      `${order.total} ج.م`,
      order.status,
      order.updatedAt
    ];

    // إضافة الصف الجديد
    await sheets.spreadsheets.values.append({
      spreadsheetId: ORDERS_SPREADSHEET_ID,
      range: `${ORDERS_SHEET_NAME}!A:U`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [orderRow],
      },
    });

    return { success: true, message: 'تم حفظ الطلب بنجاح' };
  } catch (error) {
    console.error('خطأ في حفظ الطلب:', error);
    throw new Error('فشل في حفظ الطلب');
  }
}

// تحديث حالة الطلب
export async function updateOrderStatus(
  orderNumber: string, 
  newStatus: string
): Promise<{ success: boolean; message: string }> {
  try {
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: ORDERS_SPREADSHEET_ID,
      range: `${ORDERS_SHEET_NAME}!A:U`,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      console.error('[GoogleOrders] No data rows found in updateOrderStatus.');
      throw new Error('لم يتم العثور على الطلب');
    }
    
    const headerRow = rows[0] as string[] | undefined;
    if (!headerRow || !Array.isArray(headerRow) || headerRow.length === 0) {
        console.error('[GoogleOrders] Header row is missing or invalid in updateOrderStatus.');
        throw new Error('Header row missing or invalid');
    }
    const orderNumberColIndex = headerRow.findIndex(header => header === 'رقم الطلب');
     if (orderNumberColIndex === -1) {
        console.error('[GoogleOrders] "رقم الطلب" header not found in updateOrderStatus.');
        throw new Error('"رقم الطلب" header not found');
    }

    const dataRows = rows.slice(1);
    const orderRowIndexInDataRows = dataRows.findIndex(r => r && Array.isArray(r) && r.length > orderNumberColIndex && r[orderNumberColIndex] === orderNumber);


    if (orderRowIndexInDataRows === -1) {
      console.log(`[GoogleOrders] Order with orderNumber ${orderNumber} not found for status update.`);
      throw new Error('لم يتم العثور على الطلب');
    }

    // The actual row number in the sheet (1-based). Header is row 1.
    // So, if orderRowIndexInDataRows is 0 (first data row), its sheet row number is 2.
    const sheetRowNumberToUpdate = orderRowIndexInDataRows + 2;

    const updateRange = `${ORDERS_SHEET_NAME}!T${sheetRowNumberToUpdate}:U${sheetRowNumberToUpdate}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId: ORDERS_SPREADSHEET_ID,
      range: updateRange,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[newStatus, new Date().toISOString()]],
      },
    });

    return { success: true, message: 'تم تحديث حالة الطلب بنجاح' };
  } catch (error) {
    console.error('خطأ في تحديث حالة الطلب:', error);
    throw new Error('فشل في تحديث حالة الطلب');
  }
}

// جلب جميع الطلبات
export async function getAllOrders(): Promise<Order[]> {
  try {
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: ORDERS_SPREADSHEET_ID,
      range: `${ORDERS_SHEET_NAME}!A:U`,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      return [];
    }

    const dataRows = rows.slice(1);
    const orders: Order[] = dataRows.map((row: any, index: number) => {
      if (!row || !Array.isArray(row)) { // Skip if row is not an array (e.g. empty row from sheet)
        console.warn(`[GoogleOrders] Skipping invalid row at index ${index} in getAllOrders.`);
        return null; 
      }
      const productsNames = row[13]?.split(' | ') || [];
      const quantities = row[14]?.split(' | ').map((q: string) => parseInt(q)) || [];
      const prices = row[15]?.split(' | ').map((p: string) => parseFloat(p.replace(' ج.م', ''))) || [];

      const items: OrderItem[] = productsNames.map((name: string, i: number) => ({
        productId: `product-${i}`,
        productName: name,
        productNameEn: name,
        price: prices[i] || 0,
        quantity: quantities[i] || 1,
        total: (prices[i] || 0) * (quantities[i] || 1),
      }));

      const customer: CustomerInfo = {
        firstName: row[2] || '',
        lastName: row[3] || '',
        email: row[4] || '',
        phone: row[5] || '',
        country: row[6] || '',
        countryCode: row[7] || '',
        dialCode: row[8] || '',
        city: row[9] || '',
        address: row[10] || '',
        postalCode: row[11] || '',
        notes: row[12] || '',
      };

      return {
        id: `order-${index}`, // This ID is temporary and based on row index
        orderNumber: row[0] || '',
        customer,
        items,
        subtotal: parseFloat(row[16]?.replace(' ج.م', '') || '0'),
        shipping: parseFloat(row[17]?.replace(' ج.م', '') || '0'),
        total: parseFloat(row[18]?.replace(' ج.م', '') || '0'),
        status: row[19] as any || 'pending',
        createdAt: row[1] || '',
        updatedAt: row[20] || '',
      };
    }).filter(order => order !== null) as Order[]; // Filter out nulls from invalid rows

    return orders;
  } catch (error) {
    console.error('خطأ في جلب الطلبات:', error);
    throw new Error('فشل في جلب الطلبات');
  }
}

// جلب طلب محدد بواسطة رقم الطلب
export async function getOrderByOrderNumber(orderNumber: string): Promise<Order | null> {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: ORDERS_SPREADSHEET_ID,
      range: `${ORDERS_SHEET_NAME}!A:U`,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) { 
      console.log(`[GoogleOrders] No data rows found for orderNumber: ${orderNumber}`);
      return null;
    }

    const headerRow = rows[0] as string[] | undefined; 
    if (!headerRow || !Array.isArray(headerRow) || headerRow.length === 0) {
      console.error('[GoogleOrders] Header row is missing, invalid, or empty in getOrderByOrderNumber.');
      return null;
    }
    const orderNumberIndex = headerRow.findIndex(header => header === 'رقم الطلب');
    if (orderNumberIndex === -1) {
      console.error('[GoogleOrders] "رقم الطلب" header not found in getOrderByOrderNumber.');
      return null;
    }

    const dataRows = rows.slice(1);
    const foundRowIndex = dataRows.findIndex(r => r && Array.isArray(r) && r.length > orderNumberIndex && r[orderNumberIndex] === orderNumber);

    if (foundRowIndex === -1) {
      console.log(`[GoogleOrders] Order with orderNumber ${orderNumber} not found in getOrderByOrderNumber.`);
      return null;
    }
    
    const row = dataRows[foundRowIndex] as any[] | undefined; 
    if (!row || !Array.isArray(row) || row.length === 0) { 
        console.error(`[GoogleOrders] Row data is invalid, undefined, or empty for orderNumber ${orderNumber}.`);
        return null;
    }

    const productsNames = row[13]?.split(' | ') || [];
    const quantities = row[14]?.split(' | ').map((q: string) => parseInt(q)) || [];
    const prices = row[15]?.split(' | ').map((p: string) => parseFloat(p.replace(' ج.م', ''))) || [];

    const items: OrderItem[] = productsNames.map((name: string, i: number) => ({
      productId: `product-${i}`, 
      productName: name,
      productNameEn: name, 
      price: prices[i] || 0,
      quantity: quantities[i] || 1,
      total: (prices[i] || 0) * (quantities[i] || 1),
    }));

    const customer: CustomerInfo = {
      firstName: row[2] || '',
      lastName: row[3] || '',
      email: row[4] || '',
      phone: row[5] || '',
      country: row[6] || '',
      countryCode: row[7] || '',
      dialCode: row[8] || '',
      city: row[9] || '',
      address: row[10] || '',
      postalCode: row[11] || '',
      notes: row[12] || '',
    };

    return {
      id: `order-${foundRowIndex}`, 
      orderNumber: row[orderNumberIndex] || '', 
      customer,
      items,
      subtotal: parseFloat(row[16]?.replace(' ج.م', '') || '0'),
      shipping: parseFloat(row[17]?.replace(' ج.م', '') || '0'),
      total: parseFloat(row[18]?.replace(' ج.م', '') || '0'),
      status: row[19] as any || 'pending',
      createdAt: row[1] || '',
      updatedAt: row[20] || '',
    };
  } catch (error) {
    console.error(`خطأ في جلب الطلب ${orderNumber}:`, error);
    throw new Error(`فشل في جلب الطلب ${orderNumber}`);
  }
}

// تحديث طلب كامل
export async function updateOrderInSheet(orderNumber: string, orderData: Partial<Order>): Promise<{ success: boolean; message: string }> {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: ORDERS_SPREADSHEET_ID,
      range: `${ORDERS_SHEET_NAME}!A:U`,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      console.error('[GoogleOrders] No data rows found for update.');
      throw new Error('لم يتم العثور على الطلب للتحديث');
    }
    
    const headerRow = rows[0] as string[] | undefined;
    if (!headerRow || !Array.isArray(headerRow) || headerRow.length === 0) {
      console.error('[GoogleOrders] Header row is missing, invalid, or empty in updateOrderInSheet.');
      throw new Error('Header row missing or invalid');
    }
    const orderNumberColIndex = headerRow.findIndex(header => header === 'رقم الطلب');
    if (orderNumberColIndex === -1) {
        console.error('[GoogleOrders] "رقم الطلب" header not found in updateOrderInSheet.');
        throw new Error('"رقم الطلب" header not found');
    }

    const dataRows = rows.slice(1);
    const orderRowIndexInDataRows = dataRows.findIndex(r => r && Array.isArray(r) && r.length > orderNumberColIndex && r[orderNumberColIndex] === orderNumber);

    if (orderRowIndexInDataRows === -1) {
      console.log(`[GoogleOrders] Order with orderNumber ${orderNumber} not found for update in updateOrderInSheet.`);
      throw new Error('لم يتم العثور على الطلب للتحديث');
    }
    
    const existingRow = dataRows[orderRowIndexInDataRows] as any[] | undefined;
    if (!existingRow || !Array.isArray(existingRow) || existingRow.length === 0) { 
        console.error(`[GoogleOrders] Existing row data is invalid, undefined, or empty for orderNumber ${orderNumber} in updateOrderInSheet.`);
        throw new Error('Existing row data not found or invalid for update');
    }
    const updatedRowData = [...existingRow];

    // Map Order fields to specific column indices
    if (orderData.customer) {
        if (orderData.customer.firstName !== undefined) updatedRowData[2] = orderData.customer.firstName;
        if (orderData.customer.lastName !== undefined) updatedRowData[3] = orderData.customer.lastName;
        if (orderData.customer.email !== undefined) updatedRowData[4] = orderData.customer.email;
        if (orderData.customer.phone !== undefined) updatedRowData[5] = orderData.customer.phone;
        if (orderData.customer.country !== undefined) updatedRowData[6] = orderData.customer.country;
        if (orderData.customer.countryCode !== undefined) updatedRowData[7] = orderData.customer.countryCode;
        if (orderData.customer.dialCode !== undefined) updatedRowData[8] = orderData.customer.dialCode;
        if (orderData.customer.city !== undefined) updatedRowData[9] = orderData.customer.city;
        if (orderData.customer.address !== undefined) updatedRowData[10] = orderData.customer.address;
        if (orderData.customer.postalCode !== undefined) updatedRowData[11] = orderData.customer.postalCode;
        if (orderData.customer.notes !== undefined) updatedRowData[12] = orderData.customer.notes;
    }
    // Item update is complex due to string joining, skipping for now.
    // Subtotal, shipping, total are usually derived.
    if (orderData.status) {
      updatedRowData[19] = orderData.status;
    }
    updatedRowData[20] = new Date().toISOString(); // Update 'updatedAt'

    await sheets.spreadsheets.values.update({
      spreadsheetId: ORDERS_SPREADSHEET_ID,
      range: `${ORDERS_SHEET_NAME}!A${orderRowIndexInDataRows + 2}:U${orderRowIndexInDataRows + 2}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [updatedRowData],
      },
    });

    return { success: true, message: 'تم تحديث الطلب بنجاح' };
  } catch (error) {
    console.error(`خطأ في تحديث الطلب ${orderNumber}:`, error);
    throw new Error(`فشل في تحديث الطلب ${orderNumber}`);
  }
}

// حذف طلب
export async function deleteOrderFromSheet(orderNumber: string): Promise<{ success: boolean; message: string }> {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: ORDERS_SPREADSHEET_ID,
      range: `${ORDERS_SHEET_NAME}!A:U`, 
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      console.error('[GoogleOrders] No data rows found for deletion.');
      throw new Error('لم يتم العثور على الطلب للحذف');
    }

    const headerRow = rows[0] as string[] | undefined;
    if (!headerRow || !Array.isArray(headerRow) || headerRow.length === 0) {
      console.error('[GoogleOrders] Header row is missing, invalid, or empty in deleteOrderFromSheet.');
      throw new Error('Header row missing or invalid');
    }
    const orderNumberColIndex = headerRow.findIndex(header => header === 'رقم الطلب');
    if (orderNumberColIndex === -1) {
        console.error('[GoogleOrders] "رقم الطلب" header not found in deleteOrderFromSheet.');
        throw new Error('"رقم الطلب" header not found');
    }
    
    const dataRows = rows.slice(1);
    const orderRowIndexInDataRows = dataRows.findIndex(r => r && Array.isArray(r) && r.length > orderNumberColIndex && r[orderNumberColIndex] === orderNumber);

    if (orderRowIndexInDataRows === -1) {
      console.log(`[GoogleOrders] Order with orderNumber ${orderNumber} not found for deletion in deleteOrderFromSheet.`);
      throw new Error('لم يتم العثور على الطلب للحذف');
    }
    
    const sheetAPIRowIndexToDelete = orderRowIndexInDataRows + 1; 

     const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: ORDERS_SPREADSHEET_ID });
     const sheet = spreadsheet.data.sheets?.find(s => s.properties?.title === ORDERS_SHEET_NAME);
     const sheetId = sheet?.properties?.sheetId;

    if (sheetId === undefined || sheetId === null) {
        console.error(`[GoogleOrders] Could not find sheet ID for sheet named "${ORDERS_SHEET_NAME}" to delete row.`);
        throw new Error('Could not find sheet ID for Orders sheet to delete row.');
    }

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: ORDERS_SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId,
                dimension: 'ROWS',
                startIndex: sheetAPIRowIndexToDelete, 
                endIndex: sheetAPIRowIndexToDelete + 1,
              },
            },
          },
        ],
      },
    });

    return { success: true, message: 'تم حذف الطلب بنجاح' };
  } catch (error) {
    console.error(`خطأ في حذف الطلب ${orderNumber}:`, error);
    throw new Error(`فشل في حذف الطلب ${orderNumber}`);
  }
}