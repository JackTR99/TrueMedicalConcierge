-- ============================================================================
-- True Medical Concierge — Initial Database Schema
-- Run this in Supabase → SQL Editor → New query → Run.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ============================================================================
-- Helpers
-- ============================================================================

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- profiles — augments auth.users
-- ============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'patient' check (role in ('patient','staff','admin')),
  full_name text,
  phone text,
  preferred_language text default 'en',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

-- Role helper, SECURITY DEFINER to avoid recursive RLS lookups
create or replace function public.current_user_role()
returns text language sql stable security definer
set search_path = public as $$
  select role from public.profiles where id = auth.uid();
$$;

drop policy if exists "profiles_select_self_or_staff" on public.profiles;
create policy "profiles_select_self_or_staff" on public.profiles
  for select using (
    id = auth.uid()
    or public.current_user_role() in ('staff','admin')
  );

drop policy if exists "profiles_update_self_or_staff" on public.profiles;
create policy "profiles_update_self_or_staff" on public.profiles
  for update using (
    id = auth.uid()
    or public.current_user_role() in ('staff','admin')
  );

drop policy if exists "profiles_insert_self_or_staff" on public.profiles;
create policy "profiles_insert_self_or_staff" on public.profiles
  for insert with check (
    id = auth.uid()
    or public.current_user_role() in ('staff','admin')
  );

-- ============================================================================
-- doctors
-- ============================================================================

create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  title text,
  specialty text,
  languages text[],
  bio text,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.doctors enable row level security;

drop policy if exists "doctors_select_authed" on public.doctors;
create policy "doctors_select_authed" on public.doctors
  for select using (auth.role() = 'authenticated');

drop policy if exists "doctors_staff_write" on public.doctors;
create policy "doctors_staff_write" on public.doctors
  for all using (public.current_user_role() in ('staff','admin'));

-- ============================================================================
-- clinics
-- ============================================================================

create table if not exists public.clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text,
  address text,
  specialties text[],
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.clinics enable row level security;

drop policy if exists "clinics_select_authed" on public.clinics;
create policy "clinics_select_authed" on public.clinics
  for select using (auth.role() = 'authenticated');

drop policy if exists "clinics_staff_write" on public.clinics;
create policy "clinics_staff_write" on public.clinics
  for all using (public.current_user_role() in ('staff','admin'));

create table if not exists public.doctor_clinics (
  doctor_id uuid references public.doctors(id) on delete cascade,
  clinic_id uuid references public.clinics(id) on delete cascade,
  primary key (doctor_id, clinic_id)
);

alter table public.doctor_clinics enable row level security;

drop policy if exists "doctor_clinics_select_authed" on public.doctor_clinics;
create policy "doctor_clinics_select_authed" on public.doctor_clinics
  for select using (auth.role() = 'authenticated');

drop policy if exists "doctor_clinics_staff_write" on public.doctor_clinics;
create policy "doctor_clinics_staff_write" on public.doctor_clinics
  for all using (public.current_user_role() in ('staff','admin'));

-- ============================================================================
-- patients — file number generator + table
-- ============================================================================

create or replace function public.next_patient_file_no()
returns text language plpgsql as $$
declare
  yr text := to_char(now(), 'YYYY');
  next_seq int;
begin
  select coalesce(max(
    nullif(regexp_replace(file_no, '^TMC-' || yr || '-', ''), '')::int
  ), 0) + 1
  into next_seq
  from public.patients
  where file_no like 'TMC-' || yr || '-%';

  return 'TMC-' || yr || '-' || lpad(next_seq::text, 4, '0');
end;
$$;

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  file_no text unique not null default public.next_patient_file_no(),
  date_of_birth date,
  gender text,
  blood_type text,
  height_cm int,
  weight_kg numeric,
  nationality text,
  passport_no text,
  insurance_provider text,
  status text not null default 'inquiry'
    check (status in ('inquiry','active','in_treatment','completed','archived')),
  assigned_concierge uuid references public.profiles(id),
  notes_internal text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists patients_set_updated_at on public.patients;
create trigger patients_set_updated_at before update on public.patients
  for each row execute function public.set_updated_at();

alter table public.patients enable row level security;

drop policy if exists "patients_self_or_staff_read" on public.patients;
create policy "patients_self_or_staff_read" on public.patients
  for select using (
    profile_id = auth.uid()
    or public.current_user_role() in ('staff','admin')
  );

