"use server";

import { CONSENT_VERSION } from "@/lib/site";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import {
  professions,
  weeklyNoteHours,
  weeklySessions,
  workModes,
} from "@/lib/waitlist-options";

export type WaitlistField = "fullName" | "email" | "profession" | "consent";

export type WaitlistState =
  | { status: "idle" }
  | { status: "success"; alreadyRegistered: boolean }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<WaitlistField, string>>;
      values?: Record<string, string>;
    };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function oneOf<T extends readonly string[]>(list: T, value: string): T[number] | null {
  return (list as readonly string[]).includes(value) ? (value as T[number]) : null;
}

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  // Bot tuzağı: gerçek kullanıcılar bu gizli alanı hiç görmez.
  if (text(formData, "website")) {
    return { status: "success", alreadyRegistered: false };
  }

  const fullName = text(formData, "fullName");
  const email = text(formData, "email").toLowerCase();
  const profession = oneOf(professions, text(formData, "profession"));
  const workMode = oneOf(workModes, text(formData, "workMode"));
  const sessions = oneOf(weeklySessions, text(formData, "weeklySessions"));
  const noteHours = oneOf(weeklyNoteHours, text(formData, "weeklyNoteHours"));
  const consent = formData.get("consent") === "on";
  const source = text(formData, "source").slice(0, 100) || null;

  const fieldErrors: Partial<Record<WaitlistField, string>> = {};
  if (fullName.length < 2 || fullName.length > 120) {
    fieldErrors.fullName = "Adınızı ve soyadınızı yazın.";
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    fieldErrors.email = "Geçerli bir e-posta adresi yazın, ör. ad@ornek.com.";
  }
  if (!profession) {
    fieldErrors.profession = "Mesleğinizi seçin.";
  }
  if (!consent) {
    fieldErrors.consent = "Size beta hakkında yazabilmemiz için bu onay gerekli.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Formda düzeltilmesi gereken alanlar var.",
      fieldErrors,
      values: {
        fullName,
        email,
        profession: profession ?? "",
        workMode: workMode ?? "",
        weeklySessions: sessions ?? "",
        weeklyNoteHours: noteHours ?? "",
        consent: consent ? "on" : "",
      },
    };
  }

  const record = {
    full_name: fullName,
    email,
    profession,
    work_mode: workMode,
    weekly_sessions: sessions,
    weekly_note_hours: noteHours,
    consent_contact: true,
    consent_version: CONSENT_VERSION,
    source,
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    if (process.env.NODE_ENV !== "production") {
      // Yerel geliştirmede Supabase ayarlı değilse kaydı sadece konsola yaz.
      console.info("[waitlist] Supabase ayarlı değil, kayıt yazılmadı:", record);
      return { status: "success", alreadyRegistered: false };
    }
    console.error("[waitlist] SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY eksik.");
    return {
      status: "error",
      message: "Başvurunuzu şu an kaydedemedik. Birkaç dakika sonra tekrar deneyin.",
    };
  }

  const { error } = await supabase.from("waitlist").insert(record);
  if (error) {
    // 23505: benzersizlik ihlali, yani bu e-posta zaten listede.
    if (error.code === "23505") {
      return { status: "success", alreadyRegistered: true };
    }
    console.error("[waitlist] Kayıt hatası:", error.code, error.message);
    return {
      status: "error",
      message: "Başvurunuzu şu an kaydedemedik. Birkaç dakika sonra tekrar deneyin.",
    };
  }

  return { status: "success", alreadyRegistered: false };
}
