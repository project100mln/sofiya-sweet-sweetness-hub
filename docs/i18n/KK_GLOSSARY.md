# SOFIYA Kazakh glossary

Status: draft for independent Kazakh editorial review.

| Russian source              | Kazakh draft                  | Usage note                           |
| --------------------------- | ----------------------------- | ------------------------------------ |
| фирменные магазины          | фирмалық дүкендер             | Brand-owned retail network           |
| торты                       | торттар                       | Catalogue category `cakes`           |
| порционные десерты          | порциялық десерттер           | Catalogue category `desserts`        |
| выпечка                     | пісірмелер                    | Catalogue category `pastry`          |
| самса и сытная выпечка      | самса және тойымды пісірмелер | Catalogue category `samsa`           |
| пироги                      | бәліштер                      | Catalogue category `pies`            |
| завтраки                    | таңғы ас                      | Catalogue category `breakfast`       |
| пицца                       | пицца                         | Catalogue category `pizza`           |
| салаты                      | салаттар                      | Catalogue category `salads`          |
| снеки                       | тіскебасарлар                 | Catalogue category `snacks`          |
| торты на заказ              | тапсырыспен торттар           | Navigation and product service       |
| оформить предзаказ          | алдын ала тапсырыс беру       | CTA; not a completed purchase        |
| точка самовывоза            | алып кету дүкені              | Store selected by stable store ID    |
| кейтеринг                   | кейтеринг                     | Keep established business term       |
| кофе-брейк                  | кофе-брейк                    | Keep established event term          |
| десертный стол              | десерт үстелі                 | Catering service                     |
| упаковка                    | қаптама                       | Cake-order form                      |
| подарочная упаковка         | сыйлық қаптамасы              | Cake-order option                    |
| акции                       | акциялар                      | Navigation and offers                |
| скидка                      | жеңілдік                      | Promotions                           |
| вакансии                    | бос жұмыс орындары            | Career page                          |
| маршрут                     | бағыт                         | Store map action                     |
| показать на карте           | картадан көрсету              | Store action                         |
| программа лояльности        | адалдық бағдарламасы          | SOFIYA Club                          |
| цена уточняется             | бағасы нақтылануда            | Catalogue price state                |
| сообщение подготовлено      | хабарлама дайын               | WhatsApp hand-off; never means sent  |
| перейти в WhatsApp          | WhatsApp-қа өту               | External hand-off CTA                |
| открыть WhatsApp            | WhatsApp-ты ашу               | Retry link after payload preparation |
| далее                       | келесі                        | Form step CTA                        |
| назад                       | артқа                         | Form step CTA                        |
| выберите                    | таңдаңыз                      | Select placeholder                   |
| свой вариант                | өз нұсқам                     | Custom cake type                     |
| уточнить                    | нақтылау                      | Size/conditions clarification        |
| стандартная коробка         | стандартты қорап              | Cake packaging option                |
| без упаковки                | қаптамасыз                    | Cake packaging option                |
| сбросить фильтры            | сүзгілерді тазарту            | Catalogue empty-state action         |
| показать результаты         | нәтижелерді көрсету           | Mobile catalogue-filter action       |
| проверьте номер телефона    | телефон нөмірін тексеріңіз    | Localized validation error           |
| политика конфиденциальности | құпиялық саясаты              | Legal page; requires legal sign-off  |
| пользовательское соглашение | пайдаланушы келісімі          | Legal page; requires legal sign-off  |

## Brand and proper names

- Keep `SOFIYA`, `SOFIYA Club`, `WhatsApp`, `Instagram` and `2GIS` unchanged.
- Product slugs, IDs, prices, images, contacts, coordinates and map URLs are language-neutral and must not change.
- Product display names in `src/i18n/catalog.ts` are editorial drafts. The independent editor must explicitly approve brand-name word order and borrowed culinary terms such as «Сметанник», «трайфл», «пирожный» and «крем-чиз».
- Kazakh address variants in `src/i18n/content.ts` must be checked against the approved/official 2GIS spelling without changing coordinates or links.

## Required glyph set

`Ә ә Ғ ғ Қ қ Ң ң Ө ө Ұ ұ Ү ү Һ һ І і`
