import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";
import { site } from "@/lib/site";

const steps = [
  {
    title: "Danışanınızdan onay alın",
    body: "Seans kaydı için hazır bir onay formu şablonu veriyoruz. Yazdırın ya da online imzalatın.",
  },
  {
    title: "Kaydı yükleyin",
    body: "Zoom veya Meet kaydını ya da telefonla aldığınız ses kaydını yükleyin. Sistem sizin sesinizi danışanınkinden ayırır.",
  },
  {
    title: "Taslağı inceleyin",
    body: "Birkaç dakika içinde, seçtiğiniz şablona göre düzenlenmiş bir not taslağı hazır olur. İstediğiniz yeri düzeltin.",
  },
  {
    title: "Dosyaya kaydedin",
    body: "Onayladığınız not danışanın dosyasına girer. Bir sonraki seanstan önce önceki notların özeti elinizin altında olur.",
  },
];

const privacy = [
  {
    title: "Ses kaydı saklanmaz",
    body: "Ses dosyası metne çevrildikten hemen sonra silinir. Sadece metin ve onayladığınız not kalır.",
  },
  {
    title: "Yapay zekâ eğitiminde kullanılmaz",
    body: "Seans içerikleri hiçbir modelin eğitiminde kullanılmaz. Bunu kullandığımız servislerle sözleşmeyle güvenceye alıyoruz.",
  },
  {
    title: "Notları yalnızca siz görürsünüz",
    body: "Notlar şifreli saklanır, her erişim kayıt altına alınır. İstediğiniz an tüm verinizi kalıcı olarak silebilirsiniz.",
  },
  {
    title: "Teşhis koymaz, tedavi önermez",
    body: "Psikonot yalnızca belgeleme yapar: seansta sizin söylediklerinizi ve yaptıklarınızı not eder. Klinik karar her zaman sizindir.",
  },
];

const faqs = [
  {
    q: "Beta ücretli mi?",
    a: "Hayır. Beta süresince ücretsiz. Karşılığında notların ne kadar işinize yaradığını bize anlatmanızı rica ediyoruz.",
  },
  {
    q: "Hangi kayıtlarla çalışıyor?",
    a: "Zoom ve Google Meet kayıt dosyaları ile telefonunuzun ses kayıt uygulamasından alınan dosyalar. Tarayıcıdan doğrudan kayıt da yolda.",
  },
  {
    q: "Danışanımın onayı gerekiyor mu?",
    a: "Evet. Seans kaydı ve sağlık verisinin işlenmesi için danışanınızın açık rızası gerekir. Bunun için hazır bir onay formu şablonu sunacağız.",
  },
  {
    q: "Hangi terapi yaklaşımlarını destekliyor?",
    a: "Genel bir seans notu şablonuyla başlıyoruz. BDT, şema terapi, EMDR ve aile terapisi şablonlarını beta kullanıcılarımızın geri bildirimiyle birlikte hazırlıyoruz.",
  },
  {
    q: "Verilerim nerede tutulacak?",
    a: "Veritabanımız Avrupa Birliği bölgesinde. Ses-metin ve yapay zekâ servislerini verileri saklamayan ve eğitimde kullanmayan sözleşmelerle seçiyoruz. Tüm ayrıntıları beta açılmadan önce yayımlayacağımız aydınlatma metninde ve veri işleme sözleşmesinde bulacaksınız.",
  },
];

