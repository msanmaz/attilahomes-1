# i18n Completion — All Public Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the existing custom i18n system so every public-facing string on the listings page, property detail page, about page, and contact page is translated into Turkish, English, and Russian.

**Architecture:** The app uses a custom dictionary system — server components load `getDictionary(locale)` and pass `dict` props; client components call `useDictionary()` from React context. Task 1 adds all new keys to the three JSON files and the TypeScript `Dictionary` type; Tasks 2–8 wire each component/page to those keys. No new dependencies required.

**Tech Stack:** Next.js 15 App Router, TypeScript strict mode, custom `getDictionary()` + `DictionaryProvider` + `useDictionary()`.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/messages/en.json` | Add 8 new top-level key groups |
| Modify | `src/messages/tr.json` | Same 8 groups in Turkish |
| Modify | `src/messages/ru.json` | Same 8 groups in Russian |
| Modify | `src/lib/i18n.ts` | Extend `Dictionary` type to match |
| Modify | `src/components/property/property-filters.tsx` | Use `useDictionary()` for all filter strings |
| Modify | `src/app/[locale]/(public)/properties/page.tsx` | Translate page header (eyebrow, title, subtitle) |
| Modify | `src/app/[locale]/(public)/properties/[slug]/page.tsx` | Load dict, translate labels/headings |
| Modify | `src/components/property/property-sidebar.tsx` | Use `useDictionary()` for sidebar + contact sheet |
| Modify | `src/components/contact-form.tsx` | Use `useDictionary()` for form strings |
| Modify | `src/app/[locale]/(public)/about/page.tsx` | Load dict, translate entire page |
| Modify | `src/app/[locale]/(public)/contact/page.tsx` | Load dict, translate page labels |

---

## Task 1: Extend Dictionary — JSON files + TypeScript type

**Files:**
- Modify: `src/messages/en.json`
- Modify: `src/messages/tr.json`
- Modify: `src/messages/ru.json`
- Modify: `src/lib/i18n.ts`

- [ ] **Step 1: Replace `src/messages/en.json` with the extended version**

```json
{
  "nav": {
    "home": "Home",
    "forSale": "For Sale",
    "forRent": "For Rent",
    "about": "About",
    "contact": "Contact",
    "callUs": "Call Us"
  },
  "hero": {
    "location": "Istanbul & Bodrum Real Estate",
    "headline1": "Curated Properties,",
    "headlineAccent": "Exclusive",
    "headline2": "Lifestyles",
    "subtext": "A hand-curated real estate selection spanning Istanbul's finest districts to the shores of Bodrum.",
    "cta": "Explore Properties",
    "scroll": "Scroll"
  },
  "featured": {
    "eyebrow": "Curated",
    "title": "Portfolio",
    "viewAll": "View All",
    "empty": "No featured properties yet. Add them from the dashboard."
  },
  "about": {
    "eyebrow": "About",
    "name": "Attila Utkucan",
    "bio1": "An independent real estate advisor rooted in Istanbul, known for his deep mastery of both the Istanbul and Bodrum markets. Attila has built his reputation on the ability to sense potential — spotting value where others see disrepair, and character where others see age. Clients trust him for his honest guidance, local knowledge, and a sharp eye for what a property could become.",
    "bio2": "Beyond consultancy, Attila is a hands-on developer specialised in transforming Istanbul's ageing apartment buildings into contemporary living spaces. From discovering neglected buildings in historic neighbourhoods to personally overseeing every detail of the renovation, he bridges vision and reality — delivering homes that honour their heritage while meeting modern standards.",
    "more": "Learn More"
  },
  "neighborhoods": {
    "eyebrow": "Explore",
    "title": "Cities",
    "istanbulSubtitle": "Unique Living on Both Shores of the Bosphorus",
    "bodrumSubtitle": "Luxury Living on the Aegean Coast"
  },
  "footer": {
    "description": "Carefully selected real estate across Istanbul and the Bodrum peninsula. Every property is personally evaluated by Attila Utkucan and his team.",
    "properties": "Properties",
    "forSale": "For Sale",
    "forRent": "For Rent",
    "company": "Company",
    "about": "About",
    "contact": "Contact",
    "blog": "Blog",
    "contactSection": "Contact",
    "rights": "All rights reserved.",
    "crafted": "Meticulously crafted"
  },
  "property": {
    "sale": "For Sale",
    "rent": "For Rent",
    "beds": "Bed",
    "baths": "Bath",
    "sqm": "m²"
  },
  "propertiesPage": {
    "eyebrow": "Portfolio",
    "title": "All Properties",
    "subtitle": "Explore our carefully curated collection"
  },
  "filters": {
    "all": "All",
    "allNeighborhoods": "All Neighborhoods",
    "allBedrooms": "Bedrooms",
    "bed1": "1 Bedroom",
    "bed2": "2 Bedrooms",
    "bed3": "3 Bedrooms",
    "bed4": "4+ Bedrooms",
    "sortFeatured": "Featured",
    "sortPriceLow": "Price: Low to High",
    "sortPriceHigh": "Price: High to Low",
    "sortSize": "Largest First",
    "sortBeds": "Most Bedrooms",
    "clearAll": "Clear All"
  },
  "propertyDetail": {
    "backToListings": "Back to Listings",
    "bedroomsLabel": "Bedrooms",
    "bathroomsLabel": "Bathrooms",
    "ownershipLabel": "Ownership",
    "deed": "Freehold",
    "rental": "Rental",
    "aboutSection": "About This Property",
    "locationSection": "Location",
    "nearbySection": "Nearby",
    "notFound": "Property Not Found"
  },
  "sidebar": {
    "scheduleViewing": "Schedule Viewing",
    "applyNow": "Apply Now",
    "requestInfo": "Request Info",
    "monthlyFurnished": "Monthly, furnished",
    "askingPrice": "Asking price"
  },
  "sheet": {
    "viewingTitle": "Schedule Viewing",
    "viewingSubtitle": "Leave your preferences and we'll get back to you as soon as possible.",
    "infoTitle": "Request Info",
    "infoSubtitle": "Ask your questions about this property and our team will provide personalised information.",
    "close": "Close",
    "fullName": "Full Name",
    "email": "Email",
    "phone": "Phone",
    "preferredDate": "Preferred Date",
    "timeSlot": "Time Slot",
    "selectTime": "Select",
    "morning": "Morning 09–12",
    "afternoon": "Afternoon 12–17",
    "evening": "Evening 17–20",
    "messageOptional": "Message (optional)",
    "viewingNotes": "Notes about the viewing…",
    "infoQuestion": "Questions about this property…",
    "sending": "Sending…",
    "submitViewing": "Submit Viewing Request",
    "submitInfo": "Submit Info Request",
    "submitted": "Request Received",
    "confirmBefore": "We will get back to you at",
    "confirmAfter": "within 24 hours.",
    "error": "An error occurred. Please try again.",
    "privacyNote": "Your information is used solely to contact you."
  },
  "contactForm": {
    "title": "Send a Message",
    "fullName": "Full Name",
    "email": "Email",
    "phone": "Phone",
    "message": "Your Message",
    "namePlaceholder": "Your name",
    "emailPlaceholder": "you@example.com",
    "phonePlaceholder": "+90",
    "messagePlaceholder": "Tell us what you're looking for…",
    "sending": "Sending…",
    "send": "Send Message",
    "disclaimer": "We will respond to your message within 24 hours.",
    "thankYou": "Thank You",
    "sentMessage": "Your message has been sent. Attila will get back to you shortly.",
    "anotherMessage": "Send Another Message",
    "error": "An error occurred. Please try again."
  },
  "aboutPage": {
    "eyebrow": "About Us",
    "tagline": "Istanbul's energy, Bodrum's exclusivity — under one roof.",
    "founderTitle": "Founder & Advisor",
    "bio1": "Attila Utkucan grew up in Istanbul and spent every summer in Bodrum. Having been immersed in the world of construction and real estate in both cities since childhood, he knows not just their geography but their soul. Attila Homes is a brand born from this personal story.",
    "bio2": "We offer boutique advisory services in luxury residential, apartment, villa, residence, land and commercial real estate in Istanbul and Bodrum. Every property in our portfolio is personally inspected — we only represent what we see value in.",
    "bio3": "We see real estate not as a commodity to sell, but as a lifestyle and strategic investment. That is why we offer not a standard sales process, but a personalised, results-driven experience. With our regional expertise and strong network, we can offer local and international investors opportunities that generate sustainable value.",
    "quote": "Find the right property with local specialist Attila Utkucan and his team.",
    "contactCta": "Get in Touch",
    "contactInfoTitle": "Contact Information",
    "istanbulOffice": "Istanbul Office",
    "bodrumOffice": "Bodrum Office",
    "reachUs": "Reach Us"
  },
  "contactPage": {
    "eyebrow": "Contact",
    "title": "Get in Touch",
    "subtitle": "Whether buying, selling or renting — or about a renovation project — Attila is available for personal consultation.",
    "istanbulOffice": "Istanbul Office",
    "bodrumOffice": "Bodrum Office",
    "emailLabel": "Email",
    "whatsappLabel": "WhatsApp"
  }
}
```

- [ ] **Step 2: Replace `src/messages/tr.json` with the extended version**

```json
{
  "nav": {
    "home": "Ana Sayfa",
    "forSale": "Satılık",
    "forRent": "Kiralık",
    "about": "Hakkımızda",
    "contact": "İletişim",
    "callUs": "Bize Ulaşın"
  },
  "hero": {
    "location": "İstanbul & Bodrum Emlak",
    "headline1": "Seçilmiş Mülkler,",
    "headlineAccent": "Ayrıcalıklı",
    "headline2": "Yaşamlar",
    "subtext": "İstanbul'un seçkin semtlerinden Bodrum kıyılarına uzanan, özenle küratörlenmiş bir gayrimenkul seçkisi.",
    "cta": "Mülkleri Keşfet",
    "scroll": "Kaydır"
  },
  "featured": {
    "eyebrow": "Seçilmiş",
    "title": "Portföy",
    "viewAll": "Tümünü Gör",
    "empty": "Henüz öne çıkan mülk yok. Panelden ekleyebilirsiniz."
  },
  "about": {
    "eyebrow": "Hakkında",
    "name": "Attila Utkucan",
    "bio1": "İstanbul'da kökleri olan, Bodrum ve İstanbul pazarlarına derin hakimiyetiyle tanınan bağımsız bir emlak danışmanı. Attila, itibarını potansiyeli sezme yeteneği üzerine inşa etmiştir — başkalarının eskimişlik gördüğü yerde değeri, yaşlanma gördüğü yerde karakteri keşfeder. Müşterileri ona dürüst rehberliği, yerel bilgisi ve bir mülkün ne olabileceğini gören keskin bakışı için güvenir.",
    "bio2": "Danışmanlığın ötesinde Attila, İstanbul'un eskiyen apartmanlarını çağdaş yaşam alanlarına dönüştürme konusunda uzmanlaşmış, sahada çalışan bir geliştiricidir. Tarihi semtlerdeki bakımsız binaları keşfetmekten renovasyonun her detayını bizzat yönetmeye kadar, vizyon ile gerçeklik arasındaki köprüyü kurar — mirasına sadık kalırken çağdaş standartları karşılayan evler sunar.",
    "more": "Daha Fazla"
  },
  "neighborhoods": {
    "eyebrow": "Keşfet",
    "title": "Şehirler",
    "istanbulSubtitle": "Boğaz'ın İki Yakasında Eşsiz Yaşam",
    "bodrumSubtitle": "Ege Kıyısında Lüks Yaşam"
  },
  "footer": {
    "description": "İstanbul ve Bodrum yarımadasında özenle seçilmiş emlak. Her mülk Attila Utkucan ve ekibi tarafından bizzat değerlendirilir.",
    "properties": "Emlaklar",
    "forSale": "Satılık",
    "forRent": "Kiralık",
    "company": "Şirket",
    "about": "Hakkımızda",
    "contact": "İletişim",
    "blog": "Blog",
    "contactSection": "İletişim",
    "rights": "Tüm hakları saklıdır.",
    "crafted": "Titizlikle tasarlandı"
  },
  "property": {
    "sale": "Satılık",
    "rent": "Kiralık",
    "beds": "Yatak",
    "baths": "Banyo",
    "sqm": "m²"
  },
  "propertiesPage": {
    "eyebrow": "Portföy",
    "title": "Tüm Mülkler",
    "subtitle": "Özenle seçilmiş konut koleksiyonumuzu keşfedin"
  },
  "filters": {
    "all": "Tümü",
    "allNeighborhoods": "Tüm Semtler",
    "allBedrooms": "Yatak Odası",
    "bed1": "1 Yatak Odası",
    "bed2": "2 Yatak Odası",
    "bed3": "3 Yatak Odası",
    "bed4": "4+ Yatak Odası",
    "sortFeatured": "Öne Çıkan",
    "sortPriceLow": "Fiyat: Düşükten Yükseğe",
    "sortPriceHigh": "Fiyat: Yüksekten Düşüğe",
    "sortSize": "En Büyük Önce",
    "sortBeds": "En Çok Yatak Odası",
    "clearAll": "Tümünü Temizle"
  },
  "propertyDetail": {
    "backToListings": "İlanlara Dön",
    "bedroomsLabel": "Yatak Odası",
    "bathroomsLabel": "Banyo",
    "ownershipLabel": "Mülkiyet",
    "deed": "Tapu",
    "rental": "Kira",
    "aboutSection": "Bu Mülk Hakkında",
    "locationSection": "Konum",
    "nearbySection": "Yakın Çevre",
    "notFound": "Mülk Bulunamadı"
  },
  "sidebar": {
    "scheduleViewing": "Görüntüleme Randevusu",
    "applyNow": "Hemen Başvur",
    "requestInfo": "Bilgi İste",
    "monthlyFurnished": "Aylık, mobilyalı",
    "askingPrice": "İstenen fiyat, pazarlık hariç"
  },
  "sheet": {
    "viewingTitle": "Görüntüleme Randevusu",
    "viewingSubtitle": "Mülkü yerinde görmek için tercihlerinizi bırakın, size en kısa sürede ulaşalım.",
    "infoTitle": "Bilgi İste",
    "infoSubtitle": "Bu mülk hakkında merak ettiklerinizi sorun, ekibimiz size özel bilgi sunsun.",
    "close": "Kapat",
    "fullName": "Ad Soyad",
    "email": "E-posta",
    "phone": "Telefon",
    "preferredDate": "Tercih Edilen Tarih",
    "timeSlot": "Saat Aralığı",
    "selectTime": "Seçin",
    "morning": "Sabah 09–12",
    "afternoon": "Öğleden sonra 12–17",
    "evening": "Akşam 17–20",
    "messageOptional": "Mesaj (isteğe bağlı)",
    "viewingNotes": "Randevuyla ilgili notlarınız…",
    "infoQuestion": "Bu mülk hakkında sormak istedikleriniz…",
    "sending": "Gönderiliyor…",
    "submitViewing": "Randevu Talebi Gönder",
    "submitInfo": "Bilgi Talebini Gönder",
    "submitted": "Talebiniz Alındı",
    "confirmBefore": "En geç 24 saat içinde",
    "confirmAfter": "adresinize dönüş yapacağız.",
    "error": "Bir hata oluştu. Lütfen tekrar deneyin.",
    "privacyNote": "Bilgileriniz yalnızca sizinle iletişim kurmak amacıyla kullanılır."
  },
  "contactForm": {
    "title": "Mesaj Gönderin",
    "fullName": "Ad Soyad",
    "email": "E-posta",
    "phone": "Telefon",
    "message": "Mesajınız",
    "namePlaceholder": "Adınız",
    "emailPlaceholder": "siz@ornek.com",
    "phonePlaceholder": "+90",
    "messagePlaceholder": "Ne aradığınızı bize anlatın…",
    "sending": "Gönderiliyor…",
    "send": "Mesaj Gönder",
    "disclaimer": "Mesajınızı en geç 24 saat içerisinde cevaplandıracağız.",
    "thankYou": "Teşekkürler",
    "sentMessage": "Mesajınız gönderildi. Attila en kısa sürede size dönecektir.",
    "anotherMessage": "Başka Mesaj Gönder",
    "error": "Bir hata oluştu. Lütfen tekrar deneyin."
  },
  "aboutPage": {
    "eyebrow": "Hakkımızda",
    "tagline": "İstanbul'un enerjisi, Bodrum'un ayrıcalığı — tek bir çatı altında.",
    "founderTitle": "Kurucu & Danışman",
    "bio1": "Attila Utkucan, İstanbul'da büyüdü; her yaz Bodrum'da geçirdi. Her iki şehirde de küçüklüğünden beri inşaat ve gayrimenkul dünyasının içinde olan biri olarak, bu iki kentin sadece coğrafyasını değil, ruhunu da tanıyor. Attila Homes, bu kişisel hikayeden doğan bir marka.",
    "bio2": "İstanbul ve Bodrum'da lüks konut, daire, villa, residence, arsa ve ticari gayrimenkul alanlarında butik danışmanlık sunuyoruz. Portföyümüzdeki her mülkü bizzat inceliyor; yalnızca değer gördüklerimizi temsil ediyoruz.",
    "bio3": "Gayrimenkulü bir satış kalemi olarak değil, yaşam tarzı ve stratejik yatırım olarak değerlendiriyoruz. Bu yüzden standart bir satış süreci değil, kişiselleştirilmiş ve sonuç odaklı bir deneyim sunuyoruz. Yerli ve yabancı yatırımcılara, bölge hakimiyetimiz ve güçlü networkümüz sayesinde sürdürülebilir değer üreten fırsatları sunabiliyoruz.",
    "quote": "İki şehrin lokali Attila Utkucan ve ekibi ile doğru mülkü bulun.",
    "contactCta": "İletişime Geçin",
    "contactInfoTitle": "İletişim Bilgileri",
    "istanbulOffice": "İstanbul Ofisi",
    "bodrumOffice": "Bodrum Ofisi",
    "reachUs": "Ulaşın"
  },
  "contactPage": {
    "eyebrow": "İletişim",
    "title": "İletişime Geçin",
    "subtitle": "Satın alma, satış veya kiralama konusunda — ya da bir renovasyon projesi hakkında — Attila kişisel danışmanlık için hazırdır.",
    "istanbulOffice": "İstanbul Ofisi",
    "bodrumOffice": "Bodrum Ofisi",
    "emailLabel": "E-posta",
    "whatsappLabel": "WhatsApp"
  }
}
```

- [ ] **Step 3: Replace `src/messages/ru.json` with the extended version**

```json
{
  "nav": {
    "home": "Главная",
    "forSale": "Продажа",
    "forRent": "Аренда",
    "about": "О нас",
    "contact": "Контакт",
    "callUs": "Позвоните нам"
  },
  "hero": {
    "location": "Недвижимость Стамбула и Бодрума",
    "headline1": "Избранная Недвижимость,",
    "headlineAccent": "Эксклюзивная",
    "headline2": "Жизнь",
    "subtext": "Тщательно подобранная коллекция недвижимости от престижных районов Стамбула до побережья Бодрума.",
    "cta": "Смотреть объекты",
    "scroll": "Листать"
  },
  "featured": {
    "eyebrow": "Избранное",
    "title": "Портфолио",
    "viewAll": "Смотреть все",
    "empty": "Пока нет избранных объектов. Добавьте их из панели управления."
  },
  "about": {
    "eyebrow": "О нас",
    "name": "Аттила Уткуджан",
    "bio1": "Независимый консультант по недвижимости с корнями в Стамбуле, известный глубоким знанием рынков Стамбула и Бодрума. Аттила построил свою репутацию на способности чувствовать потенциал — видеть ценность там, где другие видят запустение, и характер там, где другие видят старость. Клиенты доверяют ему за честные советы, знание местного рынка и острый взгляд на то, чем может стать недвижимость.",
    "bio2": "Помимо консалтинга, Аттила является практикующим девелопером, специализирующимся на преобразовании стареющих стамбульских домов в современные жилые пространства. От поиска заброшенных зданий в исторических районах до личного контроля каждой детали реновации — он строит мост между видением и реальностью, создавая дома, хранящие наследие прошлого и соответствующие современным стандартам.",
    "more": "Подробнее"
  },
  "neighborhoods": {
    "eyebrow": "Открыть",
    "title": "Города",
    "istanbulSubtitle": "Уникальная жизнь на обоих берегах Босфора",
    "bodrumSubtitle": "Роскошная жизнь на побережье Эгейского моря"
  },
  "footer": {
    "description": "Тщательно отобранная недвижимость в Стамбуле и на полуострове Бодрум. Каждый объект лично оценивается Аттилой Уткуджаном и его командой.",
    "properties": "Недвижимость",
    "forSale": "Продажа",
    "forRent": "Аренда",
    "company": "Компания",
    "about": "О нас",
    "contact": "Контакт",
    "blog": "Блог",
    "contactSection": "Контакт",
    "rights": "Все права защищены.",
    "crafted": "Создано с вниманием к деталям"
  },
  "property": {
    "sale": "Продажа",
    "rent": "Аренда",
    "beds": "Спальни",
    "baths": "Ванные",
    "sqm": "м²"
  },
  "propertiesPage": {
    "eyebrow": "Портфолио",
    "title": "Все объекты",
    "subtitle": "Изучите нашу тщательно подобранную коллекцию"
  },
  "filters": {
    "all": "Все",
    "allNeighborhoods": "Все районы",
    "allBedrooms": "Спальни",
    "bed1": "1 Спальня",
    "bed2": "2 Спальни",
    "bed3": "3 Спальни",
    "bed4": "4+ Спален",
    "sortFeatured": "Избранное",
    "sortPriceLow": "Цена: По возрастанию",
    "sortPriceHigh": "Цена: По убыванию",
    "sortSize": "Сначала больше",
    "sortBeds": "Больше спален",
    "clearAll": "Очистить всё"
  },
  "propertyDetail": {
    "backToListings": "К объявлениям",
    "bedroomsLabel": "Спальни",
    "bathroomsLabel": "Ванные",
    "ownershipLabel": "Право собственности",
    "deed": "Собственность",
    "rental": "Аренда",
    "aboutSection": "Об этом объекте",
    "locationSection": "Расположение",
    "nearbySection": "Рядом",
    "notFound": "Объект не найден"
  },
  "sidebar": {
    "scheduleViewing": "Записаться на просмотр",
    "applyNow": "Подать заявку",
    "requestInfo": "Запросить информацию",
    "monthlyFurnished": "В месяц, с мебелью",
    "askingPrice": "Запрашиваемая цена"
  },
  "sheet": {
    "viewingTitle": "Записаться на просмотр",
    "viewingSubtitle": "Оставьте ваши предпочтения, и мы свяжемся с вами в ближайшее время.",
    "infoTitle": "Запросить информацию",
    "infoSubtitle": "Задайте вопросы об этом объекте, и наша команда предоставит персональную информацию.",
    "close": "Закрыть",
    "fullName": "Имя и фамилия",
    "email": "Эл. почта",
    "phone": "Телефон",
    "preferredDate": "Предпочтительная дата",
    "timeSlot": "Временной слот",
    "selectTime": "Выбрать",
    "morning": "Утро 09–12",
    "afternoon": "День 12–17",
    "evening": "Вечер 17–20",
    "messageOptional": "Сообщение (необязательно)",
    "viewingNotes": "Заметки о просмотре…",
    "infoQuestion": "Вопросы об этом объекте…",
    "sending": "Отправка…",
    "submitViewing": "Отправить запрос на просмотр",
    "submitInfo": "Отправить информационный запрос",
    "submitted": "Заявка получена",
    "confirmBefore": "Мы свяжемся с вами по адресу",
    "confirmAfter": "в течение 24 часов.",
    "error": "Произошла ошибка. Пожалуйста, попробуйте снова.",
    "privacyNote": "Ваша информация используется исключительно для связи с вами."
  },
  "contactForm": {
    "title": "Отправить сообщение",
    "fullName": "Имя и фамилия",
    "email": "Эл. почта",
    "phone": "Телефон",
    "message": "Ваше сообщение",
    "namePlaceholder": "Ваше имя",
    "emailPlaceholder": "вы@пример.com",
    "phonePlaceholder": "+90",
    "messagePlaceholder": "Расскажите нам, что вы ищете…",
    "sending": "Отправка…",
    "send": "Отправить сообщение",
    "disclaimer": "Мы ответим на ваше сообщение в течение 24 часов.",
    "thankYou": "Спасибо",
    "sentMessage": "Ваше сообщение отправлено. Аттила свяжется с вами в ближайшее время.",
    "anotherMessage": "Отправить ещё одно сообщение",
    "error": "Произошла ошибка. Пожалуйста, попробуйте снова."
  },
  "aboutPage": {
    "eyebrow": "О нас",
    "tagline": "Энергия Стамбула, эксклюзивность Бодрума — под одной крышей.",
    "founderTitle": "Основатель и советник",
    "bio1": "Аттила Уткуджан вырос в Стамбуле, каждое лето проводя в Бодруме. Будучи с детства вовлечённым в мир строительства и недвижимости в обоих городах, он знает не только их географию, но и их душу. Attila Homes — бренд, рождённый из этой личной истории.",
    "bio2": "Мы предлагаем бутиковые консультационные услуги в области элитных квартир, вилл, резиденций, земельных участков и коммерческой недвижимости в Стамбуле и Бодруме. Каждый объект в нашем портфеле лично проверяется нами — мы представляем только то, в чём видим ценность.",
    "bio3": "Мы рассматриваем недвижимость не как товар для продажи, а как образ жизни и стратегическую инвестицию. Поэтому мы предлагаем не стандартный процесс продажи, а персонализированный и ориентированный на результат опыт. Благодаря нашему знанию региона и сильным связям мы можем предложить местным и иностранным инвесторам возможности, создающие устойчивую ценность.",
    "quote": "Найдите подходящую недвижимость с местным специалистом Аттилой Уткуджаном и его командой.",
    "contactCta": "Связаться с нами",
    "contactInfoTitle": "Контактная информация",
    "istanbulOffice": "Офис в Стамбуле",
    "bodrumOffice": "Офис в Бодруме",
    "reachUs": "Связаться"
  },
  "contactPage": {
    "eyebrow": "Контакт",
    "title": "Связаться с нами",
    "subtitle": "По вопросам покупки, продажи или аренды — а также о проектах реновации — Аттила готов к личной консультации.",
    "istanbulOffice": "Офис в Стамбуле",
    "bodrumOffice": "Офис в Бодруме",
    "emailLabel": "Эл. почта",
    "whatsappLabel": "WhatsApp"
  }
}
```

- [ ] **Step 4: Extend the `Dictionary` type in `src/lib/i18n.ts`**

Replace the entire file content:

```typescript
export const LOCALES = ['tr', 'en', 'ru'] as const;
export const DEFAULT_LOCALE: Locale = 'tr';
export type Locale = (typeof LOCALES)[number];

