# موقع ورشة عمل — شركة أساس للتقنية

موقع Landing Page عام (One Page) لورشة عمل، مبني بـ Vanilla JavaScript + Vite (بدون أي framework)،
متوافق 100% مع `registration-fields-reference.md` في حقول التسجيل وطريقة الإرسال.

**هذا المشروع لا يحتوي على لوحة تحكم Admin** — هو الموقع العام فقط، لكنه مُنظّم بحيث يسهل لاحقًا
بناء لوحة تحكم منفصلة تستخدم نفس الـ Backend دون إعادة هيكلة النظام.

## التشغيل محليًا

```bash
npm install
cp .env.example .env   # ثم عدّل القيم داخل .env
npm run dev
```

## البناء للنشر

```bash
npm run build       # يولّد مجلد dist/ جاهز للنشر
npm run preview      # لمعاينة نسخة الإنتاج محليًا
```

## بنية المشروع

```
src/
├── config/
│   └── config.js              # كل متغيرات البيئة (API_BASE_URL, GOOGLE_MAPS_URL, ...) من مكان واحد
├── constants/
│   └── options.js              # قيم الـ Enums (interests, projects, languages, how_did_you_hear) + الأهداف
├── services/
│   └── registrationService.js  # الاتصال الوحيد بـ POST /api/registrations — لا fetch خارج هذا الملف
├── validation/
│   └── registrationValidation.js  # نفس قيود الـ Backend حرفيًا (client-side فقط)
├── components/
│   └── checkboxGroup.js        # مكوّن قابل لإعادة الاستخدام لمجموعات الاختيار (مع منطق "None" الحصري)
├── sections/
│   ├── header.js                # رابط Google Maps + الشعار + Smooth Scroll
│   ├── workshopInfo.js          # بطاقات معلومات الورشة (تُعرض فقط إذا كانت القيم مُعرَّفة)
│   ├── goals.js                 # أهداف الورشة
│   └── registrationForm.js      # منطق الفورم الكامل: عرض، تحقق، إرسال، حالات النجاح/الخطأ
├── styles/
│   └── main.css                 # كل التصميم (Tokens، Layout، Components)
└── main.js                      # نقطة الدخول — يربط كل شيء عند تحميل الصفحة
index.html                       # الهيكل الثابت (Markup) لكل أقسام الصفحة
```

## متغيرات البيئة (`.env`)

راجع `.env.example` — أهمها:

| المتغير | الوصف |
|---|---|
| `VITE_API_BASE_URL` | رابط الـ Backend. الطلب النهائي يكون `${VITE_API_BASE_URL}/api/registrations` |
| `VITE_GOOGLE_MAPS_URL` | رابط خرائط جوجل لموقع الشركة. إن تُرك فارغًا يتم تعطيل زر "موقع الشركة" بدل فتح رابط خاطئ |
| `VITE_LOGO_URL` | رابط شعار الشركة. إن تُرك فارغًا يظهر شعار نصي بديل تلقائيًا |
| `VITE_WORKSHOP_DATE/TIME/DURATION/LOCATION` | معلومات الورشة، تُعرض فقط إن كانت مُعبّأة (لا بيانات وهمية) |

## التوافق مع الـ Backend

- Endpoint: `POST /api/registrations` (عام، بدون Admin Key)
- الحقول وأسماء المفاتيح والقيم المسموحة مطابقة حرفيًا لملف `registration-fields-reference.md`
- لا يتم إرسال أي حقل غير معرّف في المرجع (لا `notes`, لا `age`, لا `attendance_interest`, ...)
- الحقول الاختيارية الفارغة لا تُرسل ضمن الـ JSON إطلاقًا (بدل إرسال `""` أو `null`)
- أخطاء `422` من FastAPI تُقرأ وتُعرض للمستخدم بجانب الحقل المعني

## إعادة الاستخدام لاحقًا في لوحة التحكم

عند بناء لوحة التحكم كمشروع منفصل لاحقًا:
- انسخ `src/services/registrationService.js` و `src/config/config.js` كنقطة بداية للاتصال بنفس الـ Backend
- استخدم نفس القيم في `src/constants/options.js` لعرض التسجيلات بشكل متوافق مع القيم المخزّنة
- لا حاجة لإعادة بناء أو تعديل أي شيء في هذا المشروع لإضافة لوحة التحكم
