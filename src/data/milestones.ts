export interface Milestone {
  year: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon?: string; // اسم أيقونة من lucide-react
}

export const milestones: Milestone[] = [
  {
    year: 2019,
    title: "Founding of High Technology Egypt",
    titleAr: "تأسيس شركة هاي تكنولوجي مصر",
    description: "Founded in Cairo with a vision to revolutionize the cutting plotter market in Egypt",
    descriptionAr: "تأسست في القاهرة برؤية لإحداث ثورة في سوق كتر بلوتر في مصر",
    icon: "Building"
  },
  {
    year: 2020,
    title: "First 100 clients",
    titleAr: "أول 100 عميل",
    description: "Achieved a milestone of serving and supporting 100+ businesses across Egypt",
    descriptionAr: "حققنا إنجازًا بخدمة ودعم أكثر من 100 شركة في جميع أنحاء مصر",
    icon: "Users"
  },
  {
    year: 2022,
    title: "GCC expansion",
    titleAr: "التوسع في الخليج",
    description: "Expanded operations to Saudi Arabia and the Gulf region with dedicated sales representatives",
    descriptionAr: "توسعت العمليات إلى المملكة العربية السعودية ومنطقة الخليج مع ممثلي مبيعات متخصصين",
    icon: "MapPin"
  },
  {
    year: 2024,
    title: "Servo-motor technology release",
    titleAr: "إطلاق تقنية محركات السيرفو",
    description: "Introduced high-precision servo-motor cutting plotters to the Egyptian market",
    descriptionAr: "أدخلنا أجهزة كتر بلوتر عالية الدقة بمحركات سيرفو إلى السوق المصري",
    icon: "Cog"
  },
  {
    year: 2025,
    title: "3,000+ active customers",
    titleAr: "أكثر من 3,000 عميل نشط",
    description: "Reached the milestone of 3,000 active customers across MENA region",
    descriptionAr: "وصلنا إلى معلم بارز بوجود 3,000 عميل نشط في جميع أنحاء منطقة الشرق الأوسط وشمال إفريقيا",
    icon: "Award"
  }
]; 