export function isValidLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await import(`@/messages/${locale}.json`)).default as Dictionary;
}

// Shape mirrors messages/*.json — update if keys change
export type Dictionary = {
  nav: {
    home: string;
    forSale: string;
    forRent: string;
    about: string;
    contact: string;
    callUs: string;
  };
  hero: {
    location: string;
    headline1: string;
    headlineAccent: string;
    headline2: string;
    subtext: string;
    cta: string;
    scroll: string;
  };
  featured: {
    eyebrow: string;
    title: string;
    viewAll: string;
    empty: string;
  };
  about: {
    eyebrow: string;
    name: string;
    bio1: string;
    bio2: string;
    more: string;
  };
  neighborhoods: {
    eyebrow: string;
    title: string;
    istanbulSubtitle: string;
    bodrumSubtitle: string;
  };
  footer: {
    description: string;
    properties: string;
    forSale: string;
    forRent: string;
    company: string;
    about: string;
    contact: string;
    blog: string;
    contactSection: string;
    rights: string;
    crafted: string;
  };
  property: {
    sale: string;
    rent: string;
    beds: string;
    baths: string;
    sqm: string;
  };
  propertiesPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  filters: {
    all: string;
    allNeighborhoods: string;
    allBedrooms: string;
    bed1: string;
    bed2: string;
    bed3: string;
    bed4: string;
    sortFeatured: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortSize: string;
    sortBeds: string;
    clearAll: string;
  };
  propertyDetail: {
    backToListings: string;
    bedroomsLabel: string;
    bathroomsLabel: string;
    ownershipLabel: string;
    deed: string;
    rental: string;
    aboutSection: string;
    locationSection: string;
    nearbySection: string;
    notFound: string;
  };
  sidebar: {
    scheduleViewing: string;
    applyNow: string;
    requestInfo: string;
    monthlyFurnished: string;
    askingPrice: string;
  };
  sheet: {
    viewingTitle: string;
    viewingSubtitle: string;
    infoTitle: string;
    infoSubtitle: string;
    close: string;
    fullName: string;
    email: string;
    phone: string;
    preferredDate: string;
    timeSlot: string;
    selectTime: string;
    morning: string;
    afternoon: string;
    evening: string;
    messageOptional: string;
    viewingNotes: string;
    infoQuestion: string;
    sending: string;
    submitViewing: string;
    submitInfo: string;
    submitted: string;
    confirmBefore: string;
    confirmAfter: string;
    error: string;
    privacyNote: string;
  };
  contactForm: {
    title: string;
    fullName: string;
    email: string;
    phone: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    sending: string;
    send: string;
    disclaimer: string;
    thankYou: string;
    sentMessage: string;
    anotherMessage: string;
    error: string;
  };
  aboutPage: {
    eyebrow: string;
    tagline: string;
    founderTitle: string;
    bio1: string;
    bio2: string;
    bio3: string;
    quote: string;
    contactCta: string;
    contactInfoTitle: string;
    istanbulOffice: string;
    bodrumOffice: string;
    reachUs: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    istanbulOffice: string;
    bodrumOffice: string;
    emailLabel: string;
    whatsappLabel: string;
  };
};
```

- [ ] **Step 5: Verify TypeScript compiles with no errors**

Run:
```bash
cd /Users/mertosanmaz/test-attila && npx tsc --noEmit
```

Expected: No errors. If you see "Property 'X' does not exist on type 'Dictionary'", a key is missing from one of the JSON files — check all three match the type exactly.

- [ ] **Step 6: Commit**

```bash
cd /Users/mertosanmaz/test-attila
git add src/messages/en.json src/messages/tr.json src/messages/ru.json src/lib/i18n.ts
git commit -m "feat: extend dictionary with 8 new key groups for full i18n coverage"
```

---

## Task 2: Translate PropertyFilters

**Files:**
- Modify: `src/components/property/property-filters.tsx`

This is a client component — it uses `useDictionary()` to get the dictionary from the root `DictionaryProvider`.

- [ ] **Step 1: Replace `src/components/property/property-filters.tsx`**

```typescript
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { NEIGHBORHOODS } from "@/lib/constants";
import { useDictionary } from "@/components/providers/dictionary-provider";
import type { City } from "@/lib/types";

