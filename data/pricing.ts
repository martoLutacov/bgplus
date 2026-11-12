/**
 * Цени и пакети на ТВ БГ+.
 *
 * Всички цени са в евро, без ДДС. Това е единственото място, където се
 * променят цените на страницата — секциите „Пакети“, „Спонсорство“,
 * „Услуги“ и падащото меню във формата за запитване четат от тук.
 */

export const currency = "€";
export const vatNote = "Всички цени са в евро, без ДДС.";

export type AdPackage = {
  id: string;
  name: string;
  price: number;
  airings: number;
  period: string;
  description: string;
  featured?: boolean;
};

/** Рекламни пакети за 30-секунден рекламен клип */
export const adPackages: AdPackage[] = [
  {
    id: "prisastvie",
    name: "Присъствие",
    price: 900,
    airings: 60,
    period: "мес.",
    description:
      "Подходящ за първа телевизионна кампания, представяне на нов продукт или поддържане на присъствие в ефира.",
  },
  {
    id: "razpoznavaemost",
    name: "Разпознаваемост",
    price: 1500,
    airings: 150,
    period: "мес.",
    description:
      "За компании, които искат по-интензивна кампания, по-често присъствие и последователно налагане на своята марка.",
    featured: true,
  },
  {
    id: "nacionalna-vidimost",
    name: "Национална видимост",
    price: 2200,
    airings: 240,
    period: "мес.",
    description:
      "За брандове, които търсят висока честота на рекламно присъствие и продължителна комуникация с национална аудитория.",
  },
];

export const adPackagesFootnote =
  "Цените са за 30-секунден рекламен клип. Часовите пояси и условията за излъчване се уточняват в индивидуалната оферта.";

export type SponsorshipTier = {
  months: number;
  label: string;
  total: number;
  /** Отстъпка спрямо месечната цена, за показване като етикет */
  badge?: string;
};

export type Sponsorship = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  schedule: { label: string; value: string }[];
  audience?: string;
  includes: string[];
  tiers: SponsorshipTier[];
  brochure?: string;
};

export const sponsorships: Sponsorship[] = [
  {
    id: "mentorite",
    name: "Менторите",
    tagline: "Историите на успеха вдъхновяват. Нека Вашият бранд бъде част от тях.",
    description:
      "Предаване за развитие, предприемачество, лидерство и личностно израстване. Срещи с успели личности, които споделят решенията, уроците и смелостта зад постиженията си.",
    schedule: [
      { label: "Излъчване", value: "Всеки петък, 20:00 ч." },
      { label: "Автор и водещ", value: "Николая Димитрова" },
    ],
    audience:
      "Подходящо за партньори от образованието, финансите, технологиите, бизнес услугите и корпоративната социална отговорност.",
    includes: [
      "Спонсорска заставка в началото и края на предаването",
      "Лого във финала на всеки епизод",
      "Присъствие в епизодите в YouTube канала на БГ+",
      "Поп-ъп банери и продуктово позициониране",
    ],
    tiers: [
      { months: 1, label: "1 месец", total: 2000 },
      { months: 3, label: "3 месеца", total: 6000 },
      { months: 6, label: "6 месеца", total: 10800, badge: "−10%" },
      { months: 12, label: "12 месеца", total: 19200, badge: "−20%" },
    ],
    brochure: "/downloads/bgplus-mentorite-sponsorstvo.pdf",
  },
  {
    id: "tochno-v-10",
    name: "Точно в 10",
    tagline: "Едно партньорство. Повече поводи да Ви видят.",
    description:
      "Сутрешният блок на живо на БГ+. Дългосрочно партньорство с последователно присъствие в ефира и избрани формати, които продължават живота си в дигиталните канали на телевизията.",
    schedule: [
      { label: "На живо", value: "Пон – пет, 10:00 – 11:30 ч." },
      { label: "Повторение", value: "18:00 ч." },
      { label: "Водещи", value: "Стефан Николов и Даниела Георгиева" },
    ],
    includes: [
      "Спонсорска заставка и лого в ефира",
      "Банери и продуктово позициониране в епизодите",
      "Reels и Shorts за дигиталните канали",
      "Допълнителни интеграции при дългосрочни партньорства",
    ],
    tiers: [
      { months: 3, label: "3 месеца", total: 7500 },
      { months: 6, label: "6 месеца", total: 13500, badge: "−10%" },
      { months: 12, label: "12 месеца", total: 24000, badge: "−20%" },
    ],
    brochure: "/downloads/bgplus-tochno-v-10-sponsorstvo.pdf",
  },
];

export type Service = {
  id: string;
  name: string;
  pricing: string;
  description: string;
};

/** Общи рекламни услуги (индивидуални решения) */
export const services: Service[] = [
  {
    id: "zastavki",
    name: "Спонсорски заставки",
    pricing: "По индивидуална оферта",
    description:
      "„Предаването се излъчва със съдействието на…“ — името на Вашия бранд в началото и края на избрано предаване.",
  },
  {
    id: "baneri",
    name: "Графични банери и рекламни бъгове",
    pricing: "Според брой и позициониране",
    description:
      "Хоризонтални или вертикални банери в предаване по избор, без прекъсване на съдържанието.",
  },
  {
    id: "intervyuta",
    name: "Платени интервюта",
    pricing: "Според предаването и продължителността",
    description:
      "Гостуване в студиото, включително в сутрешния блок на живо, за да представите експертизата и историята на Вашия бизнес.",
  },
  {
    id: "reportazhi",
    name: "Корпоративни и продуктови репортажи",
    pricing: "По индивидуална оферта",
    description:
      "Филми „Как се прави“, корпоративни и тематични филми със сценарий, режисура, заснемане и монтаж.",
  },
  {
    id: "pozicionirane",
    name: "Продуктово позициониране",
    pricing: "Според формата и периода",
    description: "Вашият продукт на ключово място в кадъра на избрано предаване.",
  },
  {
    id: "produkciya",
    name: "Изработка на рекламни видеоклипове",
    pricing: "По техническо задание",
    description:
      "От 30-секунден клип до тематичен рекламен блок, представящ цялата Ви продуктова гама.",
  },
  {
    id: "digital",
    name: "Дигитална реклама и видеоинтеграции",
    pricing: "По индивидуална оферта",
    description: "Договорени публикации, видеоформати и присъствие в социалните канали на БГ+.",
  },
  {
    id: "godishni",
    name: "Годишни корпоративни партньорства",
    pricing: "Персонализирани условия",
    description:
      "Целогодишно медийно присъствие, комбиниращо ефир, спонсорство и дигитални формати.",
  },
];

/** Падащо меню „Бюджет“ във формата за запитване */
export const budgetRanges = [
  "До 1 000 € / месец",
  "1 000 – 2 500 € / месец",
  "2 500 – 5 000 € / месец",
  "Над 5 000 € / месец",
  "Все още не съм решил",
];

/** 1500 → "1 500" (неразделяем интервал, групиране и при 4 цифри) */
export function groupDigits(value: number) {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

export function formatPrice(value: number) {
  return `${groupDigits(value)}\u00a0${currency}`;
}

/** Опции за падащото меню „Услуга / пакет“ във формата */
export function inquiryOptions() {
  return [
    ...adPackages.map((p) => ({ value: `package:${p.id}`, label: `Пакет „${p.name}“` })),
    ...sponsorships.map((s) => ({ value: `sponsor:${s.id}`, label: `Спонсорство на „${s.name}“` })),
    { value: "service:custom", label: "Индивидуално решение / друга услуга" },
  ];
}