drop policy if exists "patients_staff_write" on public.patients;
create policy "patients_staff_write" on public.patients
  for all using (public.current_user_role() in ('staff','admin'));

-- ============================================================================
-- medical_history
-- ============================================================================

create table if not exists public.medical_history (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  category text check (category in ('chronic','allergy','surgery','medication','other')),
  title text not null,
  details text,
  date_recorded date,
  added_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

alter table public.medical_history enable row level security;

drop policy if exists "medhx_patient_read" on public.medical_history;
create policy "medhx_patient_read" on public.medical_history
  for select using (
    exists (select 1 from public.patients p where p.id = patient_id and p.profile_id = auth.uid())
    or public.current_user_role() in ('staff','admin')
  );

drop policy if exists "medhx_staff_write" on public.medical_history;
create policy "medhx_staff_write" on public.medical_history
  for all using (public.current_user_role() in ('staff','admin'));

-- ============================================================================
-- treatments
-- ============================================================================

create table if not exists public.treatments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  doctor_id uuid references public.doctors(id),
  clinic_id uuid references public.clinics(id),
  procedure_name text not null,
  procedure_category text,
  description text,
  scheduled_date timestamptz,
  status text default 'planned'
    check (status in ('planned','prep','active','completed','cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists treatments_set_updated_at on public.treatments;
create trigger treatments_set_updated_at before update on public.treatments
  for each row execute function public.set_updated_at();

alter table public.treatments enable row level security;

drop policy if exists "treatments_patient_read" on public.treatments;
create policy "treatments_patient_read" on public.treatments
  for select using (
    exists (select 1 from public.patients p where p.id = patient_id and p.profile_id = auth.uid())
    or public.current_user_role() in ('staff','admin')
  );

drop policy if exists "treatments_staff_write" on public.treatments;
create policy "treatments_staff_write" on public.treatments
  for all using (public.current_user_role() in ('staff','admin'));

-- ============================================================================
-- travel — flights, accommodations, transfers
-- ============================================================================

create table if not exists public.flights (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  direction text check (direction in ('inbound','outbound')),
  airline text,
  flight_no text,
  departure_airport text,
  arrival_airport text,
  departure_at timestamptz,
  arrival_at timestamptz,
  seat text,
  pnr text,
  ticket_document_id uuid,
  created_at timestamptz default now()
);

alter table public.flights enable row level security;

drop policy if exists "flights_patient_read" on public.flights;
create policy "flights_patient_read" on public.flights
  for select using (
    exists (select 1 from public.patients p where p.id = patient_id and p.profile_id = auth.uid())
    or public.current_user_role() in ('staff','admin')
  );

drop policy if exists "flights_staff_write" on public.flights;
create policy "flights_staff_write" on public.flights
  for all using (public.current_user_role() in ('staff','admin'));

create table if not exists public.accommodations (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  hotel_name text,
  address text,
  city text,
  check_in date,
  check_out date,
  room_no text,
  reservation_no text,
  notes text,
  created_at timestamptz default now()
);

alter table public.accommodations enable row level security;

drop policy if exists "accom_patient_read" on public.accommodations;
create policy "accom_patient_read" on public.accommodations
  for select using (
    exists (select 1 from public.patients p where p.id = patient_id and p.profile_id = auth.uid())
    or public.current_user_role() in ('staff','admin')
  );

drop policy if exists "accom_staff_write" on public.accommodations;
create policy "accom_staff_write" on public.accommodations
  for all using (public.current_user_role() in ('staff','admin'));

create table if not exists public.transfers (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  scheduled_at timestamptz,
  from_location text,
  to_location text,
  driver_name text,
  driver_phone text,
  vehicle_plate text,
  vehicle_model text,
  notes text,
  created_at timestamptz default now()
);

alter table public.transfers enable row level security;

drop policy if exists "transfers_patient_read" on public.transfers;
create policy "transfers_patient_read" on public.transfers
  for select using (
    exists (select 1 from public.patients p where p.id = patient_id and p.profile_id = auth.uid())
    or public.current_user_role() in ('staff','admin')
  );

drop policy if exists "transfers_staff_write" on public.transfers;
create policy "transfers_staff_write" on public.transfers
  for all using (public.current_user_role() in ('staff','admin'));

-- ============================================================================
-- invoices (kept for the patient portal even though payment gateways are off)
-- ============================================================================

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  invoice_no text unique,
  description text,
  amount numeric(12,2) not null,
  currency text not null check (currency in ('TRY','EUR','USD','GBP')),
  status text default 'pending'
    check (status in ('pending','paid','overdue','refunded','cancelled')),
  due_date date,
  paid_at timestamptz,
  payment_method text,
  payment_reference text,
  document_id uuid,
  created_at timestamptz default now()
);

alter table public.invoices enable row level security;

drop policy if exists "invoices_patient_read" on public.invoices;
create policy "invoices_patient_read" on public.invoices
  for select using (
    exists (select 1 from public.patients p where p.id = patient_id and p.profile_id = auth.uid())
    or public.current_user_role() in ('staff','admin')
  );

drop policy if exists "invoices_staff_write" on public.invoices;
create policy "invoices_staff_write" on public.invoices
  for all using (public.current_user_role() in ('staff','admin'));

-- ============================================================================
-- documents (file metadata; actual files in Supabase Storage)
-- ============================================================================

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  category text check (category in
    ('contract','consent','medical_report','invoice','prescription','test_result','passport','visa','other')),
  title text not null,
  storage_path text not null,
  mime_type text,
  file_size int,
  uploaded_by uuid references public.profiles(id),
  is_visible_to_patient boolean default true,
  created_at timestamptz default now()
);

alter table public.documents enable row level security;

drop policy if exists "docs_patient_read" on public.documents;
create policy "docs_patient_read" on public.documents
  for select using (
    (
      exists (select 1 from public.patients p where p.id = patient_id and p.profile_id = auth.uid())
      and is_visible_to_patient = true
    )
    or public.current_user_role() in ('staff','admin')
  );

drop policy if exists "docs_staff_write" on public.documents;
create policy "docs_staff_write" on public.documents
  for all using (public.current_user_role() in ('staff','admin'));

-- ============================================================================
-- messaging — threads + messages
-- ============================================================================

create table if not exists public.threads (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  subject text,
  last_message_at timestamptz,
  created_at timestamptz default now()
);

alter table public.threads enable row level security;

drop policy if exists "threads_patient_read" on public.threads;
create policy "threads_patient_read" on public.threads
  for select using (
    exists (select 1 from public.patients p where p.id = patient_id and p.profile_id = auth.uid())
    or public.current_user_role() in ('staff','admin')
  );

drop policy if exists "threads_staff_write" on public.threads;
create policy "threads_staff_write" on public.threads
  for all using (public.current_user_role() in ('staff','admin'));

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  sender_id uuid references public.profiles(id),
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

drop policy if exists "messages_participant_read" on public.messages;
create policy "messages_participant_read" on public.messages
  for select using (
    exists (
      select 1 from public.threads t
      join public.patients p on p.id = t.patient_id
      where t.id = thread_id
        and (p.profile_id = auth.uid() or public.current_user_role() in ('staff','admin'))
    )
  );

drop policy if exists "messages_participant_insert" on public.messages;
create policy "messages_participant_insert" on public.messages
  for insert with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.threads t
      join public.patients p on p.id = t.patient_id
      where t.id = thread_id
        and (p.profile_id = auth.uid() or public.current_user_role() in ('staff','admin'))
    )
  );

