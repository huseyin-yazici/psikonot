# Psikologlar için Türkçe yapay zekâ seans notu asistanı: proje dosyası

## 1. Özet

Türk psikolog ve danışmanlar için bir web uygulaması. Seans kaydını Türkçe metne çevirir ve 2 dakika içinde profesyonel bir seans notu çıkarır. Psikolog notu kontrol eder, düzeltir ve danışanın dosyasına kaydeder.

- **Müşteri:** Kendi muayenehanesinde ya da online çalışan psikologlar, psikolojik danışmanlar, aile danışmanları.
- **Gelir:** Aylık abonelik.
- **Başlangıç:** Tek kişi, düşük bütçe, şirketsiz. Şirket ilk ödemeden hemen önce açılacak.

## 2. Problem ve müşteri

- Psikologlar her seanstan sonra not yazmak zorunda: hem mesleki gereklilik hem de bir sonraki seansa hazırlık için. Bu iş her seans için 10–20 dakika sürebilir. Bunun gerçek süresini ilk görüşmelerde psikologlara sorarak doğrulayacağız.
- Türkiye'de online seans ücretleri seans başına yaklaşık 800–2.000 TL. Yani psikoloğun zamanı değerli.
- **Satış cümlesi:** "Aylık ücretimiz tek bir seans ücretinizden az. Karşılığında her hafta saatler kazanıyorsunuz."

## 3. Ürün nasıl çalışacak?

1. Psikolog danışandan seans kaydı için yazılı onay alır. Uygulama hazır bir onay formu şablonu verir.
2. Seansı kaydeder:
   - Online seansta Zoom veya Meet kayıt dosyasını yükler.
   - Yüz yüze seansta telefonun ses kayıt uygulamasıyla kaydedip dosyayı yükler.
   - Sonraki sürümlerde tarayıcıdan doğrudan kayıt da olacak.
3. Sistem sesi Türkçe metne çevirir ve terapistin sesini danışanınkinden ayırır.
4. **Ses dosyası hemen silinir.**
5. Yapay zekâ, seçilen şablona göre seans notu çıkarır:
   - Danışanın getirdiği konu
   - Gözlemler
   - Uygulanan teknikler
   - Verilen ev ödevi
   - Risk notu (varsa)
   - Bir sonraki seansın planı
6. Psikolog notu düzenler, onaylar ve danışan dosyasına kaydeder. Bir sonraki seansta önceki notların özeti hazır olur.

**Kesin çizgi:** Uygulama **teşhis koymaz, tedavi önermez**. Sadece psikoloğun söylediklerini ve yaptıklarını belgeler.

## 4. Özellikler: neyi ne zaman yapacağız?

| Aşama | Özellikler |
|---|---|
| **Test sürümü** | Giriş, ses dosyası yükleme, Türkçe metne çevirme, 2–3 not şablonu, not düzenleme, kopyalama ve PDF çıktısı, basit danışan listesi |
| **Beta** | Tarayıcıdan kayıt, ekole özel şablonlar (BDT, şema terapi, EMDR, aile terapisi), danışan bazlı not geçmişi, "son 3 seansın özeti", iki adımlı giriş, onay formu şablonları |
| **Ücretli sürüm** | Abonelik ve ödeme, kullanım limitleri, fatura |
| **3–6 ay sonra** | Danışanın ilerleme takibi, randevu ve ödeme hatırlatma, Flutter ile telefondan kesintisiz kayıt uygulaması |
| **6–12 ay sonra** | Klinikler için çok kullanıcılı plan. Benzer ihtiyacı olan diyetisyenler ve koçlar gibi yeni meslek gruplarına açılma |

## 5. Rakipler ve farkımız

| Rakip | Durum |
|---|---|
| **Mentalyc, Upheal** | Psikologlara özel, yurt dışında başarılı ama İngilizce odaklı. Türkçe ve Türk mevzuatı yok |
| **Noa (DoktorTakvimi)** | Doktorlar için muayene notu. **En büyük tehdit bu:** DoktorTakvimi'nde çok sayıda psikolog var ve Noa'yı onlara da açabilirler |
| **Wellopta, MedAI360** | Genel sağlık ya da klinik yazılımlarının bir parçası. Psikolojiye özel değil |

**Farkımız:**
- **Sadece psikolojiye odaklanmak.** Terapi ekollerine özel şablonlar ve terminoloji. Genel bir doktor aracı bunu iyi yapamaz.
- **Gizlilik öncelikli tasarım.** Ses saklanmaz, veriler yapay zekâ eğitiminde kullanılmaz, tüm erişimler kayıt altında tutulur. Psikologlar için güven en önemli satış argümanı.
- **Bağımsızlık.** Psikolog hangi randevu platformunu kullanırsa kullansın uygulama çalışır.
- **Hız.** DoktorTakvimi gibi büyük bir şirket bu alana girmeden önce psikolog topluluğunda tanınan bir isim olmak.

## 6. Teknik altyapı

