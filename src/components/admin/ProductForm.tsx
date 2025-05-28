'use client';

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Info, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// استيراد محرر النصوص الغني بشكل ديناميكي لتجنب أخطاء SSR
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { 
  ssr: false,
  loading: () => <div className="border rounded-md p-4 w-full h-32 bg-gray-50">جاري تحميل المحرر...</div>
});

// تعريف أنواع البيانات
interface ProductFormProps {
  initialData?: ProductFormData | null;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export interface ProductFormData {
  _id?: string;
  name_ar: string;
  name_en: string;
  slug: string;
  short_desc: string;
  description: string;
  price: number;
  sale_price: number | null;
  quantity: number;
  category: string;
  tags: string[];
  sku: string;
  images: {
    url: string;
    alt: string;
    file?: File;
    preview?: string;
  }[];
  isActive: boolean;
}

// قائمة التصنيفات
const categories = [
  { id: 'cutters', name: 'كتر بلوتر' },
  { id: 'heat-press', name: 'مكابس حرارية' },
  { id: 'vinyl', name: 'فينيل حراري' },
  { id: 'ink', name: 'أحبار' },
  { id: 'accessories', name: 'ملحقات وأدوات' },
  { id: 'spare-parts', name: 'قطع غيار' },
];

// مكون النموذج
export default function ProductForm({ initialData, onSubmit, onCancel, isSubmitting = false }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(() => {
    // تهيئة البيانات الأولية للنموذج
    return initialData || {
      name_ar: '',
      name_en: '',
      slug: '',
      short_desc: '',
      description: '',
      price: 0,
      sale_price: null,
      quantity: 0,
      category: categories[0]?.id || '',
      tags: [],
      sku: '',
      images: [],
      isActive: true
    };
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});
  const [tagInput, setTagInput] = useState('');
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  
  // التحقق من اكتمال الحقول المطلوبة
  const isFormComplete = (): boolean => {
    return !!(
      formData.name_ar &&
      formData.name_en &&
      formData.slug &&
      formData.short_desc &&
      formData.description &&
      formData.price > 0 &&
      formData.sku &&
      formData.images.length > 0
    );
  };

  // تكوين منطقة إفلات الملفات
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 5242880, // 5MB
    onDrop: acceptedFiles => {
      const newImages = acceptedFiles.map(file => ({
        url: '', // سيتم تحديده لاحقاً عند الرفع الفعلي
        alt: formData.name_ar || 'صورة منتج',
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    },
    onDropRejected: fileRejections => {
      fileRejections.forEach(rejection => {
        if (rejection.errors[0]?.code === 'file-too-large') {
          setErrors(prev => ({
            ...prev,
            images: 'حجم الملف كبير جدًا. الحد الأقصى هو 5 ميجابايت.'
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            images: 'نوع الملف غير مدعوم. يرجى رفع صور فقط.'
          }));
        }
      });
    }
  });

  // توليد سلاج تلقائي من الاسم الإنجليزي ورمز المنتج SKU
  useEffect(() => {
    if (formData.name_en && !isGeneratingSlug) {
      const timer = setTimeout(() => {
        const slug = formData.name_en
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        
        setFormData(prev => ({
          ...prev,
          slug
        }));
      }, 500);
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [formData.name_en, isGeneratingSlug]);
  
  // توليد رمز المنتج SKU تلقائيًا
  useEffect(() => {
    if (formData.name_en && !formData.sku) {
      const timer = setTimeout(() => {
        // توليد رمز SKU من الأحرف الأولى من الاسم الإنجليزي + رقم عشوائي
        const prefix = formData.name_en
          .split(' ')
          .map(word => word.charAt(0))
          .join('')
          .toUpperCase();
        
        const randomNum = Math.floor(1000 + Math.random() * 9000); // رقم عشوائي من 4 أرقام
        const sku = `${prefix}-${randomNum}`;
        
        setFormData(prev => ({
          ...prev,
          sku
        }));
      }, 500);
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [formData.name_en, formData.sku]);

  // معالجة تغييرات الحقول
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'slug') {
      setIsGeneratingSlug(true);
    }
    
    // معالجة خاصة للحقول الرقمية
    if (type === 'number') {
      // التعامل مع الحقول الرقمية (السعر، الكمية، إلخ)
      const numericValue = value === '' ? '' : parseFloat(value);
      
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      // بقية الحقول النصية العادية
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // مسح أي خطأ سابق لهذا الحقل
    if (errors[name as keyof ProductFormData]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ProductFormData];
        return newErrors;
      });
    }
  };

  // معالجة تغيير المحرر النصي
  const handleDescriptionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      description: value
    }));
  };

  // إضافة وسم
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  // حذف وسم
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  // حذف صورة
  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    
    // تحرير موارد الصورة إذا كانت مؤقتة
    if (newImages[index]?.preview) {
      URL.revokeObjectURL(newImages[index]?.preview!);
    }
    
    newImages.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  // التحقق من صحة النموذج قبل الإرسال
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};
    
    if (!formData.name_ar) newErrors.name_ar = 'اسم المنتج بالعربية مطلوب';
    if (!formData.name_en) newErrors.name_en = 'اسم المنتج بالإنجليزية مطلوب';
    if (!formData.slug) newErrors.slug = 'الرابط المخصص (Slug) مطلوب';
    if (!formData.short_desc) newErrors.short_desc = 'الوصف المختصر مطلوب';
    if (!formData.description) newErrors.description = 'الوصف التفصيلي مطلوب';
    if (formData.price <= 0) newErrors.price = 'يجب أن يكون السعر أكبر من صفر';
    if (!formData.sku) newErrors.sku = 'رمز المنتج (SKU) مطلوب';
    if (formData.images.length === 0) newErrors.images = 'يرجى رفع صورة واحدة على الأقل';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Upload a single image file
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }
      
      const data = await response.json();
      
      if (!data.success || !data.url) {
        throw new Error('Invalid response from server');
      }
      
      // لطباعة عنوان URL في وحدة التحكم للتأكد من صحته
      console.log('Uploaded image URL:', data.url);
      
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // Process all images before form submission
  const processImages = async () => {
    setIsUploadingImages(true);
    const processedImages = [];
    
    try {
      for (let i = 0; i < formData.images.length; i++) {
        const image = formData.images[i];
        
        // If the image already has a URL and no file, use as is
        if (image?.url && !image?.file) {
          processedImages.push({
            url: image.url,
            alt: image.alt
          });
          continue;
        }
        
        // If it's a new file, upload it
        if (image?.file) {
          const uniqueId = `img-${i}`;
          setUploadProgress(prev => ({ ...prev, [uniqueId]: 0 }));
          
          try {
            const imageUrl = await uploadImage(image.file);
            
            processedImages.push({
              url: imageUrl,
              alt: image.alt
            });
            
            setUploadProgress(prev => ({ ...prev, [uniqueId]: 100 }));
          } catch (error) {
            console.error('Error uploading image:', error);
            setErrors(prev => ({
              ...prev,
              images: `فشل في رفع صورة: ${image.file?.name || 'غير معروف'}`
            }));
            setUploadProgress(prev => ({ ...prev, [uniqueId]: -1 }));
            setIsUploadingImages(false);
            return null;
          }
        }
      }
      
      setIsUploadingImages(false);
      return processedImages;
    } catch (error) {
      console.error('Error processing images:', error);
      setErrors(prev => ({
        ...prev,
        images: 'حدث خطأ أثناء معالجة الصور'
      }));
      setIsUploadingImages(false);
      return null;
    }
  };

  // إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // التمرير إلى أول خطأ
      const firstErrorField = Object.keys(errors)[0];
      const element = firstErrorField ? document.getElementById(firstErrorField) : null;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Process images first
    const processedImages = await processImages();
    if (!processedImages) {
      return; // Failed to process images
    }
    
    // Prepare final form data with processed images
    const finalData = {
      ...formData,
      images: processedImages
    };
    
    // Submit the form
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* المعلومات الأساسية */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-r-4 border-blue-500 pr-3">المعلومات الأساسية</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* الاسم بالعربية */}
          <div className="space-y-1">
            <label htmlFor="name_ar" className="block text-sm font-medium text-gray-700">
              اسم المنتج (بالعربية) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name_ar"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleInputChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.name_ar && (
              <p className="text-red-500 text-sm mt-1">{errors.name_ar}</p>
            )}
          </div>

          {/* الاسم بالإنجليزية */}
          <div className="space-y-1">
            <label htmlFor="name_en" className="block text-sm font-medium text-gray-700">
              اسم المنتج (بالإنجليزية) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name_en"
              name="name_en"
              value={formData.name_en}
              onChange={handleInputChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.name_en && (
              <p className="text-red-500 text-sm mt-1">{errors.name_en}</p>
            )}
          </div>

          {/* الرابط المخصص (Slug) */}
          <div className="space-y-1">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
              الرابط المخصص (Slug) <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500">(يتم توليده تلقائياً)</span>
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
            )}
          </div>

          {/* رمز المنتج SKU */}
          <div className="space-y-1">
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              رمز المنتج (SKU) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.sku && (
              <p className="text-red-500 text-sm mt-1">{errors.sku}</p>
            )}
          </div>

          {/* التصنيف */}
          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              التصنيف <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="text-gray-900 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* الحالة (نشط/غير نشط) */}
          <div className="space-y-1">
            <span className="block text-sm font-medium text-gray-700">الحالة</span>
            <div className="flex items-center gap-4 mt-1">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={() => setFormData(prev => ({ ...prev, isActive: true }))}
                  className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="mr-2 text-gray-800 font-medium">نشط</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="isActive"
                  checked={!formData.isActive}
                  onChange={() => setFormData(prev => ({ ...prev, isActive: false }))}
                  className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="mr-2 text-gray-800 font-medium">غير نشط</span>
              </label>
            </div>
          </div>
        </div>

        {/* الوصف المختصر */}
        <div className="space-y-1">
          <label htmlFor="short_desc" className="block text-sm font-medium text-gray-700">
            الوصف المختصر <span className="text-red-500">*</span>
          </label>
          <textarea
            id="short_desc"
            name="short_desc"
            value={formData.short_desc}
            onChange={handleInputChange}
            rows={2}
            className="text-gray-900 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.short_desc && (
            <p className="text-red-500 text-sm mt-1">{errors.short_desc}</p>
          )}
        </div>

        {/* الوصف الكامل */}
        <div className="space-y-1">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            الوصف التفصيلي <span className="text-red-500">*</span>
          </label>
          <RichTextEditor
            initialValue={formData.description}
            onChange={handleDescriptionChange}
            hasError={!!errors.description}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
      </div>

      {/* الأسعار والمخزون */}
      <div className="space-y-4 border-t pt-6">
        <h2 className="text-lg font-semibold text-gray-800 border-r-4 border-blue-500 pr-3">الأسعار والمخزون</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* السعر */}
          <div className="space-y-1">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              السعر (ج.م) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price || ''}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="text-gray-900 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* السعر قبل الخصم */}
          <div className="space-y-1">
            <label htmlFor="sale_price" className="block text-sm font-medium text-gray-700">
              السعر قبل الخصم (ج.م) <span className="text-xs text-gray-500">(اختياري)</span>
            </label>
            <input
              type="number"
              id="sale_price"
              name="sale_price"
              value={formData.sale_price || ''}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="text-gray-900 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* الكمية */}
          <div className="space-y-1">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              الكمية المتوفرة <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity || ''}
              onChange={handleInputChange}
              min="0"
              step="1"
              className="text-gray-900 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>
        </div>
      </div>

      {/* الوسوم */}
      <div className="space-y-4 border-t pt-6">
        <h2 className="text-lg font-semibold text-gray-800 border-r-4 border-blue-500 pr-3">الوسوم</h2>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="أضف وسماً ثم اضغط Enter"
              className="text-gray-900 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              إضافة
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="mr-1 text-blue-700 hover:text-blue-900"
                >
                  <X size={16} />
                </button>
              </span>
            ))}
            {formData.tags.length === 0 && (
              <span className="text-gray-500 text-sm">لا توجد وسوم مضافة</span>
            )}
          </div>
        </div>
      </div>

      {/* الصور */}
      <div className="space-y-4 border-t pt-6">
        <h2 className="text-lg font-semibold text-gray-800 border-r-4 border-blue-500 pr-3">صور المنتج</h2>
        
        <div className="space-y-3">
          {/* منطقة إفلات الصور */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            } ${errors.images ? 'border-red-300' : ''}`}
          >
            <input {...getInputProps()} />
            <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600">اسحب وأفلت الصور هنا، أو انقر للاختيار</p>
            <p className="text-xs text-gray-500 mt-1">
              الحد الأقصى 5 ميجابايت للصورة. الصيغ المدعومة: JPG، PNG، WEBP
            </p>
          </div>

          {errors.images && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.images}
            </p>
          )}

          {/* معرض الصور المرفوعة */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative border rounded-lg overflow-hidden group">
                  <div className="aspect-square relative">
                    <Image
                      src={image.preview || image.url}
                      alt={image.alt}
                      fill
                      className="object-contain"
                    />
                    {isUploadingImages && image.file && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        {uploadProgress[`img-${index}`] === -1 ? (
                          <AlertCircle size={24} className="text-red-500" />
                        ) : uploadProgress[`img-${index}`] === 100 ? (
                          <div className="text-green-400">✓</div>
                        ) : (
                          <div className="h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 left-1 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
                    disabled={isUploadingImages}
                  >
                    <X size={16} />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-gray-900/70 text-white text-xs py-1 px-2 truncate">
                    {image.preview ? 'صورة جديدة' : image.url.split('/').pop()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* أزرار الإجراءات */}
      <div className="flex justify-end gap-3 border-t pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          disabled={isSubmitting || isUploadingImages}
        >
          إلغاء
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70"
          disabled={isSubmitting || isUploadingImages || !isFormComplete()}
        >
          {isSubmitting || isUploadingImages ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
              <span>{isUploadingImages ? 'جاري رفع الصور...' : 'جاري الحفظ...'}</span>
            </>
          ) : (
            <span>{initialData ? 'تحديث المنتج' : 'إضافة المنتج'}</span>
          )}
        </button>
      </div>
    </form>
  );
}