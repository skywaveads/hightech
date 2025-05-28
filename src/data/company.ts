export const companyInfo = {
  companyName: "High Technology",
  brandName: "High Cut",
  tagline: "مع هاي كت مفيش حدود",
  phones: ["+201050703016", "+201063313614", "+201100009407"],
  primaryPhone: "+201050703016", // الرقم الأساسي للواتس والمكالمات
  branches: [
    {
      city: "Cairo",
      address: "جسر السويس الرئيسي بجوار Abc التجارية",
      phone: "+201050703016",
      isPrimary: true
    },
    {
      city: "Mansoura",
      address: "حي الجامعة بجوار توكيل فانتازيا",
      phone: "+201063313614",
      isPrimary: false
    },
    {
      city: "Cairo",
      address: "التوفيقية، مول التوفيقية التجاري",
      phone: "+201100009407",
      isPrimary: false
    }
  ],
  hashtags: [
    "#مع_هاي_كت_مفيش_حدود",
    "#هاي_تكنولوجي",
    "#هاي_كت",
    "#كتر_بلوتر"
  ],
  email: "info@hightech-eg.net",
  salesEmail: "sales@hightech-eg.net",
  supportEmail: "support@hightech-eg.net",
  socialMedia: {
    facebook: "https://facebook.com/hightecheg",
    instagram: "https://instagram.com/hightecheg",
    twitter: "https://twitter.com/hightecheg",
    youtube: "https://www.youtube.com/channel/UC123456789"
  },
  workingHours: "السبت - الخميس: 9 صباحًا - 6 مساءً",
  coordinates: {
    cairo: { lat: 30.0805147818521, lng: 31.34789731553594 },
    mansoura: { lat: 31.037899581524757, lng: 31.36489151556249 },
    tawfikia: { lat: 30.045660881881408, lng: 31.23971711553502 }
  },
  foundedYear: 2010,
  mainKeywords: [
    "كتر بلوتر مصر", 
    "كتر بلوتر السعودية", 
    "أجهزة كتر بلوتر", 
    "ماكينات القص",
    "هاي كت مصر"
  ],
  website: "https://hightech-eg.net",
  companyNameAr: "هاي تكنولوجي مصر",
  brandNameAr: "هاي كت",
  countries: ["مصر", "السعودية", "ليبيا"]
} as const;

// Company description in different lengths for different contexts
export const companyDescription = {
  short: "شركة متخصصة في بيع ودعم وصيانة أجهزة كتر بلوتر في مصر والسعودية وليبيا",
  medium: "شركة هاي تكنولوجي مصر متخصصة في بيع ودعم وصيانة أجهزة كتر بلوتر (قواطع الفينيل) لصناعات الإعلانات والملابس والتغليف في مصر والسعودية وليبيا",
  long: "تأسست شركة هاي تكنولوجي مصر عام 2010 كشركة متخصصة في بيع ودعم وصيانة أجهزة كتر بلوتر (قواطع الفينيل) بأعلى جودة وأفضل سعر، مع تقديم خدمات الدعم الفني والصيانة والتدريب المجاني لعملائنا في مصر والسعودية وليبيا. نقدم حلولًا متكاملة لصناعات الإعلانات، الملابس، التعبئة والتغليف والطباعة."
}; 