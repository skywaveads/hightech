export interface Author {
  id: string;
  name: string;
  nameAr: string;
  title: string;
  titleAr: string;
  bio: string;
  bioAr: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  sameAs?: string[];
}

export const authors: Author[] = [
  {
    id: 'admin',
    name: 'HighTech Team',
    nameAr: 'فريق هاي تكنولوجي',
    title: 'Editorial Team',
    titleAr: 'فريق التحرير',
    bio: 'Our expert editorial team combines decades of experience in vinyl cutting technology, digital fabrication, and industry insights.',
    bioAr: 'يجمع فريق التحرير الخبير لدينا عقودًا من الخبرة في تقنية قص الفينيل والتصنيع الرقمي ورؤى الصناعة.',
    image: '/images/author/Mohamed_Saleh.png',
    sameAs: [
      'https://highcutegypt.com/team'
    ]
  },
  {
    id: 'mohamed-saleh',
    name: 'Mohamed Saleh',
    nameAr: 'محمد صالح',
    title: 'CEO & Technical Writer',
    titleAr: 'الرئيس التنفيذي وكاتب تقني',
    bio: 'Vinyl cutting expert with 15+ years experience in digital fabrication technologies. Speaks regularly at industry events across MENA.',
    bioAr: 'خبير في قص الفينيل مع أكثر من 15 عامًا من الخبرة في تقنيات التصنيع الرقمي. يتحدث بانتظام في فعاليات الصناعة في جميع أنحاء الشرق الأوسط وشمال إفريقيا.',
    image: '/images/author/Mohamed_Saleh.png',
    linkedin: 'https://linkedin.com/in/mohamed-saleh',
    twitter: 'https://twitter.com/mohamedsaleh',
    sameAs: [
      'https://linkedin.com/in/mohamed-saleh',
      'https://twitter.com/mohamedsaleh',
      'https://highcutegypt.com/team/mohamed-saleh'
    ]
  },
  {
    id: 'sara-elsayed',
    name: 'Sara ElSayed',
    nameAr: 'سارة السيد',
    title: 'Sales Director & Industry Analyst',
    titleAr: 'مديرة المبيعات ومحللة صناعية',
    bio: 'Specializes in market trends for cutting technology. Background in industrial engineering with focus on production optimization.',
    bioAr: 'متخصصة في اتجاهات السوق لتكنولوجيا القطع. خلفية في الهندسة الصناعية مع التركيز على تحسين الإنتاج.',
    image: '/images/author/Sara_ElSayed.png',
    linkedin: 'https://linkedin.com/in/sara-elsayed',
    sameAs: [
      'https://linkedin.com/in/sara-elsayed',
      'https://highcutegypt.com/team/sara-elsayed'
    ]
  },
  {
    id: 'omar-hassan',
    name: 'Omar Hassan',
    nameAr: 'عمر حسان',
    title: 'CTO & Technical Editor',
    titleAr: 'المدير التقني ومحرر تقني',
    bio: 'Develops cutting-edge solutions for precision cutting. Expert in servo-motor systems and calibration techniques.',
    bioAr: 'يطور حلولًا متطورة للقص الدقيق. خبير في أنظمة محركات السيرفو وتقنيات المعايرة.',
    image: '/images/author/Omar_Hassan.png',
    linkedin: 'https://linkedin.com/in/omar-hassan',
    twitter: 'https://twitter.com/omarhassan',
    sameAs: [
      'https://linkedin.com/in/omar-hassan',
      'https://twitter.com/omarhassan',
      'https://highcutegypt.com/team/omar-hassan'
    ]
  },
  {
    id: 'ibrahim-masoud',
    name: 'Ibrahim Masoud',
    nameAr: 'إبراهيم مسعود',
    title: 'Regional Sales Manager',
    titleAr: 'مدير المبيعات الإقليمي',
    bio: 'Specializes in Libya market development and import regulations for cutting equipment. Expert in regional business development.',
    bioAr: 'متخصص في تطوير السوق الليبي ولوائح استيراد معدات القطع. خبير في تطوير الأعمال الإقليمية.',
    image: '/images/author/Ibrahim_Masoud.png',
    linkedin: 'https://linkedin.com/in/ibrahim-masoud',
    sameAs: [
      'https://linkedin.com/in/ibrahim-masoud',
      'https://highcutegypt.com/team/ibrahim-masoud'
    ]
  },
  {
    id: 'tariq-mohamed',
    name: 'Tariq Mohamed',
    nameAr: 'طارق محمد',
    title: 'Import Specialist',
    titleAr: 'أخصائي الاستيراد',
    bio: 'Expert in international trade and equipment import procedures. Specializes in Libya and North Africa markets.',
    bioAr: 'خبير في التجارة الدولية وإجراءات استيراد المعدات. متخصص في الأسواق الليبية وشمال إفريقيا.',
    image: '/images/author/Tariq_Mohamed.png',
    linkedin: 'https://linkedin.com/in/tariq-mohamed',
    sameAs: [
      'https://linkedin.com/in/tariq-mohamed',
      'https://highcutegypt.com/team/tariq-mohamed'
    ]
  }
];