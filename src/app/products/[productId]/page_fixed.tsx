import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ShoppingCart, ChevronLeft, Truck, ShieldCheck, BadgeCheck, Star, ChevronRight } from 'lucide-react';
import { getProductBySlug, getAllProducts } from '@/lib/db';
import { Product } from '@/types/product';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { productId: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.productId);
  
  if (!product) {
    return {
      title: 'المنتج غير موجود',
      description: 'هذا المنتج غير موجود أو تم حذفه'
    };
  }

  return {
    title: `${product.name_ar} | هاي تكنولوجي`,
    description: product.short_desc,
    openGraph: {
      title: `${product.name_ar} | هاي تكنولوجي`,
      description: product.short_desc,
      images: [
        {
          url: product.images[0]?.url || '/images/placeholder.jpg',
          width: 1200,
          height: 630,
          alt: product.name_ar,
        },
      ],
    },
  };
}

// Generate static paths
export async function generateStaticParams() {
  const products = await getAllProducts();
  
  return products.map((product) => ({
    productId: product.slug,
  }));
}

// مكون سلايدر الصور
const ProductImageSlider = ({ images }: { images: Product['images'] }) => {
  return (
    <div className="relative">
      {/* عرض الصورة الرئيسية */}
      <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 relative h-[400px] md:h-[500px]">
        {images.length > 0 ? (
          <>
            {/* إضافة سمة data-carousel-item لكل صورة لتسهيل استخدام سلايدر على جانب العميل */}
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                data-carousel-item={index === 0 ? 'active' : ''}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-contain p-6"
                  priority={index === 0}
                />
              </div>
            ))}
            
            {/* أزرار التنقل (تظهر فقط إذا كان هناك أكثر من صورة) */}
            {images.length > 1 && (
              <>
                <button 
                  type="button"
                  className="absolute top-1/2 left-4 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white/70 hover:bg-white cursor-pointer group focus:outline-none"
                  data-carousel-prev>
                  <ChevronLeft className="w-5 h-5 text-gray-800 rtl:rotate-180" />
                </button>
                
                <button 
                  type="button"
                  className="absolute top-1/2 right-4 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white/70 hover:bg-white cursor-pointer group focus:outline-none"
                  data-carousel-next>
                  <ChevronRight className="w-5 h-5 text-gray-800 rtl:rotate-180" />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">لا توجد صورة</span>
          </div>
        )}
      </div>
      
      {/* صور مصغرة للتنقل (تظهر فقط إذا كان هناك أكثر من صورة) */}
      {images.length > 1 && (
        <div className="flex mt-4 space-x-4 space-x-reverse" data-carousel-indicators>
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              className={`relative flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border-2 ${index === 0 ? 'border-primary-600' : 'border-gray-200'} hover:border-primary-400 focus:outline-none`}
              data-carousel-slide-to={index}>
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await getProductBySlug(params.productId);
  
  if (!product || !product.isActive) {
    return notFound();
  }

  const relatedProducts = await getAllProducts().then(products =>
    products
      .filter(p => p.isActive && p.category === product.category && p._id !== product._id)
      .slice(0, 4)
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-primary-600 transition-colors">
                الرئيسية
              </Link>
            </li>
            <li className="mx-2 text-gray-400">
              <ChevronLeft className="h-4 w-4" />
            </li>
            <li>
              <Link href="/products" className="text-gray-500 hover:text-primary-600 transition-colors">
                المنتجات
              </Link>
            </li>
            <li className="mx-2 text-gray-400">
              <ChevronLeft className="h-4 w-4" />
            </li>
            <li>
              <span className="text-primary-600 font-medium">
                {product.name_ar}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images - استخدام مكون السلايدر الذي قمنا بإنشائه */}
            <ProductImageSlider images={product.images} />

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name_ar}</h1>
              <div className="text-sm text-gray-500 mb-4">
                {product.name_en} | SKU: {product.sku}
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 font-bold">{product.short_desc}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary-600">{product.price.toLocaleString()} ج.م</span>
                  {product.sale_price && (
                    <span className="text-lg text-gray-500 line-through mr-3">{product.sale_price.toLocaleString()} ج.م</span>
                  )}
                </div>
                
                {/* Stock status */}
                <div className="mt-2 flex items-center">
                  {product.quantity > 0 ? (
                    <span className="text-green-600 flex items-center text-sm">
                      <BadgeCheck className="h-4 w-4 mr-1" />
                      متوفر للشحن الفوري ({product.quantity} قطعة)
                    </span>
                  ) : (
                    <span className="text-red-600 text-sm">
                      غير متوفر حالياً
                    </span>
                  )}
                </div>
              </div>
              
              {/* Add to cart section */}
              <div className="border-t border-b border-gray-100 py-6 my-4">
                <div className="flex items-center">
                  <div className="mr-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      الكمية:
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        max={product.quantity}
                        defaultValue="1"
                        className="w-20 border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                      <div className="flex flex-col border border-r-0 border-gray-300 rounded-l-lg">
                        <button className="px-2 py-0.5 hover:bg-gray-100 border-b border-gray-300">+</button>
                        <button className="px-2 py-0.5 hover:bg-gray-100">-</button>
                      </div>
                    </div>
                  </div>
                  
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-8 rounded-lg transition-colors flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 ml-2" />
                    إضافة إلى السلة
                  </button>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-primary-50 p-2 rounded-full mr-3">
                    <Truck className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">شحن سريع</h4>
                    <p className="text-sm text-gray-500">1-3 أيام عمل</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-primary-50 p-2 rounded-full mr-3">
                    <ShieldCheck className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">ضمان سنة</h4>
                    <p className="text-sm text-gray-500">ضد عيوب التصنيع</p>
                  </div>
                </div>
              </div>

              {/* Categories / Tags */}
              <div className="mt-auto">
                <div className="flex flex-wrap items-center text-sm text-gray-600">
                  <span className="ml-2">التصنيف:</span>
                  <Link 
                    href={`/products?category=${product.category}`}
                    className="text-primary-600 hover:underline"
                  >
                    {product.category}
                  </Link>
                </div>
                
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600">الوسوم:</span>
                    {product.tags.map(tag => (
                      <Link 
                        key={tag} 
                        href={`/products?tag=${encodeURIComponent(tag)}`}
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product description */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-r-4 border-primary-600 pr-3">
            وصف المنتج
          </h2>
          
          {/* السعر في قسم التفاصيل */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">السعر والتوفر</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-green-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-green-200">{product.price.toLocaleString()} ج.م</span>
                {product.sale_price && (
                  <span className="text-base text-gray-500 line-through mr-3">{product.sale_price.toLocaleString()} ج.م</span>
                )}
              </div>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.quantity > 5 ? 'bg-green-100 text-green-700' : 
                  product.quantity > 0 ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {product.quantity > 5 ? 'متوفر' : 
                   product.quantity > 0 ? 'متوفر بكمية محدودة' : 
                   'غير متوفر حالياً'}
                </span>
                <span className="mr-2 text-sm text-gray-500">
                  {product.quantity > 0 ? `(${product.quantity} قطعة)` : ''}
                </span>
              </div>
            </div>
          </div>
          
          {/* تعديل عرض الوصف التفصيلي لاحترام الأسطر الجديدة */}
          <div 
            className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-strong:text-gray-900 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ 
              __html: product.description
                // معالجة الأسطر الجديدة إذا لم تكن محاطة بوسوم HTML
                .replace(/\n(?!<)/g, '<br />')
            }}
          />
        </div>

        {/* Script لتفعيل السلايدر */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const carouselItems = document.querySelectorAll('[data-carousel-item]');
              const prevButton = document.querySelector('[data-carousel-prev]');
              const nextButton = document.querySelector('[data-carousel-next]');
              const indicators = document.querySelectorAll('[data-carousel-slide-to]');
              let activeIndex = 0;
              
              if (!carouselItems.length) return;
              
              // تحديث مؤشر الصورة النشطة
              function updateActiveItem(newIndex) {
                carouselItems.forEach((item, index) => {
                  if (index === newIndex) {
                    item.classList.remove('opacity-0');
                    item.classList.add('opacity-100');
                    item.setAttribute('data-carousel-item', 'active');
                  } else {
                    item.classList.remove('opacity-100');
                    item.classList.add('opacity-0');
                    item.setAttribute('data-carousel-item', '');
                  }
                });
                
                // تحديث مؤشرات الصور المصغرة
                indicators.forEach((indicator, index) => {
                  if (index === newIndex) {
                    indicator.classList.remove('border-gray-200');
                    indicator.classList.add('border-primary-600');
                  } else {
                    indicator.classList.remove('border-primary-600');
                    indicator.classList.add('border-gray-200');
                  }
                });
                
                activeIndex = newIndex;
              }
              
              // حدث زر السابق
              if (prevButton) {
                prevButton.addEventListener('click', () => {
                  const newIndex = activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
                  updateActiveItem(newIndex);
                });
              }
              
              // حدث زر التالي
              if (nextButton) {
                nextButton.addEventListener('click', () => {
                  const newIndex = activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
                  updateActiveItem(newIndex);
                });
              }
              
              // أحداث مؤشرات الصور المصغرة
              indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                  updateActiveItem(index);
                });
              });
            });
            `
          }}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ChevronRight className="h-6 w-6 ml-2 text-primary-600" />
              منتجات ذات صلة
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                  <Link href={`/products/${relatedProduct.slug}`} className="block relative h-48 bg-gray-50">
                    <Image
                      src={relatedProduct.images[0]?.url || '/images/placeholder.jpg'}
                      alt={relatedProduct.name_ar}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                      <Link href={`/products/${relatedProduct.slug}`}>
                        {relatedProduct.name_ar}
                      </Link>
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-primary-600">{relatedProduct.price.toLocaleString()} ج.م</span>
                      <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 p-1.5 rounded-full">
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 