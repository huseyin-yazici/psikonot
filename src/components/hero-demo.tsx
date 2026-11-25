"use client";

import { useEffect, useState } from "react";

// Ürünün akışını gösteren döngülü demo:
// 0 kayıt yükleniyor → 1 metne çevriliyor → 2 not hazırlanıyor → 3 taslak hazır
const STAGE_MS = [2600, 4200, 3000, 4200];

const statusLabels = ["Kayıt yükleniyor", "Metne çevriliyor", "Not hazırlanıyor", "Taslak hazır"];

const transcript = [
  { who: "Danışan", text: "Sunum yaklaştıkça geceleri uyuyamıyorum, aklım hep orada." },
  { who: "Terapist", text: "O anda aklınızdan geçen düşünceyi birlikte yazalım mı?" },
  { who: "Danışan", text: "“Kesin rezil olacağım” diye düşünüyorum." },
  { who: "Terapist", text: "Bu hafta bu düşünceleri bir kayıt formunda takip edelim." },
];

const noteSections = [
  {
    title: "Getirilen konu",
    body: "Yaklaşan iş sunumu öncesinde yoğun kaygı ve uykuya dalmakta güçlük.",
  },
  { title: "Uygulanan teknikler", body: "Otomatik düşünce kaydı, bilişsel yeniden yapılandırma." },
  { title: "Ev ödevi", body: "Kaygının yükseldiği üç durum için düşünce kaydı tutmak." },
  { title: "Sonraki seans", body: "Kayıtların gözden geçirilmesi, maruz bırakma basamakları." },
];

// Sunucu ve tarayıcıda aynı sonucu veren sabit dalga yükseklikleri.
const bars = Array.from({ length: 36 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 1.7) * 0.6 + Math.sin(i * 0.45) * 0.4);
  return Math.round((0.3 + v * 0.7) * 100) / 100;
});

function StatusPill({ stage }: { stage: number }) {
  const done = stage === 3;
  return (
    <span
      key={stage}
      className={`inline-flex animate-fade-in items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        done ? "bg-accent text-accent-ink" : "bg-accent-soft text-accent"
      }`}
    >
      {done ? (
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 12 5 5 9-10" />
        </svg>
      ) : (
        <span aria-hidden="true" className="size-1.5 animate-pulse-dot rounded-full bg-current" />
      )}
      {statusLabels[stage]}
    </span>
  );
}

function Upload() {
  return (
    <div key="upload" className="flex h-full animate-fade-in flex-col justify-center">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">seans-4.m4a</p>
          <p className="text-xs text-muted">48:12 · 44 MB</p>
        </div>
      </div>
      <div className="mt-8 flex h-20 items-center justify-between gap-[3px]" aria-hidden="true">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-full origin-center animate-wave rounded-full bg-accent/70"
            style={{ height: `${h * 100}%`, animationDelay: `${(i % 12) * -90}ms` }}
          />
        ))}
      </div>
      <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-line">
        <div className="h-full origin-left animate-grow rounded-full bg-accent" />
      </div>
      <p className="mt-3 text-xs text-muted">Şifreli bağlantıyla yükleniyor…</p>
    </div>
  );
}

function Transcript() {
  return (
    <ul key="transcript" className="space-y-3">
      {transcript.map((line, i) => (
        <li
          key={i}
          className="flex animate-fade-up gap-3 text-sm"
          style={{ animationDelay: `${i * 850}ms` }}
        >
          <span
            className={`mt-0.5 h-fit shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${
              line.who === "Terapist" ? "bg-accent text-accent-ink" : "bg-line text-ink"
            }`}
          >
            {line.who === "Terapist" ? "T" : "D"}
          </span>
          <p className="leading-relaxed text-muted">{line.text}</p>
        </li>
      ))}
    </ul>
  );
}

function Note({ animate }: { animate: boolean }) {
  return (
    <dl key="note" className="space-y-3.5 text-sm">
      {noteSections.map((s, i) => (
        <div
          key={s.title}
          className={animate ? "animate-fade-up" : undefined}
          style={animate ? { animationDelay: `${i * 550}ms` } : undefined}
        >
          <dt className="font-semibold text-ink">{s.title}</dt>
          <dd className="mt-0.5 leading-relaxed text-muted">{s.body}</dd>
        </div>
      ))}
    </dl>
  );
}

export function HeroDemo() {
  const [stage, setStage] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setStage((s) => (s + 1) % 4), STAGE_MS[stage]);
    return () => clearTimeout(t);
  }, [stage, reduced]);

  const shown = reduced ? 3 : stage;

  return (
    <figure
      aria-label="Örnek: seans kaydından not taslağına"
      className="relative rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-24px_rgba(20,60,55,0.25)] sm:p-6"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <p className="text-sm font-semibold text-ink">Seans 4 · Danışan A.K.</p>
          <p className="text-xs text-muted">BDT şablonu · 50 dk</p>
        </div>
        <StatusPill stage={shown} />
      </div>

      {/* Adım göstergesi */}
      <ol className="mt-4 grid grid-cols-4 gap-1.5" aria-hidden="true">
        {statusLabels.map((label, i) => (
          <li key={label} className="h-1 overflow-hidden rounded-full bg-line">
            <span
              className={`block h-full rounded-full bg-accent transition-transform duration-500 ease-out ${
                i <= shown ? "scale-x-100" : "scale-x-0"
              } origin-left`}
            />
          </li>
        ))}
      </ol>

      <div className="relative mt-5 h-[300px] overflow-hidden sm:h-[268px]">
        {shown === 0 && <Upload />}
        {shown === 1 && <Transcript />}
        {(shown === 2 || shown === 3) && <Note animate={shown === 2 && !reduced} />}
      </div>

      <figcaption className="flex min-h-5 items-center justify-between gap-3 border-t border-line pt-4 text-xs text-muted">
        <span>Örnek gösterimdir. Not, siz onaylayana kadar taslaktır.</span>
        {shown === 3 && (
          <span className="hidden shrink-0 animate-fade-in items-center gap-1 font-medium text-accent sm:inline-flex">
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
            </svg>
            Ses dosyası silindi
          </span>
        )}
      </figcaption>
    </figure>
  );
}
