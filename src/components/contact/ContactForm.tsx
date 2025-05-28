'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormValues } from '@/actions/sendMail';
import { sendContactEmail } from '@/actions/sendMail';
import { toast } from 'react-hot-toast';

interface ContactFormProps {
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Add reCAPTCHA token if implemented
      // data.recaptcha = await getReCaptchaToken();
      
      const result = await sendContactEmail(data);
      
      if (result.success) {
        toast.success(result.message);
        setFormSuccess(true);
        reset();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {formSuccess ? (
        <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto text-green-500 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold mb-2 text-gray-900">تم إرسال رسالتك بنجاح!</h3>
          <p className="text-gray-600 mb-4">سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.</p>
          <button
            type="button"
            onClick={() => setFormSuccess(false)}
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition-colors"
          >
            إرسال رسالة أخرى
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                id="name"
                type="text"
                placeholder=" "
                {...register('name')}
                className={`peer w-full px-4 py-3 rounded-md border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent placeholder-transparent`}
              />
              <label
                htmlFor="name"
                className="absolute text-gray-500 text-sm left-4 -top-2.5 bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
              >
                الاسم الكامل
              </label>
              {errors.name && (
                <span className="text-red-500 text-sm block mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder=" "
                {...register('email')}
                className={`peer w-full px-4 py-3 rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent placeholder-transparent`}
              />
              <label
                htmlFor="email"
                className="absolute text-gray-500 text-sm left-4 -top-2.5 bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
              >
                البريد الإلكتروني
              </label>
              {errors.email && (
                <span className="text-red-500 text-sm block mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="relative">
            <input
              id="phone"
              type="tel"
              placeholder=" "
              {...register('phone')}
              className={`peer w-full px-4 py-3 rounded-md border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent placeholder-transparent`}
            />
            <label
              htmlFor="phone"
              className="absolute text-gray-500 text-sm left-4 -top-2.5 bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
            >
              رقم الهاتف
            </label>
            {errors.phone && (
              <span className="text-red-500 text-sm block mt-1">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="relative">
            <textarea
              id="message"
              rows={5}
              placeholder=" "
              {...register('message')}
              className={`peer w-full px-4 py-3 rounded-md border ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent placeholder-transparent`}
            ></textarea>
            <label
              htmlFor="message"
              className="absolute text-gray-500 text-sm left-4 -top-2.5 bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
            >
              الرسالة
            </label>
            {errors.message && (
              <span className="text-red-500 text-sm block mt-1">
                {errors.message.message}
              </span>
            )}
          </div>

          {/* reCAPTCHA would go here */}
          
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white py-3 px-8 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري الإرسال...
                </span>
              ) : (
                'إرسال الرسالة'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 