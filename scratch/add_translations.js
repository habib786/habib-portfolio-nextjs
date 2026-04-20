
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  const translations = [
    // French (Canada)
    { key: 'site_title_fr-CA', value: "Portfolio de Habib Farooq" },
    { key: 'site_description_fr-CA', value: "Portfolio personnel et blog" },
    { key: 'profile_role_fr-CA', value: "Développeur Web Full Stack" },
    { key: 'contact_meta_title_fr-CA', value: "Contact | Habib Farooq" },
    { key: 'contact_meta_description_fr-CA', value: "Contactez Habib Farooq pour des projets de développement web." },
    { key: 'blog_meta_title_fr-CA', value: "Blog | Habib Farooq" },
    { key: 'blog_meta_description_fr-CA', value: "Articles sur le développement web et l'IA par Habib Farooq." },
    { key: 'projects_meta_title_fr-CA', value: "Projets | Habib Farooq" },
    { key: 'projects_meta_description_fr-CA', value: "Découvrez les derniers projets de développement web de Habib Farooq." },

    // Arabic (Saudi Arabia)
    { key: 'site_title_ar-SA', value: "معرض أعمال حبيب فاروق" },
    { key: 'site_description_ar-SA', value: "مدونة ومعرض أعمال شخصي" },
    { key: 'profile_role_ar-SA', value: "مطور ويب متكامل" },
    { key: 'contact_meta_title_ar-SA', value: "اتصل بنا | حبيب فاروق" },
    { key: 'contact_meta_description_ar-SA', value: "اتصل بحبيب فاروق لمشاريع تطوير الويب." },
    { key: 'blog_meta_title_ar-SA', value: "المدونة | حبيب فاروق" },
    { key: 'blog_meta_description_ar-SA', value: "مقالات عن تطوير الويب والذكاء الاصطناعي بقلم حبيب فاروق." },
    { key: 'projects_meta_title_ar-SA', value: "المشاريع | حبيب فاروق" },
    { key: 'projects_meta_description_ar-SA', value: "استكشف أحدث مشاريع تطوير الويب التي قام بها حبيب فاروق." },

    // Turkish (Turkey)
    { key: 'site_title_tr-TR', value: "Habib Farooq Portfolyosu" },
    { key: 'site_description_tr-TR', value: "Kişisel portfolyo ve blog" },
    { key: 'profile_role_tr-TR', value: "Full Stack Web Geliştirici" },
    { key: 'contact_meta_title_tr-TR', value: "İletişim | Habib Farooq" },
    { key: 'contact_meta_description_tr-TR', value: "Web geliştirme projeleri için Habib Farooq ile iletişime geçin." },
    { key: 'blog_meta_title_tr-TR', value: "Blog | Habib Farooq" },
    { key: 'blog_meta_description_tr-TR', value: "Habib Farooq tarafından yazılan web geliştirme ve yapay zeka makaleleri." },
    { key: 'projects_meta_title_tr-TR', value: "Projeler | Habib Farooq" },
    { key: 'projects_meta_description_tr-TR', value: "Habib Farooq'un en son web geliştirme projelerini keşfedin." },

    // Urdu (Pakistan)
    { key: 'site_title_ur-PK', value: "حبیب فاروق پورٹ فولیو" },
    { key: 'site_description_ur-PK', value: "ذاتی پورٹ فولیو اور بلاگ" },
    { key: 'profile_role_ur-PK', value: "فل اسٹیک ویب ڈویلپر" },
    { key: 'contact_meta_title_ur-PK', value: "رابطہ کریں | حبیب فاروق" },
    { key: 'contact_meta_description_ur-PK', value: "ویب ڈویلپمنٹ پراجیکٹس کے لیے حبیب فاروق سے رابطہ کریں۔" },
    { key: 'blog_meta_title_ur-PK', value: "بلاگ | حبیب فاروق" },
    { key: 'blog_meta_description_ur-PK', value: "حبیب فاروق کے لکھے ہوئے ویب ڈویلپمنٹ اور اے آئی پر مضامین۔" },
    { key: 'projects_meta_title_ur-PK', value: "پراجیکٹس | حبیب فاروق" },
    { key: 'projects_meta_description_ur-PK', value: "حبیب فاروق کے حالیہ ویب ڈویلپمنٹ پراجیکٹس دیکھیں۔" }
  ];

  console.log(`Inserting ${translations.length} translations...`);

  for (const t of translations) {
    const { error } = await supabase
      .from('settings')
      .upsert({ key: t.key, value: t.value }, { onConflict: 'key' });

    if (error) {
      console.error(`Error inserting ${t.key}:`, error);
    } else {
      console.log(`Successfully updated ${t.key}`);
    }
  }

  console.log('Done!');
}

runMigration();
