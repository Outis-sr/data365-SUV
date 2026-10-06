export const BRAND_LOGOS = [
  { src: "logos/brands/45-degrees.svg", name: "45 Degrees" },
  { src: "logos/brands/codecraft.svg", name: "Codecraft" },
  { src: "logos/brands/convergence.svg", name: "Convergence" },
  { src: "logos/brands/launchsimple.svg", name: "LaunchSimple" },
  { src: "logos/brands/mastermail.svg", name: "Mastermail" },
];

export const FEATURES = [
  {
    title: "Real vaqt tahlili",
    text: "Buyurtma, tushum va yetkazib berishni jonli panelda kuzating.",
    art: "features/live-analytics.svg",
  },
  {
    title: "Avtomatik hisobotlar",
    text: "Kunlik va oylik hisobotlar qo‘lda ishlamasdan tayyor bo‘ladi.",
    art: "features/automated-reports.svg",
  },
  {
    title: "Aqlli rejalashtirish",
    text: "Ombor, buyurtmalar va yetkazib berishni samarali rejalashtiring.",
    art: "features/smart-budgeting.svg",
  },
  {
    title: "Xavfsiz sinxronlash",
    text: "Buyurtma, mijoz, ombor va to‘lov ma’lumotlari bir tizimda yangilanadi.",
    art: "features/secure-syncing.svg",
  },
  {
    title: "O‘sish ko‘rsatkichi",
    text: "Savdo va operatsion ko‘rsatkichlarni bir qarashda kuzating.",
    art: "features/growth-score.svg",
  },
];

/** Neutral category icons (no third-party brands): messenger, payments, maps, SMS, spreadsheets. */
export const INTEGRATION_ICONS = [
  "/art/logos/integrations/int-pay.svg",
  "/art/logos/integrations/int-sms.svg",
  "/art/logos/integrations/int-msg.svg",
  "/art/logos/integrations/int-map.svg",
  "/art/logos/integrations/int-sheet.svg",
];

export const STEPS = [
  {
    n: "01",
    title: "Tizimni sozlang",
    text: "Mijozlar, mahsulotlar, narxlar va xodimlarni kiriting.",
    art: "features/secure-syncing.svg",
  },
  {
    n: "02",
    title: "Buyurtmalarni boshqaring",
    text: "Buyurtmadan yetkazib berishgacha bo‘lgan jarayonni bir joydan kuzating.",
    art: "features/area-chart.svg",
  },
  {
    n: "03",
    title: "Natijani kuzating",
    text: "Tushum, mijozlar va operatsiyalar bo‘yicha real vaqtda natijalarni ko‘ring.",
    art: "features/automated-reports.svg",
  },
];

/** No tariffs are defined for data365 SUV yet, so prices are "on request" rather than invented. */
export const PLANS = [
  {
    name: "Boshlang‘ich",
    price: "So‘rov",
    per: "bo‘yicha",
    desc: "Kichik suv yetkazib berish bizneslari uchun.",
    cta: "Boshlash",
    ctaStyle: "black" as const,
    features: [
      "Buyurtmalarni qabul qilish",
      "Mijozlar bazasi",
      "Ombordagi qoldiqni kuzatish",
      "Kunlik hisobotlar",
      "Asosiy qo‘llab-quvvatlash",
    ],
    highlight: false,
  },
  {
    name: "Biznes",
    price: "So‘rov",
    per: "bo‘yicha",
    desc: "O‘sayotgan jamoalar va faol yetkazib berish bizneslari uchun.",
    cta: "Boshlash",
    ctaStyle: "primary" as const,
    features: [
      "Boshlang‘ich tarifdagi hamma narsa",
      "Yetkazib beruvchilarni kuzatish",
      "To‘lov va qarzdorlik nazorati",
      "Avtomatik hisobotlar",
      "Ustuvor qo‘llab-quvvatlash",
    ],
    highlight: true,
  },
  {
    name: "Pro",
    price: "So‘rov",
    per: "bo‘yicha",
    desc: "Katta hajmdagi operatsiyalar va bir nechta jamoalar uchun.",
    cta: "Bog‘lanish",
    ctaStyle: "black" as const,
    features: [
      "Biznes tarifidagi hamma narsa",
      "Bir nechta filial va jamoalar",
      "Kengaytirilgan tahlil",
      "Integratsiyalar",
      "Shaxsiy menejer",
    ],
    highlight: false,
  },
];

