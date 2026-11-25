import Link from "next/link";
import { HeroDemo } from "@/components/hero-demo";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { WaitlistForm } from "@/components/waitlist-form";
import { site } from "@/lib/site";

const stats = [
  { value: "10–20 dk", label: "Bir seans notunu elle yazmanın aldığı süre" },
  { value: "3–6 saat", label: "Haftada 20 seans yapan bir psikoloğun nota ayırdığı zaman" },
  { value: "~2 dk", label: "Psikonot'un bir not taslağını hazırlama hedefi" },
];

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

const icons = {
  micOff: (
    <>
      <line x1="2" x2="22" y1="2" y2="22" />
      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
      <path d="M5 10v2a7 7 0 0 0 12 5" />
      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </>
  ),
  shield: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  lock: (
    <>
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  file: (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </>
  ),
};

const privacy = [
  {
    icon: icons.micOff,
    title: "Ses kaydı saklanmaz",
    body: "Ses dosyası metne çevrildikten hemen sonra silinir. Sadece metin ve onayladığınız not kalır.",
  },
  {
    icon: icons.shield,
    title: "Yapay zekâ eğitiminde kullanılmaz",
    body: "Seans içerikleri hiçbir modelin eğitiminde kullanılmaz. Bunu kullandığımız servislerle sözleşmeyle güvenceye alıyoruz.",
  },
  {
    icon: icons.lock,
    title: "Notları yalnızca siz görürsünüz",
    body: "Notlar şifreli saklanır, her erişim kayıt altına alınır. İstediğiniz an tüm verinizi kalıcı olarak silebilirsiniz.",
  },
  {
    icon: icons.file,
    title: "Teşhis koymaz, tedavi önermez",
    body: "Psikonot yalnızca belgeleme yapar: seansta sizin söylediklerinizi ve yaptıklarınızı not eder. Klinik karar her zaman sizindir.",
  },
];

const templates = ["Genel seans notu", "BDT", "Şema terapi", "EMDR", "Aile terapisi"];

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

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold tracking-wide text-accent">{children}</p>;
}

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-ink " +
  "shadow-[0_8px_20px_-8px_rgba(31,95,91,0.55)] transition-[background-color,transform,box-shadow] duration-200 " +
  "hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0 active:scale-[0.98] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Home() {
  return (
    <>
      {/* Arka plan ışıltısı: yalnızca dekor, yavaşça süzülür. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px] overflow-hidden">
        <div className="absolute -top-40 -left-32 size-[520px] animate-drift rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute top-20 -right-40 size-[460px] animate-drift-slow rounded-full bg-[#d9b98a]/20 blur-3xl dark:bg-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--line)_1px,transparent_0)] [mask-image:linear-gradient(to_bottom,black,transparent)] bg-[size:28px_28px] opacity-60" />
      </div>

      <SiteHeader />

      <main className="flex-1">
        {/* Giriş */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-20 sm:px-6 md:pt-20 md:pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-sm font-medium text-ink">
              <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-accent" />
              Beta için ücretsiz katılımcı arıyoruz
            </p>
            <h1
              className="mt-6 animate-fade-up font-serif text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-ink sm:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Seans notunuz,{" "}
              <span className="relative whitespace-nowrap text-accent">
                seans biter bitmez
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-accent/40"
                >
                  <path
                    d="M2 9 C 60 3, 140 2, 298 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    pathLength={1}
                    className="[stroke-dasharray:1] [stroke-dashoffset:1] animate-draw"
                  />
                </svg>
              </span>{" "}
              hazır.
            </h1>
            <p
              className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-muted"
              style={{ animationDelay: "160ms" }}
            >
              {site.name}, seans kaydınızı Türkçe metne çevirir ve seçtiğiniz şablona göre düzenli
              bir not taslağı hazırlar. Siz kontrol eder, düzeltir ve danışanın dosyasına
              kaydedersiniz.
            </p>
            <div
              className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <a href="#beta" className={primaryBtn}>
                Betaya ücretsiz katıl
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                href="#nasil-calisir"
                className="inline-flex items-center justify-center rounded-xl border border-line bg-surface/70 px-6 py-3.5 font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                Nasıl çalıştığını gör
              </a>
            </div>
            <ul
              className="mt-8 flex animate-fade-up flex-wrap gap-x-5 gap-y-2 text-sm text-muted"
              style={{ animationDelay: "320ms" }}
            >
              {["Ses dosyası saklanmaz", "Türkçe ve konuşmacı ayrımlı", "Teşhis koymaz"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="size-4 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <HeroDemo />
          </div>
        </section>

        {/* Problem ve rakamlar */}
        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Her seanstan sonra 10–20 dakika not mu yazıyorsunuz?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Bu zamanı bir sonraki danışanınıza hazırlanmaya, süpervizyona ya da kendinize
                ayırabilirsiniz.
              </p>
            </Reveal>
            <dl className="mt-14 grid gap-4 sm:grid-cols-3">
              {stats.map((s, i) => (
                <Reveal key={s.value} delay={i * 120}>
                  <div className="h-full rounded-2xl border border-line bg-background p-6 text-center">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-serif text-4xl font-semibold tracking-tight text-accent">
                      {s.value}
                    </dd>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">{s.label}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* Nasıl çalışır */}
        <section id="nasil-calisir" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
          <Reveal>
            <SectionLabel>Nasıl çalışır</SectionLabel>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Kayıttan onaylı nota dört adım
            </h2>
          </Reveal>
          <Reveal className="relative mt-14">
            <div aria-hidden="true" className="absolute top-5 right-[12.5%] left-[12.5%] hidden h-px bg-line lg:block">
              <div className="reveal-line h-full bg-accent" />
            </div>
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {steps.map((step, i) => (
                <li key={step.title} className="relative lg:text-center">
                  <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-line bg-background font-serif text-lg font-semibold text-accent lg:mx-auto">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="mt-16 flex flex-wrap items-center gap-2" delay={150}>
            <span className="mr-2 text-sm text-muted">Şablonlar:</span>
            {templates.map((t, i) => (
              <span
                key={t}
                className={`rounded-full border px-3 py-1 text-sm ${
                  i === 0 ? "border-accent bg-accent-soft text-accent" : "border-line text-muted"
                }`}
              >
                {t}
                {i > 0 && <span className="ml-1 text-xs opacity-70">· betada</span>}
              </span>
            ))}
          </Reveal>
        </section>

        {/* Gizlilik */}
        <section id="gizlilik" className="scroll-mt-16 bg-[#16302d] text-[#e7efed] dark:bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-[#8fd0c5]">Gizlilik</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Danışanınızın sırrı, sizin sırrınız
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#b5c8c4]">
                Danışanlarınızın size anlattıkları en hassas veridir. Ürünü bu sorumluluğu merkeze
                alarak kuruyoruz.
              </p>
            </Reveal>
            <ul className="mt-14 grid gap-4 sm:grid-cols-2">
              {privacy.map((item, i) => (
                <li key={item.title}>
                  <Reveal delay={(i % 2) * 120} className="h-full">
                    <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-[#8fd0c5]/40 hover:bg-white/[0.07]">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-[#8fd0c5]/15 text-[#8fd0c5] transition-transform duration-300 group-hover:scale-110">
                        <Icon>{item.icon}</Icon>
                      </span>
                      <h3 className="mt-5 font-semibold">{item.title}</h3>
                      <p className="mt-2 leading-relaxed text-[#b5c8c4]">{item.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Beta formu */}
        <section id="beta" className="relative scroll-mt-16 overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -bottom-40 size-[520px] animate-drift rounded-full bg-accent/10 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
              <Reveal>
                <SectionLabel>Beta programı</SectionLabel>
                <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  İlk kullanıcılarımızdan biri olun
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  Ürünü psikologlarla birlikte geliştiriyoruz. Beta süresince ücretsiz.
                </p>
                <ul className="mt-8 space-y-4 text-muted">
                  {[
                    "Not şablonları sizin çalışma biçiminize göre şekillenir.",
                    "Önce canlandırma seanslarıyla deneriz, gerçek seanslara güvenlik adımları tamamlandıktan sonra geçeriz.",
                    "Tanıtım e-postası göndermeyiz. Size yalnızca beta hakkında yazarız.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                        <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5 9-10" />
                        </svg>
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={120}>
                <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-28px_rgba(20,60,55,0.3)] sm:p-8">
                  <WaitlistForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
            <Reveal>
              <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Sık sorulan sorular
              </h2>
            </Reveal>
            <Reveal className="mt-10 space-y-3" delay={100}>
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-line bg-surface px-5 transition-colors duration-200 open:border-accent/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-300 group-open:rotate-45"
                    >
                      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 {site.name}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/aydinlatma-metni" className="transition-colors hover:text-ink">
              Aydınlatma metni
            </Link>
            <a href={`mailto:${site.contactEmail}`} className="transition-colors hover:text-ink">
              {site.contactEmail}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
