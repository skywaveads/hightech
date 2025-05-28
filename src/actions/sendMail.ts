'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

// Contact form schema for validation
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'الاسم يجب أن يكون أكثر من حرفين' }),
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  phone: z.string().min(8, { message: 'رقم الهاتف غير صالح' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن تكون أكثر من 10 أحرف' }),
  recaptcha: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export async function sendContactEmail(data: ContactFormValues) {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(data);

    // TODO: Verify reCAPTCHA if token exists
    if (validatedData.recaptcha) {
      // In a real implementation, you'd verify the token with Google's API
    }

    // Create a nodemailer transporter (configure with actual credentials in production)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'example@gmail.com',
        pass: process.env.SMTP_PASSWORD || 'password',
      },
    });

    // Prepare email content
    const mailOptions = {
      from: process.env.SMTP_FROM || 'website@hightechnologyegypt.com',
      to: process.env.CONTACT_EMAIL || 'info@hightechnologyegypt.com',
      subject: `رسالة جديدة من نموذج الاتصال: ${validatedData.name}`,
      text: `
        الاسم: ${validatedData.name}
        البريد الإلكتروني: ${validatedData.email}
        رقم الهاتف: ${validatedData.phone}
        
        الرسالة:
        ${validatedData.message}
      `,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>رسالة جديدة من موقع هاي تكنولوجي</h2>
          <p><strong>الاسم:</strong> ${validatedData.name}</p>
          <p><strong>البريد الإلكتروني:</strong> ${validatedData.email}</p>
          <p><strong>رقم الهاتف:</strong> ${validatedData.phone}</p>
          <p><strong>الرسالة:</strong></p>
          <p style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${validatedData.message.replace(/\n/g, '<br>')}</p>
          <hr />
          <p>تم إرسال هذه الرسالة من نموذج الاتصال في موقع هاي تكنولوجي</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return { success: true, message: 'تم إرسال الرسالة بنجاح!' };
  } catch (error) {
    console.error('Error sending email:', error);
    
    if (error instanceof z.ZodError) {
      // Return validation errors
      return { 
        success: false, 
        message: 'يوجد خطأ في البيانات المدخلة',
        errors: error.errors.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      };
    }
    
    return { success: false, message: 'حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى' };
  }
} 