/** Placeholder reviews (roles only, no invented people or companies) until real ones exist. */
export const TESTIMONIALS = [
  {
    name: "Biznes egasi",
    role: "Suv yetkazib berish xizmati",
    title: "Buyurtmalar nazoratda.",
    body: "Har bir buyurtma qayerda ekanini bir panelda ko‘ramiz. Endi hech bir buyurtma yo‘qolib qolmaydi.",
    avatar: "/art/avatars/a5.svg",
    dark: false,
  },
  {
    name: "Logistika menejeri",
    role: "Suv yetkazib berish xizmati",
    title: "Yetkazib berish tartibga tushdi.",
    body: "Yetkazib beruvchilarning yo‘nalishi va holati aniq ko‘rinadi, kunlik reja tuzish ancha tezlashdi.",
    avatar: "/art/avatars/a6.svg",
    dark: true,
  },
  {
    name: "Bosh hisobchi",
    role: "Suv yetkazib berish xizmati",
    title: "Qarzdorlik aniq ko‘rinadi.",
    body: "Kim qancha to‘lagani va kim qarzdor ekani bir joyda. Oy oxiridagi hisob-kitob osonlashdi.",
    avatar: "/art/avatars/a7.svg",
    dark: false,
  },
  {
    name: "Operatorlar rahbari",
    role: "Suv yetkazib berish xizmati",
    title: "Operatorlar ishi ko‘rinib turadi.",
    body: "Qaysi operator nechta buyurtma qabul qilgani ko‘rinadi, jamoani boshqarish ancha osonlashdi.",
    avatar: "/art/avatars/a8.svg",
    dark: true,
  },
];

/** Product facts only (no usage statistics, which do not exist yet). */
export const METRICS = [
  { from: 0, value: 1, decimals: 0, suffix: "", label: "Barcha jarayonlar uchun bitta tizim" },
  { from: 0, value: 6, decimals: 0, suffix: "", label: "Asosiy modul: buyurtma, mijoz, ombor va boshqalar" },
  { from: 0, value: 3, decimals: 0, suffix: "", label: "Qadamda ishga tushirish" },
];

export const FAQS = [
  {
    q: "DATA365 SUV kimlar uchun?",
    a: "Ichimlik suvi ishlab chiqaradigan va yetkazib beradigan bizneslar uchun: kichik xizmatlardan tortib bir nechta filialga ega kompaniyalargacha.",
  },
  {
    q: "Tizimda buyurtmalarni qanday boshqaraman?",
    a: "Operator buyurtmani qabul qiladi, tizim uni yetkazib beruvchiga biriktiradi, siz esa har bir buyurtmaning holatini bitta panelda kuzatasiz.",
  },
  {
    q: "Yetkazib beruvchilarni kuzatish mumkinmi?",
    a: "Ha. Har bir yetkazib beruvchiga qaysi buyurtmalar biriktirilgani va ularning holati real vaqtda ko‘rinadi.",
  },
  {
    q: "Ombordagi suv qoldig‘ini ko‘rish mumkinmi?",
    a: "Ha. Kirim va chiqim avtomatik hisoblanadi, ombordagi mahsulot va idishlar qoldig‘ini istalgan paytda ko‘rasiz.",
  },
  {
    q: "To‘lov va qarzdorliklarni nazorat qilish mumkinmi?",
    a: "Ha. Har bir mijozning to‘lovlari va qarzdorligi alohida yuritiladi, umumiy holat hisobotlarda ko‘rinadi.",
  },
  {
    q: "Tizimni ishga tushirish qancha vaqt oladi?",
    a: "Mijozlar, mahsulotlar, narxlar va xodimlarni kiritganingizdan so‘ng tizimdan darhol foydalanishni boshlashingiz mumkin.",
  },
];

export const POSTS = [
  {
    title: "Suv yetkazib berish biznesida buyurtmalarni tartibga solish",
    text: "Buyurtmalarni qabul qilishdan yetkazib berishgacha bo‘lgan jarayonni qanday tartibga solish mumkin.",
    img: "/art/blog/dashboard.svg",
    href: "#blog",
  },
  {
    title: "Yetkazib berishni samarali boshqarishning 5 usuli",
    text: "Yo‘nalishlar, yetkazib beruvchilar va vaqtni to‘g‘ri rejalashtirish bo‘yicha amaliy maslahatlar.",
    img: "/art/blog/metrics.svg",
    href: "#blog",
  },
  {
    title: "Qarzdorlik va to‘lovlarni nazorat qilish",
    text: "Mijozlar to‘lovlari va qarzdorligini kuzatib borish biznesga qanday foyda beradi.",
    img: "/art/blog/sync.svg",
    href: "#blog",
  },
];

export const FOOTER_COLS = [
  {
    title: "Sahifalar",
    links: [
      { label: "Imkoniyatlar", href: "#features" },
      { label: "Qanday ishlaydi", href: "#how-it-works" },
      { label: "Narxlar", href: "#pricing" },
      { label: "Bog‘lanish", href: "#contact" },
    ],
  },
  {
    title: "Ma’lumot",
    links: [
      { label: "Savollar", href: "#faq" },
      { label: "Blog", href: "#blog" },
    ],
  },
];
