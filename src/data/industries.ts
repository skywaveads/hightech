export interface Industry {
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  image: string;
  benefits: {
    title: string;
    titleAr: string;
  }[];
  keywords: string[];
  keywordsAr: string[];
}

export interface FAQ {
  industry: string;
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

export const industries: Industry[] = [
  {
    id: "advertising",
    title: "Signage & Advertising",
    titleAr: "اللافتات والإعلانات",
    slug: "vinyl-cutter-for-signage",
    description: "Our precision vinyl cutters revolutionize the signage industry by delivering clean, accurate cuts for storefront displays, banners and promotional materials. With edge detection technology and auto-calibration, businesses can reduce material waste by up to 15% while accelerating production schedules for time-sensitive advertising campaigns.",
    descriptionAr: "تُحدث أجهزة قطع الفينيل الدقيقة لدينا ثورة في صناعة اللافتات من خلال تقديم قصات نظيفة ودقيقة للوحات العرض والمحلات التجارية واللافتات والمواد الترويجية. مع تقنية اكتشاف الحواف والمعايرة التلقائية، يمكن للشركات تقليل هدر المواد بنسبة تصل إلى 15٪ مع تسريع جداول الإنتاج للحملات الإعلانية ذات الحساسية الزمنية.",
    image: "/images/industries/banner.png",
    benefits: [
      {
        title: "15% Material Waste Reduction",
        titleAr: "تقليل هدر المواد بنسبة 15٪"
      },
      {
        title: "Precision Cut for Photorealistic Images",
        titleAr: "قص دقيق للصور عالية الواقعية"
      },
      {
        title: "Fast Turnaround for Campaigns",
        titleAr: "سرعة إنجاز الحملات الإعلانية"
      }
    ],
    keywords: ["vinyl cutter for signage", "advertising plotter", "storefront signage equipment"],
    keywordsAr: ["كتر بلوتر للافتات", "قصاصة إعلانات", "معدات لافتات واجهة المتجر"]
  },
  {
    id: "apparel",
    title: "Apparel Heat-Transfer",
    titleAr: "طباعة الملابس بالحرارة",
    slug: "heat-transfer-vinyl-cutting",
    description: "Transform your apparel business with our heat-transfer vinyl cutters, engineered for detailed designs on fabrics ranging from cotton to polyester blends. The precision tracking system maintains alignment for multi-layer transfers, while the adjustable pressure settings ensure clean cuts on materials as thin as 50 microns without damaging backing sheets.",
    descriptionAr: "قم بتحويل عملك في مجال الملابس مع أجهزة قطع الفينيل الحراري لدينا، المصممة خصيصًا للتصاميم التفصيلية على الأقمشة بدءًا من القطن وحتى مزيج البوليستر. يحافظ نظام التتبع الدقيق على المحاذاة للطبقات المتعددة، بينما تضمن إعدادات الضغط القابلة للتعديل قطعًا نظيفًا للمواد بسماكة تصل إلى 50 ميكرون دون الإضرار بأوراق الدعم.",
    image: "/images/industries/print_shirts.jpg",
    benefits: [
      {
        title: "Multi-Layer Precise Alignment",
        titleAr: "محاذاة دقيقة متعددة الطبقات"
      },
      {
        title: "Works on All Fabric Types",
        titleAr: "يعمل على جميع أنواع الأقمشة"
      },
      {
        title: "50-Micron Material Compatibility",
        titleAr: "توافق مع مواد بسماكة 50 ميكرون"
      }
    ],
    keywords: ["heat-transfer vinyl cutting", "t-shirt printing plotter", "apparel vinyl cutter"],
    keywordsAr: ["قطع الفينيل الحراري", "طابعة تيشيرتات", "كتر بلوتر للملابس"]
  },
  {
    id: "vehicle",
    title: "Vehicle Wrapping & PPF",
    titleAr: "تغليف السيارات وطبقات الحماية",
    slug: "vehicle-wrap-plotter",
    description: "Elevate your vehicle customization business with our high-precision cutting plotters designed specifically for automotive applications. Our servo-motor technology ensures perfect cuts around complex curves and contours, essential for professional-grade vehicle wraps and paint protection films that require zero-margin for error during installation.",
    descriptionAr: "ارتقِ بعملك في مجال تخصيص السيارات مع أجهزة القطع عالية الدقة المصممة خصيصًا للتطبيقات على السيارات. تضمن تقنية محرك السيرفو لدينا قطعًا مثاليًا حول المنحنيات والكفاف المعقدة، وهو أمر ضروري لتغليف السيارات الاحترافي وأفلام حماية الطلاء التي تتطلب هامشًا صفريًا للخطأ أثناء التركيب.",
    image: "/images/industries/car_films.png",
    benefits: [
      {
        title: "Precise Contour Cutting Technology",
        titleAr: "تقنية قص دقيقة للخطوط الخارجية"
      },
      {
        title: "Compatible with PPF & Vinyl Wraps",
        titleAr: "متوافق مع أغشية الحماية وتغليف الفينيل"
      },
      {
        title: "Reduces Installation Time by 30%",
        titleAr: "يقلل وقت التركيب بنسبة 30٪"
      }
    ],
    keywords: ["vehicle wrap plotter", "car wrap cutting machine", "PPF cutting plotter"],
    keywordsAr: ["جهاز قطع تغليف السيارات", "ماكينة قص لتغليف السيارات", "كتر بلوتر لطبقات حماية الطلاء"]
  },
  {
    id: "digital",
    title: "Digital Print & Stickers",
    titleAr: "الطباعة الرقمية والملصقات",
    slug: "sticker-cutting-plotter",
    description: "Maximize your sticker production efficiency with our print-and-cut systems featuring optical registration mark detection. Perfect for small businesses and commercial print shops, these plotters can process pre-printed sheets with pinpoint accuracy, reducing alignment errors to less than 0.1mm even in high-volume production environments.",
    descriptionAr: "عزّز كفاءة إنتاج الملصقات مع أنظمة الطباعة والقص لدينا التي تتميز بتقنية اكتشاف علامات التسجيل البصرية. مثالية للشركات الصغيرة ومطابع الطباعة التجارية، يمكن لهذه الأجهزة معالجة الأوراق المطبوعة مسبقًا بدقة متناهية، مما يقلل أخطاء المحاذاة إلى أقل من 0.1 مم حتى في بيئات الإنتاج ذات الحجم الكبير.",
    image: "/images/industries/stickers.jpg",
    benefits: [
      {
        title: "Optical Mark Registration System",
        titleAr: "نظام تسجيل العلامات البصرية"
      },
      {
        title: "0.1mm Cutting Precision",
        titleAr: "دقة قطع 0.1 مم"
      },
      {
        title: "Processes 500+ Stickers/Hour",
        titleAr: "يعالج أكثر من 500 ملصق/ساعة"
      }
    ],
    keywords: ["sticker cutting plotter", "digital print cutter", "die-cut sticker machine"],
    keywordsAr: ["كتر بلوتر للملصقات", "قطاعة الطباعة الرقمية", "ماكينة ملصقات داي كت"]
  }
];

export const industryFAQs: FAQ[] = [
  // Advertising FAQs
  {
    industry: "advertising",
    question: "What cutting width do I need for storefront signage?",
    questionAr: "ما هو عرض القطع الذي أحتاجه للافتات واجهة المتجر؟",
    answer: "For storefront signage, we recommend a cutter with at least 48 inches (1220mm) width capacity to handle standard sign materials. Our HC-1351 model offers 54 inches for larger seamless displays.",
    answerAr: "للافتات واجهة المتجر، نوصي بقاطع بعرض 48 بوصة (1220 مم) على الأقل للتعامل مع مواد اللافتات القياسية. يوفر طراز HC-1351 لدينا 54 بوصة للعروض السلسة الأكبر."
  },
  {
    industry: "advertising",
    question: "Can your vinyl cutters handle reflective materials for outdoor signs?",
    questionAr: "هل يمكن لقواطع الفينيل لديك التعامل مع المواد العاكسة للافتات الخارجية؟",
    answer: "Yes, all of our commercial-grade vinyl cutters are calibrated to work with reflective and high-intensity prismatic (HIP) reflective materials commonly used for outdoor signage and safety displays.",
    answerAr: "نعم، جميع قواطع الفينيل التجارية لدينا معايرة للعمل مع المواد العاكسة والمواد العاكسة المنشورية عالية الكثافة (HIP) المستخدمة عادة في اللافتات الخارجية وشاشات الأمان."
  },
  {
    industry: "advertising",
    question: "What is the maximum thickness for cutting foam board and PVC?",
    questionAr: "ما هو الحد الأقصى لسمك قطع لوح الفوم والبلاستيك؟",
    answer: "Our heavy-duty models can cut materials up to 2mm thick, including foam board, thin PVC, and magnetic sheets. For thicker materials like 3-5mm PVC board, we recommend our CNC router machines.",
    answerAr: "يمكن لموديلاتنا الثقيلة قطع مواد يصل سمكها إلى 2 مم، بما في ذلك لوح الفوم والبلاستيك الرقيق والصفائح المغناطيسية. للمواد الأكثر سمكًا مثل لوح البلاستيك 3-5 مم، نوصي بآلات التوجيه CNC لدينا."
  },
  
  // Apparel FAQs
  {
    industry: "apparel",
    question: "What's the smallest text size that can be cut for t-shirt designs?",
    questionAr: "ما هو أصغر حجم نص يمكن قطعه لتصاميم القمصان؟",
    answer: "With our precision cutting system, you can reliably cut text as small as 5mm (0.2 inches) in height for heat transfer vinyl. For best results with small text, we recommend using our fine-point blade option.",
    answerAr: "باستخدام نظام القطع الدقيق لدينا، يمكنك قطع نص بارتفاع يصل إلى 5 مم (0.2 بوصة) بشكل موثوق لفينيل النقل الحراري. للحصول على أفضل النتائج مع النصوص الصغيرة، نوصي باستخدام خيار الشفرة ذات النقطة الدقيقة."
  },
  {
    industry: "apparel",
    question: "Can I cut glitter and metallic heat transfer vinyl with your machines?",
    questionAr: "هل يمكنني قطع فينيل النقل الحراري اللامع والمعدني باستخدام أجهزتكم؟",
    answer: "Absolutely. Our cutters come with adjustable pressure settings specifically calibrated for specialty materials like glitter, metallic, and holographic heat transfer vinyl, ensuring clean cuts without damaging the material structure.",
    answerAr: "بالتأكيد. تأتي قواطعنا مع إعدادات ضغط قابلة للتعديل معايرة خصيصًا للمواد المتخصصة مثل فينيل النقل الحراري اللامع والمعدني والهولوغرافي، مما يضمن قطعًا نظيفًا دون الإضرار ببنية المادة."
  },
  {
    industry: "apparel",
    question: "What software works best for designing heat transfer patterns?",
    questionAr: "ما هو أفضل برنامج لتصميم أنماط النقل الحراري؟",
    answer: "Our machines are compatible with all major design software including Adobe Illustrator, CorelDRAW, and Silhouette Studio. We also offer HighCut Design Suite which includes pre-made templates for common apparel sizes and positioning guides.",
    answerAr: "أجهزتنا متوافقة مع جميع برامج التصميم الرئيسية بما في ذلك Adobe Illustrator وCorelDRAW وSilhouette Studio. نقدم أيضًا مجموعة تصميم HighCut التي تتضمن قوالب جاهزة لأحجام الملابس الشائعة وأدلة تحديد المواقع."
  },
  
  // Vehicle FAQs
  {
    industry: "vehicle",
    question: "How precise are the contour cuts for complex vehicle surfaces?",
    questionAr: "ما مدى دقة قطع الكونتور للأسطح المعقدة للسيارات؟",
    answer: "Our vehicle wrap cutters achieve contour accuracy within 0.1mm, essential for complex curves around mirrors, door handles, and emblems. The servo motor technology maintains this precision even at maximum cutting speeds.",
    answerAr: "تحقق قواطع تغليف السيارات لدينا دقة كونتور في حدود 0.1 مم، وهي ضرورية للمنحنيات المعقدة حول المرايا ومقابض الأبواب والشعارات. تحافظ تقنية محرك السيرفو على هذه الدقة حتى عند سرعات القطع القصوى."
  },
  {
    industry: "vehicle",
    question: "Can your plotters cut paint protection film without stretching it?",
    questionAr: "هل يمكن لأجهزة القطع لديك قطع فيلم حماية الطلاء دون تمديده؟",
    answer: "Yes, our cutting plotters feature adjustable tension systems specifically designed for TPU-based paint protection films. This prevents stretching and ensures dimensional accuracy for a perfect fit on vehicle surfaces.",
    answerAr: "نعم، تتميز أجهزة القطع لدينا بأنظمة شد قابلة للتعديل مصممة خصيصًا لأفلام حماية الطلاء المعتمدة على TPU. هذا يمنع التمدد ويضمن الدقة الأبعادية للحصول على تناسب مثالي على أسطح السيارة."
  },
  {
    industry: "vehicle",
    question: "What is the largest size vehicle template your machines can handle?",
    questionAr: "ما هو أكبر حجم لقالب السيارة الذي يمكن لأجهزتك التعامل معه؟",
    answer: "Our wide-format vehicle wrap cutters can process templates up to 1.6 meters (64 inches) wide, sufficient for full hood panels, truck sides, and complete door wraps in a single pass without tiling.",
    answerAr: "يمكن لقواطع تغليف السيارات ذات التنسيق العريض لدينا معالجة قوالب يصل عرضها إلى 1.6 متر (64 بوصة)، وهي كافية للوحات غطاء المحرك الكاملة وجوانب الشاحنات وتغليفات الأبواب الكاملة في تمريرة واحدة دون تجانب."
  },
  
  // Digital FAQs
  {
    industry: "digital",
    question: "Does your contour cutting system work with any printer?",
    questionAr: "هل يعمل نظام القطع الكنتوري الخاص بك مع أي طابعة؟",
    answer: "Our contour cutting system is compatible with output from any printer that can produce registration marks. This includes wide-format inkjet printers from HP, Epson, Canon, and Roland, as well as standard office printers for smaller jobs.",
    answerAr: "نظام القطع الكنتوري لدينا متوافق مع الإخراج من أي طابعة يمكنها إنتاج علامات التسجيل. وهذا يشمل طابعات نفث الحبر ذات التنسيق العريض من HP وEpson وCanon وRoland، بالإضافة إلى طابعات المكاتب القياسية للوظائف الأصغر."
  },
  {
    industry: "digital",
    question: "How accurate is the optical registration for print-and-cut stickers?",
    questionAr: "ما مدى دقة التسجيل البصري لملصقات الطباعة والقص؟",
    answer: "Our ARMS (Automatic Registration Mark System) achieves alignment accuracy within 0.1mm between printed images and cut lines, ensuring perfectly trimmed stickers even with complex designs and high-volume production runs.",
    answerAr: "يحقق نظام ARMS (نظام علامة التسجيل التلقائي) لدينا دقة محاذاة في حدود 0.1 مم بين الصور المطبوعة وخطوط القطع، مما يضمن ملصقات مقطوعة بشكل مثالي حتى مع التصميمات المعقدة وعمليات الإنتاج ذات الحجم الكبير."
  },
  {
    industry: "digital",
    question: "What's the maximum cutting speed for sticker production?",
    questionAr: "ما هي السرعة القصوى للقطع لإنتاج الملصقات؟",
    answer: "Our digital finishing plotters operate at speeds up to 800mm/second, allowing production of 500+ individually cut stickers per hour from pre-printed sheets. The intelligent feed system minimizes downtime between sheets.",
    answerAr: "تعمل أجهزة القطع النهائية الرقمية لدينا بسرعات تصل إلى 800 مم/ثانية، مما يسمح بإنتاج أكثر من 500 ملصق مقطوع بشكل فردي في الساعة من الأوراق المطبوعة مسبقًا. يقلل نظام التغذية الذكي من وقت التوقف بين الأوراق."
  }
]; 