function SampleNote() {
  return (
    <figure
      aria-label="Örnek seans notu taslağı"
      className="rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] sm:p-6"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <p className="text-sm font-semibold text-ink">Seans 4 · Danışan A.K.</p>
          <p className="text-xs text-muted">BDT şablonu · 50 dk</p>
        </div>
        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
          Taslak
        </span>
      </div>
      <dl className="space-y-4 pt-4 text-sm">
        <div>
          <dt className="font-semibold text-ink">Getirilen konu</dt>
          <dd className="mt-1 leading-relaxed text-muted">
            Önümüzdeki hafta yapacağı iş sunumu öncesinde yoğun kaygı ve uykuya dalmakta güçlük.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Uygulanan teknikler</dt>
          <dd className="mt-1 leading-relaxed text-muted">
            Otomatik düşünce kaydı, bilişsel yeniden yapılandırma.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Ev ödevi</dt>
          <dd className="mt-1 leading-relaxed text-muted">
            Hafta boyunca kaygının yükseldiği üç durum için düşünce kaydı tutmak.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Sonraki seans</dt>
          <dd className="mt-1 leading-relaxed text-muted">
            Kayıtların gözden geçirilmesi, maruz bırakma basamaklarının hazırlanması.
          </dd>
        </div>
      </dl>
      <figcaption className="mt-5 border-t border-line pt-4 text-xs text-muted">
        Örnek gösterimdir. Not, siz onaylayana kadar taslak olarak kalır.
      </figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-serif text-xl font-semibold tracking-tight text-ink">
            {site.name}
          </Link>
          <a
            href="#beta"
            className="rounded-lg border border-line px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Betaya katıl
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Giriş */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-accent">
              Beta için ücretsiz katılımcı arıyoruz
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] font-semibold tracking-tight text-ink sm:text-5xl">
              Seans notunuz, seans biter bitmez hazır.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {site.name}, seans kaydınızı Türkçe metne çevirir ve seçtiğiniz şablona göre düzenli
              bir not taslağı hazırlar. Siz kontrol eder, düzeltir ve danışanın dosyasına
              kaydedersiniz.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#beta"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
              >
                Betaya ücretsiz katıl
              </a>
              <a
                href="#nasil-calisir"
                className="inline-flex items-center justify-center rounded-lg border border-line px-5 py-3 font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Nasıl çalıştığını gör
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">
              Psikologlar, psikolojik danışmanlar ve aile danışmanları için.
            </p>
          </div>
          <SampleNote />
        </section>

        {/* Problem */}
        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
              Her seanstan sonra 10–20 dakika not mu yazıyorsunuz?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Haftada 20 seansla bu, notlara giden 3 ila 6 saat demek. Bu zamanı bir sonraki
              danışanınıza hazırlanmaya, süpervizyona ya da kendinize ayırabilirsiniz.
            </p>
          </div>
        </section>

        {/* Nasıl çalışır */}
        <section id="nasil-calisir" className="mx-auto max-w-6xl scroll-mt-8 px-4 py-20 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
            Nasıl çalışır?
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="flex size-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Gizlilik */}
        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
                Gizlilik baştan tasarlandı
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Danışanlarınızın size anlattıkları en hassas veridir. Ürünü bu sorumluluğu
                merkeze alarak kuruyoruz.
              </p>
            </div>
            <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {privacy.map((item) => (
                <li key={item.title} className="border-l-2 border-accent pl-5">
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Beta formu */}
        <section id="beta" className="mx-auto max-w-6xl scroll-mt-8 px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
                Betaya katılın
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                İlk kullanıcılarımızla birlikte geliştiriyoruz. Beta süresince ücretsiz.
              </p>
              <ul className="mt-6 space-y-3 text-muted">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  Not şablonları sizin çalışma biçiminize göre şekillenir.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  Önce canlandırma seanslarıyla deneriz, gerçek seanslara güvenlik adımları
                  tamamlandıktan sonra geçeriz.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  Tanıtım e-postası göndermeyiz. Size yalnızca beta hakkında yazarız.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5 sm:p-8">
              <WaitlistForm />
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink">
              Sık sorulan sorular
            </h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="text-xl leading-none font-normal text-muted transition-transform group-open:rotate-45 motion-reduce:transition-none"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © 2026 {site.name}
          </p>
          <div className="flex gap-5">
            <Link href="/aydinlatma-metni" className="hover:text-ink">
              Aydınlatma metni
            </Link>
            <a href={`mailto:${site.contactEmail}`} className="hover:text-ink">
              {site.contactEmail}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
