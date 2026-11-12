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

/**
 * Калкулатор за 30-секунден клип: цена за едно излъчване и
 * готови примерни варианти. Месецът се смята като 4 седмици.
 */
export const calculator = {
  primetimeRate: 19,
  offPrimeRate: 11,
  weeksPerMonth: 4,
  maxPerWeek: 70,
  presets: [
    {
      id: "prime",
      label: "Приоритет в праймтайм",
      description: "Клипът се излъчва предимно в най-гледаното време, преди и/или след предаванията.",
      primetime: 23,
      offPrime: 12,
    },
    {
      id: "offprime",
      label: "Приоритет извън праймтайм",
      description: "По-голям обхват на излъчвания на по-ниска цена, извън най-гледаното време.",
      primetime: 12,
      offPrime: 21,
    },
  ],
  primetimeInfo: [
    "Делнични дни: според предаванията на живо в ефира",
    "Събота и неделя: от 10:00 до 23:00 ч.",
  ],
  notes: [
    "Цената е за 30-секунден клип, без ДДС. Рекламните блокове са в началото и/или в края на предаванията.",
    "Нощно излъчване — по индивидуално договаряне.",
    "При комбинация с пакет предаване и годишен договор с предплащане — до 30% отстъпка.",
  ],
};

export type PriceRow = {
  name: string;
  detail?: string;
  /** Число = точна цена; [от, до] = диапазон; текст = условие */
  price: number | [number, number] | string;
  unit?: string;
};

export type PriceGroup = {
  id: string;
  title: string;
  note?: string;
  rows: PriceRow[];
};

/**
 * Пълен ценоразпис, показан директно на страницата (секция „Ценоразпис“).
 * Пакетите за 30-секунден клип и спонсорствата се взимат от данните по-горе,
 * за да няма две места с едни и същи цени.
 */
export const priceList: PriceGroup[] = [
  {
    id: "klipove",
    title: "Рекламен клип 30 сек.",
    note: "Излъчвания в рамките на един месец",
    rows: adPackages.map((p) => ({
      name: `${p.airings} излъчвания`,
      detail: `Пакет „${p.name}“`,
      price: p.price,
      unit: "/ мес.",
    })),
  },
  {
    id: "baneri",
    title: "Рекламен бъг / банер в предаване",
    note: "Хоризонтален или вертикален банер, 7 сек., без прекъсване на съдържанието",
    rows: [
      { name: "30 броя", price: 450, unit: "/ мес." },
      { name: "60 броя", price: 840, unit: "/ мес." },
      { name: "90 броя", price: 950, unit: "/ мес." },
      { name: "120 броя", price: 1200, unit: "/ мес." },
    ],
  },
  {
    id: "sponsorstvo",
    title: "Спонсорство",
    rows: [
      {
        name: "Спонсорска заставка на предаване",
        detail: "„Предаването се излъчва със съдействието на…“",
        price: 1200,
        unit: "/ мес.",
      },
      ...sponsorships.map((sp) => {
        const best = Math.min(...sp.tiers.map((t) => Math.round(t.total / t.months)));
        return {
          name: `Спонсорство на „${sp.name}“`,
          detail: `Пакети за ${sp.tiers.map((t) => t.months).join(", ")} месеца`,
          price: `от ${groupDigits(best)}\u00a0${currency}`,
          unit: "/ мес.",
        };
      }),
    ],
  },
  {
    id: "uchastiya",
    title: "Участия и позициониране",
    rows: [
      { name: "Гостуване в сутрешния блок на живо", detail: "„Точно в 10“", price: 950 },
      { name: "Продуктово позициониране в предаване", detail: "Продуктът на ключово място в кадъра", price: [800, 1050], unit: "/ мес." },
    ],
  },
  {
    id: "produkciya",
    title: "Рекламна продукция",
    rows: [
      { name: "Рекламен видеоклип 30 сек.", detail: "Създаване на клипа", price: 1500 },
      { name: "Тематичен рекламен блок 60–90 сек.", detail: "Представяне на продуктова гама + 30 излъчвания", price: 1800 },
      {
        name: "Танцова реклама с НФА „Българе“",
        detail: "Сценарий, режисура, музика, хореография, заснемане и монтаж",
        price: 2050,
      },
    ],
  },
  {
    id: "filmi",
    title: "Тематични филми",
    note: "Сценарий, режисура, заснемане и монтаж",
    rows: [
      { name: "„Как се прави“", detail: "Филм за производствения процес", price: 5000 },
      { name: "Корпоративен филм", detail: "Развитието на бизнеса от самото начало", price: 7000 },
      { name: "Родов филм", detail: "Произходът и историята на един род", price: 5000 },
    ],
  },
];

export const priceListFootnote =
  "Всички цени са в евро, без ДДС. Нощно излъчване, комбинирани кампании и годишни партньорства — по индивидуално договаряне.";

export function formatRowPrice(price: PriceRow["price"]) {
  if (typeof price === "number") return formatPrice(price);
  if (Array.isArray(price)) return `${groupDigits(price[0])} – ${formatPrice(price[1])}`;
  return price;
}

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
