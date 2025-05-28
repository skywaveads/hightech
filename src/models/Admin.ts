import mongoose from "mongoose";

// تعريف مخطط المسؤول
const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// التحقق من وجود النموذج سابقاً لمنع التعريف المزدوج (مهم للتطوير المستمر)
export default mongoose.models.Admin || mongoose.model("Admin", schema); 