// Test environment variables in Next.js context
console.log('🔄 Testing environment variables...');

console.log('Environment variables:');
console.log('GOOGLE_SHEETS_SHEET_ID:', process.env.GOOGLE_SHEETS_SHEET_ID);
console.log('GOOGLE_SHEETS_CLIENT_EMAIL:', process.env.GOOGLE_SHEETS_CLIENT_EMAIL);
console.log('GOOGLE_SHEETS_PRIVATE_KEY length:', process.env.GOOGLE_SHEETS_PRIVATE_KEY?.length);

if (!process.env.GOOGLE_SHEETS_SHEET_ID) {
  console.log('❌ GOOGLE_SHEETS_SHEET_ID is missing');
}

if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
  console.log('❌ GOOGLE_SHEETS_CLIENT_EMAIL is missing');
}

if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
  console.log('❌ GOOGLE_SHEETS_PRIVATE_KEY is missing');
} else {
  console.log('✅ GOOGLE_SHEETS_PRIVATE_KEY is present');
  console.log('Private key starts with:', process.env.GOOGLE_SHEETS_PRIVATE_KEY.substring(0, 50) + '...');
}

// Test the replacement
const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
console.log('✅ Private key after replacement length:', privateKey?.length);

console.log('🎉 Environment test complete');