-- ============================================================================
-- inquiries — public contact form submissions
-- ============================================================================

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  phone text,
  country text,
  area_of_interest text,
  message text,
  source text default 'website',
  status text default 'new' check (status in ('new','contacted','converted','closed')),
  converted_to_patient_id uuid references public.patients(id),
  created_at timestamptz default now()
);

alter table public.inquiries enable row level security;

-- Allow anonymous form submissions
drop policy if exists "inquiries_public_insert" on public.inquiries;
create policy "inquiries_public_insert" on public.inquiries
  for insert with check (true);

drop policy if exists "inquiries_staff_select" on public.inquiries;
create policy "inquiries_staff_select" on public.inquiries
  for select using (public.current_user_role() in ('staff','admin'));

drop policy if exists "inquiries_staff_update" on public.inquiries;
create policy "inquiries_staff_update" on public.inquiries
  for update using (public.current_user_role() in ('staff','admin'));

-- ============================================================================
-- Done.
--
-- To create the first admin:
--   1. Supabase Dashboard → Authentication → Users → Add user (with password).
--   2. Note the new user's UUID.
--   3. Run:
--        insert into public.profiles (id, role, full_name)
--        values ('<paste-uuid>', 'admin', 'Haşmet Kaan Çetin');
--
-- To create a Storage bucket for patient documents:
--   Storage → New bucket → name "documents" → Private.
--   Use Supabase Storage policies to mirror the documents-table RLS.
-- ============================================================================