export function PropertyFilters() {
  const dict = useDictionary();
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get("city") || "";
  const type = searchParams.get("type") || "";
  const neighborhood = searchParams.get("neighborhood") || "";
  const bedrooms = searchParams.get("bedrooms") || "";
  const sort = searchParams.get("sort") || "";

  const SORT_OPTIONS = [
    { value: "", label: dict.filters.sortFeatured },
    { value: "price-low", label: dict.filters.sortPriceLow },
    { value: "price-high", label: dict.filters.sortPriceHigh },
    { value: "size", label: dict.filters.sortSize },
    { value: "beds", label: dict.filters.sortBeds },
  ];

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      if (key === "city") params.delete("neighborhood");
      router.push(`/properties?${params.toString()}`);
    },
    [router, searchParams],
  );

  const clearAll = () => router.push("/properties");

  const neighborhoods = city
    ? NEIGHBORHOODS[city as City] || []
    : [...NEIGHBORHOODS.Istanbul, ...NEIGHBORHOODS.Bodrum];

  const hasFilters = city || type || neighborhood || bedrooms;

  return (
    <div className="py-4 md:py-5 px-4 md:px-8 bg-bg-secondary border-b border-border sticky top-[calc(3.5rem+env(safe-area-inset-top))] md:top-[60px] z-50">
      <div className="flex items-center gap-3 flex-wrap">
        {/* City */}
        <div className="flex bg-bg-elevated border border-border overflow-hidden">
          {["", "Istanbul", "Bodrum"].map((c) => (
            <button
              key={c || "all"}
              onClick={() => setFilter("city", c)}
              className={cn(
                "px-5 py-[0.7rem] text-[0.72rem] tracking-[0.1em] uppercase font-body transition-all duration-300 cursor-pointer border-none",
                city === c
                  ? "bg-accent text-bg-primary"
                  : "bg-transparent text-text-secondary hover:text-text-primary",
              )}
            >
              {c || dict.filters.all}
            </button>
          ))}
        </div>

        {/* Type */}
        <div className="hidden md:flex bg-bg-elevated border border-border overflow-hidden">
          {[
            { v: "", l: dict.filters.all },
            { v: "sale", l: dict.property.sale },
            { v: "rent", l: dict.property.rent },
          ].map((t) => (
            <button
              key={t.v || "all"}
              onClick={() => setFilter("type", t.v)}
              className={cn(
                "px-5 py-[0.7rem] text-[0.72rem] tracking-[0.1em] uppercase font-body transition-all duration-300 cursor-pointer border-none",
                type === t.v
                  ? "bg-accent text-bg-primary"
                  : "bg-transparent text-text-secondary hover:text-text-primary",
              )}
            >
              {t.l}
            </button>
          ))}
        </div>

        {/* Neighborhood */}
        <select
          value={neighborhood}
          onChange={(e) => setFilter("neighborhood", e.target.value)}
          className="hidden md:block px-4 py-[0.7rem] bg-bg-elevated border border-border text-text-secondary font-body text-[0.75rem] tracking-[0.05em] cursor-pointer outline-none transition-[border-color] duration-300 focus:border-accent appearance-none pr-8 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%236b6560%27%20stroke-width%3D%271.5%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.7rem_center]"
        >
          <option value="">{dict.filters.allNeighborhoods}</option>
          {neighborhoods.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        {/* Bedrooms + Sort */}
        <div className="flex w-full md:w-auto md:contents gap-3">
          <select
            value={bedrooms}
            onChange={(e) => setFilter("bedrooms", e.target.value)}
            className="flex-1 md:flex-none px-4 py-[0.7rem] bg-bg-elevated border border-border text-text-secondary font-body text-[0.75rem] tracking-[0.05em] cursor-pointer outline-none transition-[border-color] duration-300 focus:border-accent appearance-none pr-8 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%236b6560%27%20stroke-width%3D%271.5%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.7rem_center]"
          >
            <option value="">{dict.filters.allBedrooms}</option>
            <option value="1">{dict.filters.bed1}</option>
            <option value="2">{dict.filters.bed2}</option>
            <option value="3">{dict.filters.bed3}</option>
            <option value="4">{dict.filters.bed4}</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setFilter("sort", e.target.value)}
            className="flex-1 md:flex-none px-4 py-[0.7rem] bg-bg-elevated border border-border text-text-secondary font-body text-[0.75rem] tracking-[0.05em] cursor-pointer outline-none transition-[border-color] duration-300 focus:border-accent appearance-none pr-8 md:ml-auto bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%236b6560%27%20stroke-width%3D%271.5%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.7rem_center]"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="px-4 py-[0.7rem] bg-transparent border-none text-text-muted font-body text-[0.72rem] tracking-[0.05em] cursor-pointer transition-colors duration-300 hover:text-rose"
          >
            {dict.filters.clearAll}
          </button>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mertosanmaz/test-attila && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/mertosanmaz/test-attila
git add src/components/property/property-filters.tsx
git commit -m "feat: translate PropertyFilters component via useDictionary"
```

---

## Task 3: Translate Properties Listing Page Header

**Files:**
- Modify: `src/app/[locale]/(public)/properties/page.tsx`

- [ ] **Step 1: Replace `src/app/[locale]/(public)/properties/page.tsx`**

```typescript
import { Suspense } from "react";
import type { Metadata } from "next";
import { getActiveProperties } from "@/lib/queries/properties";
import { PropertyFilters } from "@/components/property/property-filters";
import { ListingsView } from "@/components/property/listings-view";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Explore carefully curated properties in Istanbul and Bodrum. Filter by city, type, bedrooms and price.",
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function PropertiesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const searchParamsResolved = await searchParams;
  const filtered = await getActiveProperties({
    city: searchParamsResolved.city,
    type: searchParamsResolved.type,
    neighborhood: searchParamsResolved.neighborhood,
    bedrooms: searchParamsResolved.bedrooms,
    sort: searchParamsResolved.sort,
  });

  return (
    <>
      <div className="pt-32 pb-12 px-8 bg-bg-secondary border-b border-border">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-3">
          {dict.propertiesPage.eyebrow}
        </div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light mb-2">
          {dict.propertiesPage.title}
        </h1>
        <p className="text-text-secondary text-[0.9rem] font-light">
          {dict.propertiesPage.subtitle}
        </p>
      </div>

      <Suspense fallback={null}>
        <PropertyFilters />
      </Suspense>

      <ListingsView properties={filtered} total={filtered.length} propertyDict={dict.property} locale={locale as Locale} />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mertosanmaz/test-attila && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/mertosanmaz/test-attila
git add src/app/[locale]/\(public\)/properties/page.tsx
git commit -m "feat: translate properties listing page header"
```

---

## Task 4: Translate Property Detail Page

**Files:**
- Modify: `src/app/[locale]/(public)/properties/[slug]/page.tsx`

- [ ] **Step 1: Replace `src/app/[locale]/(public)/properties/[slug]/page.tsx`**

```typescript
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocaleLink } from "@/components/ui/locale-link";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getPropertyBySlug } from "@/lib/queries/properties";
import { Badge } from "@/components/ui/badge";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertyFeatures } from "@/components/property/property-features";
import { PropertySidebar } from "@/components/property/property-sidebar";
import { DetailMap } from "@/components/map/map-provider";
import type { NearbyIcon } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const property = await getPropertyBySlug(slug);
  const dict = isValidLocale(locale) ? await getDictionary(locale as Locale) : null;
  if (!property) return { title: dict?.propertyDetail.notFound ?? "Property Not Found" };
  return {
    title: property.name,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.name} — ATTILA`,
      description: property.description.slice(0, 160),
      images: property.images[0]
        ? [{ url: property.images[0].url, width: 1200, height: 630 }]
        : [],
    },
  };
}

const NEARBY_ICONS: Record<NearbyIcon, React.ReactNode> = {
  tree: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><path d="M12 22V8M5 12l7-8 7 8M7 16l5-6 5 6" /></svg>,
  anchor: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><circle cx="12" cy="5" r="3" /><path d="M12 22V8M5 12H2a10 10 0 0020 0h-3" /></svg>,
  shop: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><path d="M3 9l1-4h16l1 4M3 9v11h18V9M9 21V13h6v8" /></svg>,
  train: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><rect x="4" y="3" width="16" height="16" rx="2" /><path d="M4 11h16M12 3v8" /></svg>,
  walk: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><circle cx="12" cy="5" r="2" /><path d="M10 22l3-8 4 2M10 13l-2 9M14 13l2-3-4-2-3 3" /></svg>,
  glass: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><path d="M8 21h8M12 15v6M5 3l1 9a6 6 0 0012 0l1-9" /></svg>,
  landmark: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0"><path d="M3 21h18M5 21V10l7-7 7 7v11M9 21v-4h6v4" /></svg>,
};

export default async function PropertyDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const stats = [
    { value: property.bedrooms.toString(), label: dict.propertyDetail.bedroomsLabel },
    { value: property.bathrooms.toString(), label: dict.propertyDetail.bathroomsLabel },
    { value: property.sqft.toLocaleString(), label: dict.property.sqm },
    {
      value: property.type === "sale" ? dict.propertyDetail.deed : dict.propertyDetail.rental,
      label: dict.propertyDetail.ownershipLabel,
    },
  ];

  return (
    <div className="pt-20">
      <LocaleLink
        href="/properties"
        locale={locale as Locale}
        className="inline-flex items-center gap-2 px-8 py-6 text-text-secondary text-[0.72rem] tracking-[0.1em] uppercase transition-colors duration-300 hover:text-accent"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.5]">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {dict.propertyDetail.backToListings}
      </LocaleLink>

      <PropertyGallery images={property.images} name={property.name} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-12 p-8">
        <div>
          <div className="mb-2">
            <Badge variant={property.type === "sale" ? "sale" : "rent"}>
              {property.type === "sale" ? dict.property.sale : dict.property.rent}
            </Badge>
          </div>
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-light mb-1">
            {property.name}
          </h1>
          <div className="flex items-center gap-1.5 text-[0.8rem] text-text-secondary mb-8">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5]">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {property.fullAddress}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 bg-bg-secondary border border-border">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-medium">{s.value}</div>
                <div className="text-[0.62rem] tracking-[0.15em] uppercase text-text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <h3 className="font-display text-2xl font-normal mb-4">{dict.propertyDetail.aboutSection}</h3>
            <p className="text-text-secondary leading-[1.8] text-[0.9rem] font-light">{property.description}</p>
          </div>

          <PropertyFeatures features={property.features} />

          {property.lat && property.lng && (
            <div className="mb-10">
              <h3 className="font-display text-2xl font-normal mb-4">{dict.propertyDetail.locationSection}</h3>
              <div className="h-[300px] border border-border">
                <DetailMap
                  lat={property.lat}
                  lng={property.lng}
                  name={property.name}
                  price={property.priceDisplay}
                />
              </div>
              <div className="flex items-center gap-2 mt-3 text-[0.8rem] text-text-secondary">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-[1.5] shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {property.fullAddress}
              </div>
            </div>
          )}

          {property.nearbyPlaces.length > 0 && (
            <div className="mb-10">
              <h3 className="font-display text-2xl font-normal mb-4">{dict.propertyDetail.nearbySection}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {property.nearbyPlaces.map((n) => (
                  <div key={n.id} className="flex items-center gap-2.5 p-3 bg-bg-secondary text-[0.75rem] text-text-secondary">
                    {NEARBY_ICONS[n.icon]}
                    {n.name}
                    <span className="ml-auto text-[0.65rem] text-text-muted">{n.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <PropertySidebar property={property} />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mertosanmaz/test-attila && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/mertosanmaz/test-attila
git add "src/app/[locale]/(public)/properties/[slug]/page.tsx"
git commit -m "feat: translate property detail page labels and headings"
```

