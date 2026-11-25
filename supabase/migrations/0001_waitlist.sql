-- Kayıt sayfası (bekleme listesi) başvuruları.
-- Bu tabloda sağlık verisi YOK; yalnızca başvuranın iletişim ve meslek bilgisi var.

create table if not exists public.waitlist (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  full_name         text not null check (char_length(full_name) between 2 and 120),
  email             text not null check (char_length(email) <= 254),
  profession        text not null,
  work_mode         text,
  weekly_sessions   text,
  weekly_note_hours text,
  -- KVKK: hangi metin sürümüne, ne zaman onay verildiğini saklıyoruz.
  consent_contact   boolean not null check (consent_contact = true),
  consent_version   text not null,
  consent_at        timestamptz not null default now(),
  source            text
);

-- Aynı e-posta iki kez kaydolmasın (büyük/küçük harf duyarsız).
create unique index if not exists waitlist_email_unique on public.waitlist (lower(email));

-- RLS açık ve hiçbir politika yok: tarayıcıdan (anon/authenticated) okuma ya da yazma
-- yapılamaz. Kayıtları yalnızca sunucudaki service role anahtarı ekleyebilir.
alter table public.waitlist enable row level security;
