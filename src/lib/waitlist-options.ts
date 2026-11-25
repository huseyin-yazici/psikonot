// Formdaki seçenekler. Sunucu doğrulaması da aynı listeyi kullanır.
export const professions = [
  "Psikolog",
  "Klinik psikolog",
  "Psikolojik danışman",
  "Aile danışmanı",
  "Psikiyatrist",
  "Yüksek lisans öğrencisi / stajyer",
  "Diğer",
] as const;

export const workModes = ["Yüz yüze", "Online", "İkisi de"] as const;

export const weeklySessions = ["1–10", "11–20", "21–30", "30'dan fazla"] as const;

export const weeklyNoteHours = [
  "1 saatten az",
  "1–3 saat",
  "3–5 saat",
  "5 saatten fazla",
  "Not tutmuyorum",
] as const;