---

## Task 5: Translate PropertySidebar + ContactSheet

**Files:**
- Modify: `src/components/property/property-sidebar.tsx`

This is a client component — use `useDictionary()`. The `confirmBefore`/`confirmAfter` keys split around the styled email span.

- [ ] **Step 1: Replace `src/components/property/property-sidebar.tsx`**

```typescript
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { submitInquiry } from "@/lib/actions/inquiry-actions";
import { useDictionary } from "@/components/providers/dictionary-provider";
import type { PropertyWithImages } from "@/lib/types";

type ModalType = "viewing" | "info" | null;

type Props = {
  property: PropertyWithImages;
};

export function PropertySidebar({ property: p }: Props) {
  const dict = useDictionary();
  const [modal, setModal] = useState<ModalType>(null);
  const priceNote =
    p.type === "rent" ? dict.sidebar.monthlyFurnished : dict.sidebar.askingPrice;

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  return (
    <>
      <div className="sticky top-24 self-start">
        <div className="bg-bg-card border border-border p-8">
          <div className="font-display text-[2.2rem] text-accent font-medium mb-1">
            {p.priceDisplay}
          </div>
          <div className="text-[0.72rem] text-text-muted mb-6">{priceNote}</div>

          <Button
            variant="primary"
            className="w-full mb-2.5 justify-center"
            onClick={() => setModal("viewing")}
          >
            {p.type === "sale" ? dict.sidebar.scheduleViewing : dict.sidebar.applyNow}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={() => setModal("info")}
          >
            {dict.sidebar.requestInfo}
          </Button>

          <div className="flex items-center gap-4 pt-6 mt-6 border-t border-border">
            <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center font-display text-[1.1rem] text-accent shrink-0">
              {p.agentName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="text-[0.9rem] font-medium">{p.agentName}</div>
              <div className="text-[0.7rem] text-text-muted">{p.agentTitle}</div>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <ContactSheet
          type={modal}
          propertyId={p.id}
          propertyName={p.name}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}

/* ─── CONTACT SHEET ─── */

type SheetProps = {
  type: "viewing" | "info";
  propertyId: string;
  propertyName: string;
  onClose: () => void;
};

function ContactSheet({ type, propertyId, propertyName, onClose }: SheetProps) {
  const dict = useDictionary();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const isViewing = type === "viewing";
  const title = isViewing ? dict.sheet.viewingTitle : dict.sheet.infoTitle;
  const subtitle = isViewing ? dict.sheet.viewingSubtitle : dict.sheet.infoSubtitle;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setStatus("sending");

    const fullMessage = [
      isViewing && date ? `Preferred date: ${date}` : null,
      isViewing && timeSlot ? `Preferred time: ${timeSlot}` : null,
      message || null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await submitInquiry({
        propertyId,
        name,
        email,
        phone: phone || null,
        message: fullMessage || null,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-[8px]"
        style={{ animation: "sheet-backdrop 0.35s ease both" }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[2001] w-full max-w-[480px] bg-[#0f0f0f] border-l border-accent/20 flex flex-col overflow-y-auto"
        style={{ animation: "sheet-slide 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold top bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-10 pb-6 border-b border-white/5">
          <div>
            <p className="text-[0.55rem] tracking-[0.35em] uppercase text-accent/70 mb-2">
              {propertyName}
            </p>
            <h2 className="font-display text-[1.9rem] font-light leading-tight">
              {title}
            </h2>
            <p className="text-[0.78rem] text-text-muted mt-2 leading-relaxed max-w-[300px]">
              {subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-accent/40 transition-colors duration-300 mt-1 shrink-0"
            aria-label={dict.sheet.close}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-text-muted fill-none stroke-[1.5]">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 px-8 py-8">
          {status === "done" ? (
            <div
              className="flex flex-col items-center justify-center h-full text-center py-16"
              style={{ animation: "sheet-backdrop 0.4s ease both" }}
            >
              <div className="w-14 h-14 border border-accent/30 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent fill-none stroke-[1.5]">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-light mb-3">{dict.sheet.submitted}</h3>
              <p className="text-text-muted text-[0.82rem] leading-relaxed max-w-[260px]">
                {dict.sheet.confirmBefore}{" "}
                <span className="text-text-secondary">{email}</span>{" "}
                {dict.sheet.confirmAfter}
              </p>
              <button
                onClick={onClose}
                className="mt-8 text-[0.68rem] tracking-[0.2em] uppercase text-accent/70 hover:text-accent transition-colors duration-300 bg-transparent border-none cursor-pointer font-body"
              >
                {dict.sheet.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label={`${dict.sheet.fullName} *`}>
                <SheetInput
                  placeholder={dict.sheet.fullName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>

              <Field label={`${dict.sheet.email} *`}>
                <SheetInput
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field label={isViewing ? `${dict.sheet.phone} *` : dict.sheet.phone}>
                <SheetInput
                  type="tel"
                  placeholder="+90 5__ ___ __ __"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={isViewing}
                />
              </Field>

              {isViewing && (
                <div className="grid grid-cols-2 gap-3">
                  <Field label={dict.sheet.preferredDate}>
                    <SheetInput
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </Field>
                  <Field label={dict.sheet.timeSlot}>
                    <SheetSelect
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                    >
                      <option value="">{dict.sheet.selectTime}</option>
                      <option value="morning">{dict.sheet.morning}</option>
                      <option value="afternoon">{dict.sheet.afternoon}</option>
                      <option value="evening">{dict.sheet.evening}</option>
                    </SheetSelect>
                  </Field>
                </div>
              )}

              <Field label={dict.sheet.messageOptional}>
                <textarea
                  placeholder={isViewing ? dict.sheet.viewingNotes : dict.sheet.infoQuestion}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/8 px-4 py-3 text-[0.82rem] text-text-primary placeholder:text-text-muted/50 outline-none transition-colors duration-300 focus:border-accent/40 resize-none font-body"
                />
              </Field>

              {status === "error" && (
                <p className="text-[0.75rem] text-rose bg-rose/10 px-3 py-2">
                  {dict.sheet.error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-accent text-bg-primary text-[0.7rem] tracking-[0.2em] uppercase font-semibold font-body transition-all duration-400 hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending"
                  ? dict.sheet.sending
                  : isViewing
                    ? dict.sheet.submitViewing
                    : dict.sheet.submitInfo}
              </button>

              <p className="text-center text-[0.65rem] text-text-muted/60">
                {dict.sheet.privacyNote}
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes sheet-backdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes sheet-slide {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

/* ─── FIELD PRIMITIVES ─── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.62rem] tracking-[0.15em] uppercase text-text-muted/80">
        {label}
      </label>
      {children}
    </div>
  );
}

function SheetInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full bg-white/[0.03] border border-white/8 px-4 py-3 text-[0.82rem] text-text-primary placeholder:text-text-muted/50 outline-none transition-colors duration-300 focus:border-accent/40 font-body ${className ?? ""}`}
      {...props}
    />
  );
}

