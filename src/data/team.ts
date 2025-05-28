export interface TeamMember {
  id: string;
  name: string;
  nameAr: string;
  title: string;
  titleAr: string;
  bio: string;
  bioAr: string;
  image: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'ceo',
    name: 'Mohamed Saleh',
    nameAr: 'محمد صالح',
    title: 'Chief Executive Officer',
    titleAr: 'الرئيس التنفيذي',
    bio: 'Over 15 years of experience in digital fabrication technology, specializing in vinyl cutters and CNC machines.',
    bioAr: 'أكثر من 15 عامًا من الخبرة في تكنولوجيا التصنيع الرقمي، متخصص في أجهزة قطع الفينيل وماكينات CNC.',
    image: '/images/author/Mohamed_Saleh.png',
    linkedin: 'https://linkedin.com/in/mohamed-saleh'
  },
  {
    id: 'cto',
    name: 'Omar Hassan',
    nameAr: 'عمر حسان',
    title: 'Chief Technical Officer',
    titleAr: 'المدير التقني',
    bio: 'Engineering background with deep expertise in servo motor systems and precision cutting technologies.',
    bioAr: 'خلفية هندسية مع خبرة عميقة في أنظمة محركات السيرفو وتقنيات القطع الدقيق.',
    image: '/images/author/Omar_Hassan.png',
    linkedin: 'https://linkedin.com/in/omar-hassan'
  },
  {
    id: 'sales',
    name: 'Sara ElSayed',
    nameAr: 'سارة السيد',
    title: 'Sales Director',
    titleAr: 'مدير المبيعات',
    bio: 'Built our sales network across Egypt and Saudi Arabia, with expertise in B2B technical product sales.',
    bioAr: 'بنت شبكة المبيعات الخاصة بنا عبر مصر والسعودية، مع خبرة في مبيعات المنتجات التقنية B2B.',
    image: '/images/author/Sara_ElSayed.png',
    linkedin: 'https://linkedin.com/in/sara-elsayed'
  }
];