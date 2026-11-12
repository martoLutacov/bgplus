# ТВ БГ+ — рекламна лендинг страница

Next.js (App Router) + Tailwind CSS v4 + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Къде какво се променя

| Какво | Файл |
| --- | --- |
| **Цени, пакети, спонсорства, услуги, бюджети** | `data/pricing.ts` |
| Текстове, контакти, статистики, ЧЗВ, стъпки | `data/site.ts` |
| Снимки и видео (hero рийл, презентация, формати) | `data/site.ts` → `media`, `formats[].image`; файлове в `public/media/` |
| PDF тарифа и спонсорски брошури | `public/downloads/` |
| Партньорски лога (ticker) | `data/site.ts` → `partners` (празно = скрито) |
| SEO / OpenGraph | `app/layout.tsx`; JSON-LD (`Organization`, `FAQPage`) в `app/page.tsx` |

## Форма за запитване

`POST /api/inquiry` валидира данните и ги препраща към `INQUIRY_WEBHOOK_URL` (вижте `.env.example`).
Ако променливата не е зададена, формата отваря имейл приложението на посетителя с попълнено писмо до рекламния отдел.

## Анимации

Всички анимации са във Framer Motion с Apple-подобна крива `cubic-bezier(0.22, 1, 0.36, 1)`:
hero с паралакс и разфокусирано появяване на думите, броячи, bento grid с „прожектор“ под курсора,
хоризонтална галерия на форматите при скрол, изречение, което „светва“ дума по дума, мащабиране на видеото,
изчертаваща се линия в стъпките и плавни акордеони.

При `prefers-reduced-motion: reduce` скрол ефектите се изключват, галерията става обикновен хоризонтален списък,
а `MotionConfig reducedMotion="user"` оставя само смяна на прозрачност.