function SheetSelect({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="w-full bg-[#0f0f0f] border border-white/8 px-4 py-3 text-[0.82rem] text-text-primary outline-none transition-colors duration-300 focus:border-accent/40 font-body appearance-none"
      {...props}
    >
      {children}
    </select>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mertosanmaz/test-attila && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/mertosanmaz/test-attila
git add src/components/property/property-sidebar.tsx
git commit -m "feat: translate PropertySidebar and ContactSheet via useDictionary"
```

---

## Task 6: Translate ContactForm

**Files:**
- Modify: `src/components/contact-form.tsx`

- [ ] **Step 1: Replace `src/components/contact-form.tsx`**

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { submitInquiry } from "@/lib/actions/inquiry-actions";
import { useDictionary } from "@/components/providers/dictionary-provider";

export function ContactForm() {
  const dict = useDictionary();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;

    setStatus("sending");
    try {
      await submitInquiry({
        propertyId: null,
        name,
        email,
        phone: phone || null,
        message: message || null,
      });
      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-bg-card border border-border p-8">
      <h2 className="font-display text-xl font-normal mb-6">{dict.contactForm.title}</h2>

      {status === "sent" ? (
        <div className="text-center py-8">
          <div className="font-display text-2xl mb-2 text-accent">{dict.contactForm.thankYou}</div>
          <p className="text-text-secondary text-[0.85rem]">
            {dict.contactForm.sentMessage}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-[0.72rem] text-accent uppercase tracking-[0.1em] bg-transparent border-none cursor-pointer font-body hover:text-accent-hover transition-colors"
          >
            {dict.contactForm.anotherMessage}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>{dict.contactForm.fullName}</Label>
              <Input placeholder={dict.contactForm.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{dict.contactForm.email}</Label>
              <Input type="email" placeholder={dict.contactForm.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>{dict.contactForm.phone}</Label>
            <Input type="tel" placeholder={dict.contactForm.phonePlaceholder} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>{dict.contactForm.message}</Label>
            <Textarea placeholder={dict.contactForm.messagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          {status === "error" && (
            <div className="text-[0.78rem] text-rose bg-rose-muted px-3 py-2">
              {dict.contactForm.error}
            </div>
          )}

          <Button variant="primary" className="w-full justify-center" disabled={status === "sending"}>
            {status === "sending" ? dict.contactForm.sending : dict.contactForm.send}
          </Button>
          <p className="text-[0.72rem] text-text-muted text-center">
            {dict.contactForm.disclaimer}
          </p>
        </form>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mertosanmaz/test-attila && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/mertosanmaz/test-attila
git add src/components/contact-form.tsx
git commit -m "feat: translate ContactForm component via useDictionary"
```

---

## Task 7: Translate About Page

**Files:**
- Modify: `src/app/[locale]/(public)/about/page.tsx`

- [ ] **Step 1: Replace `src/app/[locale]/(public)/about/page.tsx`**

```typescript
import type { Metadata } from "next";
import Image from "next/image";
import { LocaleLink } from "@/components/ui/locale-link";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "About — Attila Homes",
  description:
    "Istanbul's energy, Bodrum's exclusivity — under one roof. Discover Attila Homes' story and philosophy.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 bg-bg-secondary border-b border-border">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-3">
          {dict.aboutPage.eyebrow}
        </div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light mb-4 tracking-[0.05em]">
          Attila Homes
        </h1>
        <p className="font-display text-xl italic font-light text-accent/75 max-w-2xl leading-[1.6]">
          {dict.aboutPage.tagline}
        </p>
      </section>

      {/* Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-8 py-20">
        <div className="relative overflow-hidden aspect-[4/5]">
          <Image
            src="/attila-portrait.jpg"
            alt="Attila Utkucan"
            fill
            className="object-cover brightness-95"
          />
          <div className="absolute inset-0 border border-accent/10 pointer-events-none" />
        </div>
        <div className="flex flex-col justify-center max-w-lg">
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-4">
            {dict.aboutPage.founderTitle}
          </div>
          <h2 className="font-display text-3xl font-light mb-6">
            Attila Utkucan
          </h2>
          <p className="text-text-secondary leading-[1.8] font-light mb-5">
            {dict.aboutPage.bio1}
          </p>
          <p className="text-text-secondary leading-[1.8] font-light mb-5">
            {dict.aboutPage.bio2}
          </p>
          <p className="text-text-secondary leading-[1.8] font-light mb-6">
            {dict.aboutPage.bio3}
          </p>
          <p className="text-accent/70 font-display italic text-[1.05rem] leading-[1.6] mb-6">
            {dict.aboutPage.quote}
          </p>
          <div className="mt-2">
            <LocaleLink
              href="/contact"
              locale={locale as Locale}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-primary text-[0.72rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:bg-accent-hover"
            >
              {dict.aboutPage.contactCta}
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="px-8 py-16 bg-bg-secondary border-t border-border">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-8">
          {dict.aboutPage.contactInfoTitle}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-lg font-light mb-3">{dict.aboutPage.istanbulOffice}</h3>
            <p className="text-text-secondary text-[0.85rem] leading-[1.8]">
              Yeşilköy Mah. Ahmet Taner Kışlalı Sk.<br />
              No: 9/2 C Blok İç Kapı No: 1<br />
              Bakırköy / İstanbul
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-light mb-3">{dict.aboutPage.bodrumOffice}</h3>
            <p className="text-text-secondary text-[0.85rem] leading-[1.8]">
              Adnan Menderes Cad. 1708 Sokak<br />
              İskender Evleri No:4 E Blok Daire: 3<br />
              Bodrum / Muğla
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-light mb-3">{dict.aboutPage.reachUs}</h3>
            <div className="space-y-2">
              <a
                href="mailto:info@attilahomes.com"
                className="block text-text-secondary text-[0.85rem] transition-colors duration-300 hover:text-accent"
              >
                info@attilahomes.com
              </a>
              <a
                href="https://wa.me/905313443090"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-text-secondary text-[0.85rem] transition-colors duration-300 hover:text-accent"
              >
                +90 531 344 30 90
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mertosanmaz/test-attila && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/mertosanmaz/test-attila
git add "src/app/[locale]/(public)/about/page.tsx"
git commit -m "feat: translate About page via getDictionary"
```

---

## Task 8: Translate Contact Page

**Files:**
- Modify: `src/app/[locale]/(public)/contact/page.tsx`

- [ ] **Step 1: Replace `src/app/[locale]/(public)/contact/page.tsx`**

```typescript
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Attila Utkucan for property enquiries in Istanbul and Bodrum.",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="pt-32 pb-24 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
        <div>
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-accent font-medium mb-3">
            {dict.contactPage.eyebrow}
          </div>
          <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light mb-6">
            {dict.contactPage.title}
          </h1>
          <p className="text-text-secondary leading-[1.8] font-light mb-10">
            {dict.contactPage.subtitle}
          </p>
          <div className="space-y-6">
            <ContactItem
              label={dict.contactPage.istanbulOffice}
              value="Yeşilköy Mah. Ahmet Taner Kışlalı Sk. No: 9/2 C Blok İç Kapı No: 1 Bakırköy/İstanbul"
              detail="+90 531 344 30 90"
            />
            <ContactItem
              label={dict.contactPage.bodrumOffice}
              value="Adnan Menderes Cad. 1708 Sokak İskender Evleri No:4 E Blok Daire: 3 Bodrum/Muğla"
              detail="+90 531 344 30 90"
            />
            <ContactItem label={dict.contactPage.emailLabel} value="info@attilahomes.com" />
            <ContactItem label={dict.contactPage.whatsappLabel} value="+90 531 344 30 90" />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

function ContactItem({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="pb-5 border-b border-border">
      <div className="text-[0.62rem] tracking-[0.2em] uppercase text-text-muted mb-1">{label}</div>
      <div className="text-[0.9rem] font-medium">{value}</div>
      {detail && <div className="text-[0.8rem] text-text-secondary mt-0.5">{detail}</div>}
    </div>
  );
}
```

- [ ] **Step 2: Full TypeScript + build verification**

```bash
cd /Users/mertosanmaz/test-attila && npx tsc --noEmit
```

Expected: No errors.

```bash
cd /Users/mertosanmaz/test-attila && npm run build 2>&1 | tail -20
```

Expected: Build succeeds with no TypeScript errors. You may see `warn` about missing Supabase env vars — that is fine for a build check.

- [ ] **Step 3: Visual spot-check**

Start the dev server:
```bash
cd /Users/mertosanmaz/test-attila && npm run dev
```

Visit each URL below and confirm text changes language:

| URL | What to verify |
|-----|----------------|
| `http://localhost:3000/en/properties` | Header "All Properties", filter "All", sort "Featured" |
| `http://localhost:3000/ru/properties` | Header "Все объекты", filter "Все", sort "Избранное" |
| `http://localhost:3000/en/about` | "About Us", "Founder & Advisor", English bio paragraphs |
| `http://localhost:3000/ru/about` | "О нас", "Основатель и советник", Russian bio |
| `http://localhost:3000/en/contact` | "Get in Touch", "Istanbul Office", "Email", form "Send a Message" |
| `http://localhost:3000/ru/contact` | "Связаться с нами", "Офис в Стамбуле", form "Отправить сообщение" |
| `http://localhost:3000/en/properties/<any-slug>` | "Back to Listings", "For Sale"/"For Rent", "About This Property", "Location", "Nearby" |

- [ ] **Step 4: Commit**

```bash
cd /Users/mertosanmaz/test-attila
git add "src/app/[locale]/(public)/contact/page.tsx"
git commit -m "feat: translate Contact page via getDictionary"
```
