"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import {
  professions,
  weeklyNoteHours,
  weeklySessions,
  workModes,
} from "@/lib/waitlist-options";

const initialState: WaitlistState = { status: "idle" };

const inputClass =
  "block w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-base text-ink " +
  "outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 " +
  "aria-[invalid=true]:border-danger";

const labelClass = "mb-1.5 block text-sm font-medium text-ink";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-danger">
      {message}
    </p>
  );
}

function Select({
  name,
  label,
  options,
  defaultValue,
  required,
  error,
  hint,
}: {
  name: string;
  label: string;
  options: readonly string[];
  defaultValue?: string;
  required?: boolean;
  error?: string;
  hint?: string;
}) {
  const id = `wl-${name}`;
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {!required && <span className="font-normal text-muted"> (isteğe bağlı)</span>}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%2356666b' stroke-width='1.6'%3E%3Cpath d='m2.5 4.5 3.5 3.5 3.5-3.5'/%3E%3C/svg%3E")] bg-[length:12px] bg-[position:right_0.9rem_center] bg-no-repeat pr-9`}
      >
        <option value="" disabled>
          {hint ?? "Seçin"}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);
  const sourceRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorSummaryRef = useRef<HTMLParagraphElement>(null);

  // Paylaşım linklerine ?ref=linkedin gibi bir etiket eklenirse başvurunun
  // hangi kanaldan geldiğini görebilmek için saklıyoruz.
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref && sourceRef.current) sourceRef.current.value = ref.slice(0, 100);
  }, [state]);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error") errorSummaryRef.current?.focus();
  }, [state]);

  // React, form action bitince alanları sıfırlar. Hata durumunda kullanıcının
  // yazdıkları kaybolmasın diye gönderimi kendimiz yapıyoruz. JavaScript
  // kapalıysa form yine action ile normal şekilde gönderilir.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  }

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="animate-fade-up rounded-xl border border-line bg-success-soft p-6 outline-none"
      >
        <h3 className="font-serif text-xl font-semibold text-ink">
          {state.alreadyRegistered ? "Zaten listedesiniz." : "Başvurunuz alındı. Teşekkürler!"}
        </h3>
        <p className="mt-2 text-muted">
          {state.alreadyRegistered
            ? "Bu e-posta adresiyle daha önce başvurmuşsunuz. Beta açıldığında size yazacağız."
            : "Beta açıldığında size e-posta ile yazacağız. Bu sırada birkaç psikologla kısa görüşmeler yapıyoruz; uygun olursanız sizi de arayabiliriz."}
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};
  const values = state.status === "error" ? state.values ?? {} : {};

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate className="space-y-5">
      {state.status === "error" && (
        <p
          key={JSON.stringify(state)}
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="animate-fade-up rounded-lg border border-danger/40 px-4 py-3 text-sm text-danger outline-none"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="wl-fullName" className={labelClass}>
            Ad soyad
          </label>
          <input
            id="wl-fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            defaultValue={values.fullName}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? "wl-fullName-error" : undefined}
            className={inputClass}
          />
          <FieldError id="wl-fullName-error" message={errors.fullName} />
        </div>
        <div>
          <label htmlFor="wl-email" className={labelClass}>
            E-posta
          </label>
          <input
            id="wl-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "wl-email-error" : undefined}
            className={inputClass}
          />
          <FieldError id="wl-email-error" message={errors.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          name="profession"
          label="Mesleğiniz"
          options={professions}
          defaultValue={values.profession}
          required
          error={errors.profession}
        />
        <Select
          name="workMode"
          label="Nasıl çalışıyorsunuz?"
          options={workModes}
          defaultValue={values.workMode}
        />
        <Select
          name="weeklySessions"
          label="Haftada kaç seans yapıyorsunuz?"
          options={weeklySessions}
          defaultValue={values.weeklySessions}
        />
        <Select
          name="weeklyNoteHours"
          label="Seans notlarına haftada ne kadar zaman ayırıyorsunuz?"
          options={weeklyNoteHours}
          defaultValue={values.weeklyNoteHours}
        />
      </div>

      {/* Bot tuzağı: ekran okuyuculardan ve gözden gizli. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="wl-website">Web siteniz</label>
        <input id="wl-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={sourceRef} type="hidden" name="source" />

      <div>
        <div className="flex items-start gap-3">
          <input
            id="wl-consent"
            name="consent"
            type="checkbox"
            required
            defaultChecked={values.consent === "on"}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "wl-consent-error" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-accent"
          />
          <label htmlFor="wl-consent" className="text-sm leading-relaxed text-muted">
            Beta programı hakkında benimle e-posta ile iletişime geçilmesine onay veriyorum.{" "}
            <Link
              href="/aydinlatma-metni"
              className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
            >
              Aydınlatma metnini
            </Link>{" "}
            okudum. Onayımı istediğim zaman geri alabilirim.
          </label>
        </div>
        <FieldError id="wl-consent-error" message={errors.consent} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-accent-ink transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Gönderiliyor…" : "Betaya katıl"}
      </button>
    </form>
  );
}
