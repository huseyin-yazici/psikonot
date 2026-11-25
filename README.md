# Psikonot

Psikologlar için Türkçe yapay zekâ seans notu asistanı. Proje planı: [docs/proje-dosyasi.md](docs/proje-dosyasi.md).

Şu an depoda yalnızca **kayıt sayfası (beta bekleme listesi)** var: Next.js + TypeScript + Tailwind, başvurular Supabase'e yazılır.

## Yerelde çalıştırma

```bash
npm install
cp .env.example .env.local   # Supabase bilgilerini doldurun (boş bırakılırsa başvurular sadece konsola yazılır)
npm run dev
```

http://localhost:3000 adresini açın. Paylaşım linklerine `?ref=linkedin` gibi bir etiket eklerseniz başvurunun hangi kanaldan geldiği `source` sütununa kaydedilir.

## Supabase kurulumu

1. supabase.com'da **AB bölgesinde** (ör. Frankfurt) bir proje açın.
2. SQL Editor'de `supabase/migrations/0001_waitlist.sql` dosyasını çalıştırın.
3. Project Settings > API'den `SUPABASE_URL` ve `service_role` anahtarını alın, `.env.local`'e (ve Vercel'de Environment Variables'a) ekleyin.

`waitlist` tablosunda RLS açık ve hiç politika yok; tarayıcıdan erişilemez. Kayıtları yalnızca sunucudaki Server Action ekler. Başvuruları Supabase panelindeki Table Editor'den görebilirsiniz.

## Vercel'e yayınlama

Depoyu Vercel'e bağlayın, üç ortam değişkenini (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`) girin ve yayınlayın. Üretimde Supabase ayarlı değilse form hata mesajı gösterir; başvuru sessizce kaybolmaz.

## Yayından önce yapılacaklar

- [ ] `src/lib/site.ts`: alan adı, iletişim e-postası ve veri sorumlusu adını doldurun.
- [ ] `/aydinlatma-metni` sayfası bir **taslaktır**. KVKK avukatına kontrol ettirin. Metni değiştirirseniz `CONSENT_VERSION` değerini güncelleyin.
- [ ] İletişim e-posta adresinin gerçekten çalıştığını doğrulayın (KVKK başvuruları buraya gelecek).

## Dosyalar

| Yol | Ne işe yarar |
|---|---|
| `src/app/page.tsx` | Kayıt sayfası |
| `src/components/waitlist-form.tsx` | Başvuru formu |
| `src/app/actions/waitlist.ts` | Sunucu tarafı doğrulama ve Supabase'e kayıt |
| `src/app/aydinlatma-metni/page.tsx` | Başvuru aydınlatma metni (taslak) |
| `src/lib/site.ts` | Site adı, iletişim bilgisi, onay metni sürümü |
| `supabase/migrations/` | Veritabanı tabloları |
