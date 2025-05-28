export interface Region {
  id: string;
  name: string;
  nameAr: string;
  flag: string; // رمز العلم (استخدام رمز إيموجي للدولة)
  stats: {
    machines: number; // عدد الأجهزة المثبتة
    partners: number; // عدد شركاء إعادة البيع
    supportHubs: number; // عدد مراكز الدعم
  };
  mainCity: string; // المدينة الرئيسية
  mainCityAr: string;
}

export const regions: Region[] = [
  {
    id: 'egypt',
    name: 'Egypt',
    nameAr: 'مصر',
    flag: '🇪🇬',
    stats: {
      machines: 1850,
      partners: 12,
      supportHubs: 2
    },
    mainCity: 'Cairo',
    mainCityAr: 'القاهرة'
  },
  {
    id: 'ksa',
    name: 'Saudi Arabia',
    nameAr: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    stats: {
      machines: 780,
      partners: 5,
      supportHubs: 1
    },
    mainCity: 'Riyadh',
    mainCityAr: 'الرياض'
  },
  {
    id: 'uae',
    name: 'United Arab Emirates',
    nameAr: 'الإمارات العربية المتحدة',
    flag: '🇦🇪',
    stats: {
      machines: 320,
      partners: 3,
      supportHubs: 0
    },
    mainCity: 'Dubai',
    mainCityAr: 'دبي'
  },
  {
    id: 'libya',
    name: 'Libya',
    nameAr: 'ليبيا',
    flag: '🇱🇾',
    stats: {
      machines: 150,
      partners: 2,
      supportHubs: 1
    },
    mainCity: 'Tripoli',
    mainCityAr: 'طرابلس'
  }
]; 