- **Web uygulaması:** Next.js + TypeScript + Tailwind
- **Veritabanı, giriş ve dosya depolama:** Supabase, AB bölgesi
- **Konuşmayı metne çevirme:** Türkçe ve konuşmacı ayrımı destekleyen bir API. İlk hafta 2–3 servis test edilecek.
- **Seans notu üretimi:** Claude API
- **Yayına alma:** Vercel
- **Ödeme:** iyzico (Stripe Türkiye'deki şirketlere hizmet vermiyor)
- **Mobil (sonra):** Flutter

**Veri akışı:**
1. Ses dosyası şifreli olarak geçici depoya yüklenir.
2. Ses metne çevrilir ve **dosya hemen silinir**.
3. Metinden seans notu üretilir.
4. Not ve metin, şifreli olarak veritabanına kaydedilir.
5. Notu yalnızca o psikolog görebilir.

**Güvenlik kuralları:**
- API anahtarları sadece sunucuda tutulur.
- Kullanılan servislerin verileri saklamadığı ve yapay zekâ eğitiminde kullanmadığı sözleşmeyle doğrulanır.
- Tüm erişimler kayıt altına alınır. Kullanıcı istediğinde tüm verisi kalıcı olarak silinir.

## 7. Hukuk, KVKK ve etik

| Konu | Ne yapacağız |
|---|---|
| **Kim sorumlu?** | Danışan verisinden **psikolog sorumludur**. Biz veriyi onun adına işleyen tarafız. Her kullanıcıyla bir **veri işleme sözleşmesi** imzalanacak. Bu, kullanım şartlarının bir parçası olabilir |
| **Danışan onayı** | Seans kaydı ve sağlık verisinin işlenmesi için danışandan **açık rıza** gerekiyor. Uygulama psikoloğa hazır bir onay formu verecek |
| **Yurt dışına veri aktarımı** | Yapay zekâ ve ses-metin servisleri yurt dışındaysa KVKK'nın yurt dışı aktarım kuralları uygulanır. Bildiğimiz kadarıyla standart sözleşme imzalayıp Kurul'a bildirmek gerekiyor, **ama bunu avukat teyit etmeli** |
| **Aydınlatma metni ve gizlilik politikası** | Avukat hazırlayacak |
| **Tıbbi cihaz riski** | Teşhis, tedavi önerisi ya da risk puanı üretmeyeceğiz. Uygulama sadece belgeleme yapacak |
| **Mesleki etik** | Türk Psikologlar Derneği'nin kayıt ve gizlilik ilkelerine uyum kontrol edilecek |
| **Pazarlama** | Onaysız tanıtım e-postası göndermeyeceğiz. Kişiler kayıt sayfasından kendileri başvuracak |

**Bütçedeki en önemli kalem, beta öncesinde bir KVKK avukatıyla görüşmek.** Bu üründe güven her şey, yasal bir hata bütün işi bitirebilir.

## 8. Şirket ve vergi

| Dönem | Durum |
|---|---|
| **Test sürümü ve ücretsiz beta** | Şirket gerekmez, çünkü gelir yok |
| **İlk ödemeden hemen önce** | **Şahıs şirketi** aç. Birkaç günde açılıyor, ana masraf aylık muhasebeci ücreti |
| **Genç girişimci istisnası** | Şirketi açarken 29 yaşını doldurmamışsan ve ilk kez vergi mükellefi oluyorsan, **2026 için yıllık 400.000 TL'ye kadarki kazanç gelir vergisinden muaf**. 3 yıl geçerli ve sadece şahıs şirketinde var |
| **Bağ-Kur desteği** | 2026'da yeni başlayanlar için kaldırıldığı yazılıyor, muhasebeciye teyit ettirilmeli |
| **KDV ve fatura** | Yazılım hizmetine %20 KDV eklenir. Her ödeme için e-arşiv fatura kesilir. iyzico vergi levhası istiyor |
| **İleride** | Ekip büyüyünce ya da yatırım gelince limited şirkete geçilir. Teknokent'e girmek yazılım gelirlerinde ek vergi avantajı sağlayabilir |

## 9. Gelir modeli ve fiyat

| Plan | İçerik | Fiyat |
|---|---|---|
| **Deneme** | 14 gün ya da 10 seans ücretsiz | 0 TL |
| **Bireysel** | Sınırsız ya da yüksek limitli seans | Test edilecek, aylık 500–900 TL aralığı denenebilir |
| **Klinik** | Çok kullanıcı ve yönetim paneli | Kullanıcı başına fiyat |

**Örnek senaryolar** (tahmin değil, sadece ölçek fikri vermek için; 700 TL fiyatla, KDV hariç):

| Ödeyen psikolog | Aylık gelir |
|---|---|
| 30 | 21.000 TL |
| 100 | 70.000 TL |
| 300 | 210.000 TL |

**Maliyet:** Her seans için ses-metin ve yapay zekâ API ücreti ödenecek. İlk hafta gerçek seans başı maliyeti ölçeceğiz. Hedef, API maliyetinin abonelik fiyatının küçük bir kısmında kalması.

## 10. Pazarlama ve müşteri bulma

Reklam bütçesi yok. Hepsi bilgisayar başından yapılacak:
1. **Kayıt sayfası:** "Türkçe yapay zekâ ile seans notu, beta için ücretsiz katılımcı arıyoruz." Açık onay kutusu olacak.
2. **LinkedIn ve Instagram:** "Seans notu yazmaya haftada kaç saat harcıyorsunuz?" gibi içerikler, kısa demo videoları.
3. **Psikolog toplulukları:** Facebook ve WhatsApp grupları, süpervizyon grupları.
4. **Eğitim kurumlarıyla işbirliği:** BDT, şema ve EMDR eğitimi veren enstitüler, öğrencilerine indirim karşılığında tanıtım yapabilir.
5. **Ücretsiz webinar:** "Yapay zekâyı seans notlarında etik ve güvenli kullanmak." Güven oluşturur, kayıt getirir.
6. **Referans:** "Bir meslektaşını getir, ikiniz de 1 ay ücretsiz kullanın."

## 11. Takvim

Tam zamanlı çalışılacağı varsayıldı. Yarı zamanlı çalışılırsa süreler 2–3 katına çıkar.

| Hafta | İş |
|---|---|
| **1** | Kayıt sayfasını yayına al, paylaşmaya başla. Proje iskeleti, ses-metin servislerinin karşılaştırması |
| **2–3** | Test sürümü: yükleme, çeviri, not üretimi, düzenleme |
| **3–4** | Canlandırma seanslarıyla 5–10 psikologla test. Avukat görüşmesi |
| **5–6** | Güvenli beta: şifreleme, ses silme, onay metinleri, gerçek seanslarla kullanım |
| **7–8** | Kullanıcı geri bildirimiyle şablon iyileştirme. "Ücretli devam eder misiniz?" sorusu |
| **9–10** | Şahıs şirketi, iyzico, ilk ödemeler |

## 12. Başlangıç bütçesi

| Kalem | Tahmini maliyet |
|---|---|
| Alan adı | Yıllık birkaç yüz TL |
| Supabase, Vercel | Başta ücretsiz plan, sonra aylık yaklaşık 25 $ |
| Ses-metin ve yapay zekâ API'leri | Kullanıma göre. Betada düşük |
| KVKK avukatı | Tek seferlik. **En büyük kalem, ama atlanmamalı** |
| Muhasebeci | Şirket açıldıktan sonra aylık |
| Apple ve Google geliştirici hesabı | Şimdilik gerekmiyor (web uygulaması) |

## 13. Riskler

| Risk | Önlem |
|---|---|
| DoktorTakvimi'nin Noa'yı psikologlara açması | Hızlı hareket etmek, psikolojiye özel derinlik, toplulukta güvenilir bir isim olmak |
| Türkçe ses-metin çevirisinin kalitesinin düşük olması | İlk hafta servisleri gerçek Türkçe kayıtla test etmek. Kalite yetmezse fikri durdurmak |
| Psikologların güvenmemesi | Ses saklamama, şeffaf gizlilik politikası, avukat onaylı metinler |
| KVKK ihlali | Avukat, veri işleme sözleşmesi, şifreleme, en az veri tutma |
| Para ödememeleri | Şirket kurmadan önce "ücretli devam eder misiniz?" testi |
| Alanın sıradanlaşması | Zamanla notun ötesine geçip danışan dosyası, ilerleme takibi ve randevu ile psikoloğun tüm işini yöneten bir araca dönüşmek |

## 14. Başarı ölçütleri

| Aşama | Hedef |
|---|---|
| Kayıt sayfası (2 hafta) | 20 başvuru |
| Test sürümü | 10 aktif deneyici. Notları "az düzeltmeyle kullanılabilir" bulanların oranı |
| Beta (1 ay) | Kullanıcıların haftada en az 3 seans notu üretmesi |
| Ücretli sürüm | Beta kullanıcılarının en az %30'unun ödemeye geçmesi |
| 6. ay | 50–100 ödeyen psikolog |

## 15. İlk 7 günün yapılacakları

1. Bir proje adı bul, alan adını al.
2. Kayıt sayfasını yayına al.
3. LinkedIn'de ilk paylaşımı yap, 3–5 psikolog grubuna katıl.
4. GitHub deposunu aç. Next.js ve Supabase iskeletini kur.
5. 2–3 ses-metin servisini Türkçe canlandırma kaydıyla test et.
6. KVKK avukatıyla görüşme tarihi al.
7. Tanıdığın en az 3 psikologla 15 dakikalık telefon görüşmesi yap. Problem gerçekten var mı, kendi ağızlarından duy.

> Bunlar genel bilgi. Vergi ve KVKK konularında son kararı muhasebeci ve avukat vermeli.
