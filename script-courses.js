/* ============================================================
   script-courses.js — Courses page: data, filter, search, modal
   ============================================================ */

/* ── COURSE DATABASE ── */
const COURSES_DATA = [
  {
    id: 1,
    titleAr: 'Python للمبتدئين — من الصفر إلى الاحتراف',
    titleFr: 'Python pour débutants — du zéro au pro',
    categoryAr: 'برمجة', categoryFr: 'Développement',
    emoji: '🐍',
    headerBg: 'linear-gradient(135deg,#2b5876,#4e4376)',
    levelAr: 'مبتدئ', levelFr: 'Débutant',
    hours: '45 ساعة', students: '1,240 طالب', rating: '4.9',
    instructorName: 'أيمن حداد', instructorInitial: 'أ',
    instructorTitle: 'مهندس برمجيات | 8 سنوات خبرة',
    instructorBio: 'مهندس برمجيات يعمل حالياً في شركة Sonatrach Digital. درّس أكثر من 1000 طالب في Python وعلوم البيانات.',
    descriptionAr: 'تعلم Python من الصفر حتى تبني مشاريع حقيقية في تحليل البيانات والتشغيل الآلي. الكورس مقسّم لمسارين: مسار مجاني للأساسيات ومسار VIP مع متابعة شخصية.',
    descriptionFr: 'Apprenez Python de zéro jusqu\'à construire des projets réels en analyse de données. Le cours est divisé en deux parcours : gratuit pour les bases et VIP avec suivi personnalisé.',
    curriculumAr: ['أساسيات Python: المتغيرات، الشروط، الحلقات', 'البرمجة كائنية التوجه (OOP)', 'العمل مع الملفات وقواعد البيانات', 'مكتبات NumPy و Pandas للبيانات', 'مشروع تخرج: تحليل سوق العمل الجزائري'],
    curriculumFr: ['Bases de Python : variables, conditions, boucles', 'Programmation orientée objet (POO)', 'Travail avec fichiers et bases de données', 'Bibliothèques NumPy et Pandas', 'Projet de fin : analyse du marché algérien'],
    sessions: [
      { icon: '👥', name: 'حصص جماعية', price: 'مجاني', desc: 'دروس مسجلة + مجموعة دعم' },
      { icon: '⭐', name: 'VIP حصة خاصة', price: '1,500 دج/ساعة', desc: 'جلسة 1-1 مع المدرب مباشرة' },
      { icon: '🚀', name: 'Bootcamp مكثف', price: '8,000 دج/شهر', desc: '3 أشهر تدريب مكثف مع مشروع' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNsUNjE81eOqtfjZOZxHIarmLiCDxKcwqMjadb4Xf6h2MiItmzIYXLbiYNRutsoMiLVKOBK6iVZZw_pEkqd97pQPFvlI7-ij18fm26_JItaHNlo9iTE1LkteUrV2bj9e7OS8JXR3d_TZVrNTApmpgZlrrkPIGYP4ig80yq8KDmuZdPvW42b5GUR99f7OZrzcTrVzEz3KnoW78OBxDcARYPi4NVmtwq35Vj3CGoKEbJtgR4irluVJkFZwJaqcLlqxDSAeReXzOdPOY',
  },
  {
    id: 2,
    titleAr: 'Figma / UI Design Mastery',
    titleFr: 'Maîtrise Figma / UI Design',
    categoryAr: 'تصميم', categoryFr: 'Design',
    emoji: '🎨',
    headerBg: 'linear-gradient(135deg,#8e2de2,#4a00e0)',
    levelAr: 'متوسط', levelFr: 'Intermédiaire',
    hours: '32 ساعة', students: '850 طالب', rating: '4.8',
    instructorName: 'مريم بلقاسم', instructorInitial: 'م',
    instructorTitle: 'مصممة UI/UX | 5 سنوات خبرة',
    instructorBio: 'مصممة UI/UX تعمل لحساب عملاء أوروبيين. حاصلة على شهادة Google UX Design.',
    descriptionAr: 'إتقان Figma من الصفر حتى تصميم تطبيقات احترافية. ستتعلم نظريات التصميم، الألوان، التايبوغرافي، وكيفية بناء نظام تصميم متكامل.',
    descriptionFr: 'Maîtrisez Figma de zéro jusqu\'à la conception d\'applications professionnelles. Vous apprendrez les théories du design, les couleurs, la typographie et comment construire un système de design complet.',
    curriculumAr: ['أساسيات Figma: الأدوات والواجهة', 'نظريات التصميم والألوان', 'Components و Auto Layout', 'Prototyping والتأثيرات التفاعلية', 'مشروع: تصميم تطبيق Delivery'],
    curriculumFr: ['Bases de Figma : outils et interface', 'Théories du design et couleurs', 'Components et Auto Layout', 'Prototypage et effets interactifs', 'Projet : conception d\'une app Delivery'],
    sessions: [
      { icon: '👥', name: 'حصص جماعية', price: 'مجاني', desc: 'دروس مسجلة + مجموعة دعم' },
      { icon: '⭐', name: 'جلسة VIP', price: '2,000 دج/ساعة', desc: '1-1 مع المصممة مباشرة' },
      { icon: '🎯', name: 'ورشة عمل', price: '5,000 دج', desc: 'يوم كامل تدريب مكثف' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlzJ4U-4_lpaqSTEMBfkw31KX3V22L3CxTZSmOulF0TjmHcl35URlgSQ1VoJ0ietb7CTRcSaJ8WM9qWqX5NbnV8GZaBp96nVHOYBEPmzv5p9UHDXR-o7CzqdWcPYt9-dNotGPu9a5a21MFB6eWfk0xdLduSUywZOifBmCH-zvYn1S8jtiIsSfXQzXPa2xi3nYezdOiJbZ1lSq8hxMh9KZW4UCUctf5lC8iDLIEdXmSH2JHN1SJOdkAbZDx0havt0vmwW_D0sEbUm8',
  },
  {
    id: 3,
    titleAr: 'English for Professionals',
    titleFr: 'Anglais Professionnel',
    categoryAr: 'لغات', categoryFr: 'Langues',
    emoji: '🌍',
    headerBg: 'linear-gradient(135deg,#f2994a,#f2c94c)',
    levelAr: 'متقدم', levelFr: 'Avancé',
    hours: '28 ساعة', students: '2,100 طالب', rating: '4.7',
    instructorName: 'ياسين منصوري', instructorInitial: 'ي',
    instructorTitle: 'مدرب لغة إنجليزية | IELTS 8.0',
    instructorBio: 'حاصل على IELTS 8.0 وخبرة 6 سنوات في تدريس الإنجليزية للمحترفين. ساعد أكثر من 500 طالب.',
    descriptionAr: 'تطوير مهاراتك في اللغة الإنجليزية للبيئة المهنية. التركيز على المحادثة، كتابة الإيميلات، والمقابلات الوظيفية.',
    descriptionFr: 'Développez vos compétences en anglais professionnel. Focus sur la conversation, la rédaction d\'emails et les entretiens d\'embauche.',
    curriculumAr: ['المحادثة المهنية والعروض التقديمية', 'كتابة الإيميلات والتقارير', 'تحضير المقابلات الوظيفية', 'مصطلحات التقنية والأعمال', 'محاكاة مقابلات وظيفية حقيقية'],
    curriculumFr: ['Communication professionnelle et présentations', 'Rédaction d\'emails et rapports', 'Préparation aux entretiens d\'embauche', 'Terminologie technique et commerciale', 'Simulations d\'entretiens réels'],
    sessions: [
      { icon: '👥', name: 'حصص جماعية', price: 'مجاني', desc: 'دروس مسجلة + مجموعة دعم' },
      { icon: '💬', name: 'جلسة محادثة', price: '1,200 دج/ساعة', desc: '1-1 مع المدرب مباشرة' },
      { icon: '🚀', name: 'برنامج مكثف', price: '6,000 دج/شهر', desc: '2 جلسات أسبوعياً لمدة شهر' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOUoAQnyaDpW-m7PpX8w-XgpIjIqQ5KqdExli2z30cnM68-bdz9IdzhwcB344DNRsIpcIILoqT4FbRN2kbss-N9zf8S0pxfAXite5rXtKuT4BKSixPGBuTy9wgWc6lj79bO9n_U0in9G5buM5oCl00mIFNTNwvXRmlUpNrfEqHv7kWZtaKbN_fV0GGEuA7EtSkVoQJ46Y6B4MIwBB9LwE82trMMzy0E94BAOyEGwp87o8IoaJ4m63rCQCuUhyXGVVu_qXbcckUYEo',
  },
  {
    id: 4,
    titleAr: 'Digital Marketing Bootcamp',
    titleFr: 'Bootcamp Marketing Digital',
    categoryAr: 'تسويق', categoryFr: 'Marketing',
    emoji: '📈',
    headerBg: 'linear-gradient(135deg,#00b09b,#96c93d)',
    levelAr: 'مبتدئ', levelFr: 'Débutant',
    hours: '40 ساعة', students: '950 طالب', rating: '4.9',
    instructorName: 'ليلى عثماني', instructorInitial: 'ل',
    instructorTitle: 'مديرة تسويق رقمي | 7 سنوات',
    instructorBio: 'مديرة تسويق رقمي لكبرى الشركات الجزائرية. دربت أكثر من 800 طالب في مجال التسويق.',
    descriptionAr: 'إطلاق مسيرتك في التسويق الرقمي من الصفر. ستتعلم كيف تسوّق عبر الإنترنت وتحصل على عملاء.',
    descriptionFr: 'Lancez votre carrière en marketing digital. Vous apprendrez à commercialiser en ligne et à acquérir des clients.',
    curriculumAr: ['أساسيات التسويق الرقمي', 'إدارة منصات التواصل الاجتماعي', 'SEO وتحسين محركات البحث', 'Google Ads وحملات الإعلانات', 'مشروع: إطلاق حملة تسويقية حقيقية'],
    curriculumFr: ['Bases du marketing digital', 'Gestion des réseaux sociaux', 'SEO et optimisation des moteurs de recherche', 'Google Ads et campagnes publicitaires', 'Projet : lancement d\'une vraie campagne'],
    sessions: [
      { icon: '👥', name: 'حصص جماعية', price: 'مجاني', desc: 'دروس مسجلة + مجموعة دعم' },
      { icon: '🚀', name: 'Bootcamp', price: '7,000 دج/شهر', desc: 'تدريب مكثف مع مشاريع حقيقية' },
      { icon: '⭐', name: 'استشارة خاصة', price: '2,500 دج/جلسة', desc: 'استشارة مخصصة لمشروعك' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKfz0YzHoV1OsBGg1_sZ1qAEjgkc2pAeGoXfC077EPlO-nEOPw0BRvNdpjKFtbI2-lD4mr1TrPucWEfBAogPzn1DDVkooHZ5VUA63_7LPrh6sq-s70o30FQNZpdcJiFH2FfrLxYp8-rwINQTV9SpO-d_exEPMe-1IOWUme4xqhYMp4AOfxeyxWbXPqvA3z7n1U9pz2mpRVwOUg4nKfJp728iygjy08UM_zyo8ibxL9OWrV9Yx0IdPr0-PfTqOs30-J2UCTsifHpnI',
  },
  {
    id: 5,
    titleAr: 'Excel & Power BI Masterclass',
    titleFr: 'Masterclass Excel & Power BI',
    categoryAr: 'أعمال', categoryFr: 'Business',
    emoji: '📊',
    headerBg: 'linear-gradient(135deg,#4b6cb7,#182848)',
    levelAr: 'متوسط', levelFr: 'Intermédiaire',
    hours: '25 ساعة', students: '540 طالب', rating: '4.6',
    instructorName: 'كمال زيتوني', instructorInitial: 'ك',
    instructorTitle: 'محلل بيانات أعمال | 10 سنوات',
    instructorBio: 'محلل بيانات أعمال في شركة دولية. خبير في Excel المتقدم وPower BI.',
    descriptionAr: 'إتقان Excel المتقدم وPower BI لتحليل البيانات وإنشاء تقارير احترافية.',
    descriptionFr: 'Maîtrisez Excel avancé et Power BI pour l\'analyse de données et la création de rapports professionnels.',
    curriculumAr: ['Excel المتقدم: الصيغ والدوال', 'Pivot Tables والتحليل السريع', 'Power Query وتحويل البيانات', 'Power BI: إنشاء لوحات المعلومات', 'مشروع: تقرير مالي شامل'],
    curriculumFr: ['Excel avancé : formules et fonctions', 'Tableaux croisés dynamiques', 'Power Query et transformation de données', 'Power BI : création de tableaux de bord', 'Projet : rapport financier complet'],
    sessions: [
      { icon: '👥', name: 'حصص جماعية', price: 'مجاني', desc: 'دروس مسجلة + مجموعة دعم' },
      { icon: '🏢', name: 'تدريب للشركات', price: 'حسب الاتفاق', desc: 'تدريب فريق عملك' },
      { icon: '⭐', name: 'جلسة خاصة', price: '2,000 دج/ساعة', desc: 'حل مشكلتك مباشرة' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhLzhLE8EFRM6iORprO3haG-p-c3HkBVY8Y9MwMoaoopDFbOz886T34VowRH0a6GQpMcpP2RZrGGzHPKGrGneZq9NpjDHy11DrT9OgNPIGB5egpfRiMpG2pIZvvi-iBrZZWky3hn4ATKjKyiecPlOXo9CX7SpR1uCTi54ejgNN3ibt37ZWOkL-fhxssLZZLOXDbbu6939M3fhH5s17l7KFkS502XvErX3IJHqkdLlwcKweDsAPDNy2Ehv_MzCd9dXmp5_N249rt1I',
  },
  {
    id: 6,
    titleAr: 'AI Introduction & Prompting',
    titleFr: 'Introduction à l\'IA & Prompting',
    categoryAr: 'برمجة', categoryFr: 'Développement',
    emoji: '🤖',
    headerBg: 'linear-gradient(135deg,#ff5f6d,#ffc371)',
    levelAr: 'مبتدئ', levelFr: 'Débutant',
    hours: '15 ساعة', students: '3,400 طالب', rating: '5.0',
    instructorName: 'رضا علوي', instructorInitial: 'ر',
    instructorTitle: 'مهندس ذكاء اصطناعي | باحث',
    instructorBio: 'مهندس ذكاء اصطناعي وباحث في تطبيقات AI. حاصل على ماستر في Machine Learning.',
    descriptionAr: 'مدخل عملي لعالم الذكاء الاصطناعي. تعلم كيف تستخدم ChatGPT وClaude لزيادة إنتاجيتك.',
    descriptionFr: 'Introduction pratique au monde de l\'IA. Apprenez à utiliser ChatGPT et Claude pour booster votre productivité.',
    curriculumAr: ['فهم الذكاء الاصطناعي ومبادئه', 'Prompt Engineering المتقدم', 'ChatGPT وClaude للعمل اليومي', 'أدوات AI للتصميم والبرمجة', 'بناء سير عمل مؤتمت بالكامل'],
    curriculumFr: ['Comprendre l\'IA et ses principes', 'Prompt Engineering avancé', 'ChatGPT et Claude pour le travail quotidien', 'Outils IA pour le design et la programmation', 'Construction de workflows automatisés'],
    sessions: [
      { icon: '👥', name: 'حصص جماعية', price: 'مجاني', desc: 'دروس مسجلة + مجموعة دعم' },
      { icon: '🎯', name: 'ورشة عملية', price: '3,000 دج', desc: 'يوم كامل تطبيق عملي' },
      { icon: '⭐', name: 'VIP مكثف', price: '10,000 دج/شهر', desc: 'برنامج متخصص مع متابعة' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRFKLDKDQZzMnFstDPP-LG0X2mtUCYoOlF2d_ZhykGb3U628OVmgYYKz_UNQgJyoFVs4929Iusn49S-EOh1_kTZ9qTDkQ2mFzpYXVTIYvfJ3pqpR4deYt70nB0JLq4DRm7ROA6CAG_nly3BMlUu_t3MbhaKksuDNGdGVhHRRgMK9VQ-TOrBTF6lY3fdCwYiq7CTFIM0UFL8ho5GQPJUCh1zF5xslXwmr43YbXWoE-7O76qJ-H5KhEsUyuIfzEdcTdpHEm3HmfKRjI',
  },
  {
    id: 7,
    titleAr: 'Mobile App Design (iOS/Android)',
    titleFr: 'Design Applications Mobiles',
    categoryAr: 'تصميم', categoryFr: 'Design',
    emoji: '📱',
    headerBg: 'linear-gradient(135deg,#2193b0,#6dd5ed)',
    levelAr: 'متقدم', levelFr: 'Avancé',
    hours: '38 ساعة', students: '420 طالب', rating: '4.8',
    instructorName: 'سارة حداد', instructorInitial: 'س',
    instructorTitle: 'مصممة تطبيقات موبايل | 6 سنوات',
    instructorBio: 'مصممة تطبيقات متخصصة في iOS وAndroid. عملت مع شركات من السعودية وكندا.',
    descriptionAr: 'تصميم تطبيقات الهاتف المحمول وفق معايير Apple وGoogle. من النماذج الأولية إلى التسليم النهائي.',
    descriptionFr: 'Concevez des applications mobiles selon les standards Apple et Google. Des maquettes à la livraison finale.',
    curriculumAr: ['مبادئ HIG وMaterial Design', 'تصميم Navigation وUser Flows', 'Prototyping التفاعلي في Figma', 'تسليم التصاميم للمطورين', 'مشروع: تطبيق تجارة إلكترونية'],
    curriculumFr: ['Principes HIG et Material Design', 'Design Navigation et User Flows', 'Prototypage interactif dans Figma', 'Livraison des designs aux développeurs', 'Projet : application e-commerce'],
    sessions: [
      { icon: '👥', name: 'حصص جماعية', price: 'مجاني', desc: 'دروس مسجلة + مجموعة دعم' },
      { icon: '⭐', name: 'نقد التصاميم', price: '2,500 دج/ساعة', desc: 'مراجعة وتحسين أعمالك' },
      { icon: '🚀', name: 'مشروع كامل', price: '15,000 دج', desc: 'تصميم تطبيقك كاملاً' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcWZdhnvHG5D57Obpl06qb45V4DzvEjURVKipX-kOqxQUSiQlQIPITw_lBwNJChko2m_e3OzLc8fKVAIMbkaWlBUpRnICmjaLqqYXgTZPReG2y6VkpKiIDUxu9ST9mi2lTRIXVu00VL8NaGO0wUaL1NTPqSCWPMw5Rx7sNXYZR16pEjr_VO7dCwkmozlbQAc0xMD0hrI0xjfqtlyrV7H2dgnxnDGsdwUnVgMIPF4_hv20Rca2CPrkNbawes6v20A5dujU2bzQjDog',
  },
  {
    id: 8,
    titleAr: 'French for Business Communication',
    titleFr: 'Français des Affaires',
    categoryAr: 'لغات', categoryFr: 'Langues',
    emoji: '🇫🇷',
    headerBg: 'linear-gradient(135deg,#ee0979,#ff6a00)',
    levelAr: 'متوسط', levelFr: 'Intermédiaire',
    hours: '22 ساعة', students: '880 طالب', rating: '4.5',
    instructorName: 'مراد عباسي', instructorInitial: 'م',
    instructorTitle: 'أستاذ فرنسية مؤهل | DALF C2',
    instructorBio: 'أستاذ لغة فرنسية حاصل على DALF C2. خبرة 12 سنة في تعليم الفرنسية للمحترفين.',
    descriptionAr: 'تحسين مستواك في الفرنسية للبيئة المهنية. التركيز على المحادثة التجارية وكتابة الوثائق الرسمية.',
    descriptionFr: 'Améliorez votre niveau de français pour l\'environnement professionnel. Focus sur la communication commerciale et la rédaction de documents officiels.',
    curriculumAr: ['المحادثة المهنية بالفرنسية', 'كتابة الرسائل والتقارير الرسمية', 'مصطلحات المال والأعمال', 'الاجتماعات والعروض التقديمية', 'اختبار نهائي وشهادة'],
    curriculumFr: ['Communication professionnelle en français', 'Rédaction de lettres et rapports officiels', 'Terminologie financière et commerciale', 'Réunions et présentations', 'Examen final et certification'],
    sessions: [
      { icon: '👥', name: 'حصص جماعية', price: 'مجاني', desc: 'دروس مسجلة + مجموعة دعم' },
      { icon: '💬', name: 'جلسة محادثة', price: '800 دج/ساعة', desc: 'تدرب على المحادثة مع أستاذ' },
      { icon: '🚀', name: 'دورة مكثفة', price: '4,000 دج/شهر', desc: 'إنهاء الدورة في شهر واحد' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDbwX0GC2VFbt5PfJKhmtPl0eVjWC_tbbdy7O89ed5pEUiaPwu2NedyS0CDqDb40-aRft472J1u0m4eI_b_qZJXDNfE2L6J1bu_0Zf--tNpzwWlOhcSqPn6AiORJyVVZYUkyBzSCBULaXpPvcs5pTQLJ3yQq3azSSs-4SdEp13RO30lYDJO-GbkV1DDMDHWG_Mb9b95Gyb3i8A3KG0amx4y6hsFgarV-52DMxQYN5kWc5nU1sTspUrMmsjFDZjOGy8O2GUrnJVDk8',
  },
  {
    id: 9,
    titleAr: 'Entrepreneurship in North Africa',
    titleFr: 'Entrepreneuriat en Afrique du Nord',
    categoryAr: 'أعمال', categoryFr: 'Business',
    emoji: '🚀',
    headerBg: 'linear-gradient(135deg,#11998e,#38ef7d)',
    levelAr: 'متقدم', levelFr: 'Avancé',
    hours: '18 ساعة', students: '1,500 طالب', rating: '4.9',
    instructorName: 'ياسين رابحي', instructorInitial: 'ي',
    instructorTitle: 'رائد أعمال | مستشار أعمال',
    instructorBio: 'رائد أعمال جزائري أسس 3 شركات ناجحة. ساعد أكثر من 200 مشروع ناشئ في الجزائر.',
    descriptionAr: 'كيف تطلق مشروعك الخاص في السوق الجزائري والأفريقي. من الفكرة إلى التنفيذ مع فهم القوانين والتمويل.',
    descriptionFr: 'Comment lancer votre propre projet sur le marché algérien et africain. De l\'idée à l\'exécution avec une compréhension des lois et du financement.',
    curriculumAr: ['بناء نموذج العمل التجاري', 'الإطار القانوني للشركات في الجزائر', 'مصادر التمويل والاستثمار', 'التسويق والمبيعات للسوق المحلي', 'مشروع: خطة عمل كاملة'],
    curriculumFr: ['Construction du modèle économique', 'Cadre juridique des entreprises en Algérie', 'Sources de financement et investissement', 'Marketing et ventes pour le marché local', 'Projet : plan d\'affaires complet'],
    sessions: [
      { icon: '👥', name: 'حصص جماعية', price: 'مجاني', desc: 'دروس مسجلة + مجموعة دعم' },
      { icon: '⭐', name: 'استشارة مشروع', price: '5,000 دج/جلسة', desc: 'تقييم ومتابعة مشروعك' },
      { icon: '🏆', name: 'برنامج Incubator', price: '20,000 دج', desc: '3 أشهر حضانة كاملة' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBu_HHrQTgUnTkTEFa-ajW1O_QSTXkYLqckg-ypGGBzK6P8nijzbkUklNxQ6dZkgAN4qEKRpjvrWwdpD2pnYLhTwZVwhnDFQ2eaquvtWzRcYeSNWpBQCeVc5sAJZxzI56Xo85BPm0V13uj7Vba8UUwVupuGUaB5rAVIqVHYpbaKBCgmCXca_KAixXWBZyz1DsCndEJ2ghd_4En20j0gq96JnvgZL7d9-17pMeE3SeojvX8Tq25AmdJJsFCWxkaZ179I8Tn5sw',
  },
];

/* ── CATEGORIES ── */
const CATS = [
  { keyAr: 'الكل', keyFr: 'Tout', value: 'all' },
  { keyAr: 'برمجة', keyFr: 'Développement', value: 'برمجة' },
  { keyAr: 'تصميم', keyFr: 'Design', value: 'تصميم' },
  { keyAr: 'لغات', keyFr: 'Langues', value: 'لغات' },
  { keyAr: 'تسويق', keyFr: 'Marketing', value: 'تسويق' },
  { keyAr: 'أعمال', keyFr: 'Business', value: 'أعمال' },
];

let activeFilter = 'all';
let searchQuery = '';

/* ══ INIT ══ */
document.addEventListener('DOMContentLoaded', () => {
  SS.init('courses');
  SS.onLangChange = (lang) => {
    applyLangTranslations(lang);
    buildFilters();
    renderCourses();
    updatePlaceholder(lang);
  };

  applyLangTranslations(SS.state.lang);
  buildFilters();
  renderCourses();
  updatePlaceholder(SS.state.lang);

  // Search
  const searchInput = document.getElementById('search-input');
  searchInput?.addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase();
    renderCourses();
  });

  // Load more (disabled — all cards shown)
  document.getElementById('load-more-btn')?.addEventListener('click', function() {
    this.disabled = true;
    this.querySelector('[data-ar]').textContent = SS.state.lang === 'ar' ? '✅ جميع الدورات محملة' : '✅ Tous les cours sont chargés';
    this.classList.add('opacity-50');
  });
});

function updatePlaceholder(lang) {
  const inp = document.getElementById('search-input');
  if (!inp) return;
  inp.placeholder = lang === 'ar' ? inp.dataset.arPlaceholder || 'ابحث عن دورتك القادمة...' : inp.dataset.frPlaceholder || 'Recherchez votre prochaine formation...';
}

function applyLangTranslations(lang) {
  const isAr = lang === 'ar';
  document.querySelectorAll('[data-ar][data-fr]').forEach(el => {
    if (el.tagName !== 'INPUT') el.textContent = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-fr');
  });
}

function buildFilters() {
  const container = document.getElementById('filter-container');
  if (!container) return;
  const lang = SS.state.lang;
  container.innerHTML = CATS.map(c => `
    <button class="filter-pill${activeFilter === c.value ? ' active' : ''}" data-val="${c.value}">
      ${lang === 'ar' ? c.keyAr : c.keyFr}
    </button>
  `).join('');
  container.addEventListener('click', e => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;
    activeFilter = btn.dataset.val;
    container.querySelectorAll('.filter-pill').forEach(b => b.classList.toggle('active', b.dataset.val === activeFilter));
    renderCourses();
  });
}

function renderCourses() {
  const grid = document.getElementById('courses-grid');
  if (!grid) return;
  const lang = SS.state.lang;
  const isAr = lang === 'ar';

  const filtered = COURSES_DATA.filter(c => {
    const matchCat = activeFilter === 'all' || c.categoryAr === activeFilter;
    const title = isAr ? c.titleAr : c.titleFr;
    const matchSearch = !searchQuery || title.toLowerCase().includes(searchQuery) || c.instructorName.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });

  grid.innerHTML = '';
  if (!filtered.length) {
    grid.innerHTML = `<div class="col-span-3 text-center py-20 text-on-surface-variant text-lg">${isAr ? 'لا توجد دورات تطابق بحثك 😕' : 'Aucun cours ne correspond à votre recherche 😕'}</div>`;
    return;
  }

  filtered.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'glass-panel course-card rounded-xl overflow-hidden border border-outline-variant/10 group flex flex-col card-appear';
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <div class="h-48 relative overflow-hidden flex items-center justify-center" style="background:${c.headerBg}">
        <span class="text-6xl emoji-wrap">${c.emoji}</span>
        <div class="absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-primary">${isAr ? c.levelAr : c.levelFr}</div>
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <h3 class="text-xl font-bold font-headline mb-4">${isAr ? c.titleAr : c.titleFr}</h3>
        <div class="flex items-center gap-4 text-on-surface-variant text-sm mb-6">
          <div class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span>${c.hours}</div>
          <div class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">group</span>${c.students}</div>
        </div>
        <div class="flex items-center justify-between mt-auto">
          <div class="flex items-center gap-2">
            <img class="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30" src="${c.img}" alt="${c.instructorName}" onerror="this.style.display='none'"/>
            <span class="text-sm font-semibold">${c.instructorName}</span>
          </div>
          <div class="flex items-center text-secondary">
            <span class="material-symbols-outlined text-sm" style="font-variation-settings:'FILL' 1">star</span>
            <span class="text-sm font-bold mr-1">${c.rating}</span>
          </div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openCourseDetail(c));
    grid.appendChild(card);
  });
}

function openCourseDetail(c) {
  const lang = SS.state.lang;
  const isAr = lang === 'ar';
  SS.openCourseModal({
    title: isAr ? c.titleAr : c.titleFr,
    category: isAr ? c.categoryAr : c.categoryFr,
    emoji: c.emoji,
    headerBg: c.headerBg,
    level: isAr ? c.levelAr : c.levelFr,
    hours: c.hours,
    students: c.students,
    rating: c.rating,
    instructorName: c.instructorName,
    instructorInitial: c.instructorInitial,
    instructorTitle: c.instructorTitle,
    instructorBio: c.instructorBio,
    description: isAr ? c.descriptionAr : c.descriptionFr,
    curriculum: isAr ? c.curriculumAr : c.curriculumFr,
    sessions: c.sessions,
  });
}
