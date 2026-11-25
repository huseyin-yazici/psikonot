// Sitenin her yerde kullanılan sabitleri. Alan adı ve iletişim adresi
// netleşince yalnızca burayı güncellemek yeterli.
export const site = {
  name: "Psikonot",
  tagline: "Türkçe seans notu asistanı",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // TODO: alan adı alınınca gerçek adresle değiştir.
  contactEmail: "merhaba@psikonot.com",
  // TODO: veri sorumlusunun adı (şirket kurulana kadar sizin adınız).
  dataController: "[Ad Soyad]",
} as const;

// Onay metni her değiştiğinde bu sürümü artırın; başvurular hangi metne
// onay verildiğini bu değerle birlikte saklar.
export const CONSENT_VERSION = "2026-11-25";
