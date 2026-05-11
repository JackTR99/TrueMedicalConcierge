-- ============================================================================
-- True Medical Concierge — Demo Seed Data
--
-- Run in Supabase → SQL Editor → New query → Run.
-- The script looks up the auth user by email (set v_user_email below).
-- ============================================================================

do $$
declare
  -- Change this if you used a different email when creating the demo user:
  v_user_email text := 'patient@truemedicalconcierge.co';

  v_user_id uuid;
  v_patient_id uuid;
  v_doctor_id uuid;
  v_clinic_id uuid;
  v_thread_id uuid;
begin
  select id into v_user_id from auth.users where email = v_user_email;

  if v_user_id is null then
    raise exception 'No auth user found for %. Create one in Authentication > Users > Add user first.', v_user_email;
  end if;

  -- profile (patient role)
  insert into public.profiles (id, role, full_name, phone, preferred_language)
  values (v_user_id, 'patient', 'Eleanor Whitmore', '+44 7700 900123', 'en')
  on conflict (id) do update
    set role = excluded.role,
        full_name = excluded.full_name,
        phone = excluded.phone,
        preferred_language = excluded.preferred_language;

  -- doctor
  insert into public.doctors (full_name, title, specialty, languages, bio, is_active)
  values (
    'Mehmet Yıldız', 'Prof. Dr.', 'Plastic & Aesthetic Surgery',
    array['English','Turkish','French'],
    'Twenty years of consultant practice in facial and reconstructive surgery.',
    true
  )
  returning id into v_doctor_id;

  -- clinic
  insert into public.clinics (name, city, address, specialties, is_active)
  values (
    'Aegean Plastic Surgery Institute', 'İzmir',
    'Alsancak Mahallesi, Kıbrıs Şehitleri Cd. 41, İzmir',
    array['Plastic & Aesthetic Surgery','Dental & Oral Health'],
    true
  )
  returning id into v_clinic_id;

  insert into public.doctor_clinics (doctor_id, clinic_id)
  values (v_doctor_id, v_clinic_id);

  -- patient
  insert into public.patients (
    profile_id, date_of_birth, gender, blood_type, height_cm, weight_kg,
    nationality, passport_no, insurance_provider, status
  )
  values (
    v_user_id, '1972-03-14', 'Female', 'A+', 168, 64,
    'British', 'GB539284712', 'Bupa Global', 'in_treatment'
  )
  returning id into v_patient_id;

  -- medical history
  insert into public.medical_history (patient_id, category, title, details, date_recorded) values
    (v_patient_id, 'allergy', 'Penicillin', 'Mild urticaria on prior exposure.', '2019-04-10'),
    (v_patient_id, 'surgery', 'Appendectomy', 'Laparoscopic, uneventful recovery.', '2003-08-22'),
    (v_patient_id, 'chronic', 'Mild hypertension', 'Controlled with lifestyle measures.', '2020-01-15'),
    (v_patient_id, 'medication', 'Atorvastatin 10mg', 'Daily, evening.', '2024-09-01');

  -- treatment (upcoming)
  insert into public.treatments (
    patient_id, doctor_id, clinic_id, procedure_name, procedure_category,
    description, scheduled_date, status
  ) values (
    v_patient_id, v_doctor_id, v_clinic_id,
    'Facelift consultation', 'Plastic & Aesthetic Surgery',
    'Pre-operative consultation and clinical photography.',
    (now() + interval '5 days')::timestamptz,
    'planned'
  );

  -- flights
  insert into public.flights (
    patient_id, direction, airline, flight_no,
    departure_airport, arrival_airport,
    departure_at, arrival_at, seat, pnr
  ) values
    (v_patient_id, 'inbound', 'Turkish Airlines', 'TK1988',
     'LHR', 'ADB',
     (now() + interval '4 days 9 hours')::timestamptz,
     (now() + interval '4 days 13 hours 30 minutes')::timestamptz,
     '3A', 'QXRM4P'),
    (v_patient_id, 'outbound', 'Turkish Airlines', 'TK1987',
     'ADB', 'LHR',
     (now() + interval '12 days 18 hours')::timestamptz,
     (now() + interval '12 days 22 hours 30 minutes')::timestamptz,
     '3A', 'QXRM4P');

  -- accommodation
  insert into public.accommodations (
    patient_id, hotel_name, address, city,
    check_in, check_out, room_no, reservation_no
  ) values (
    v_patient_id,
    'Swissôtel Büyük Efes',
    'Gaziosmanpaşa Bulvarı 1, Konak',
    'İzmir',
    (now() + interval '4 days')::date,
    (now() + interval '12 days')::date,
    'Suite 814',
    'SW-2026-00481'
  );

  -- transfers
  insert into public.transfers (
    patient_id, scheduled_at, from_location, to_location,
    driver_name, driver_phone, vehicle_plate, vehicle_model
  ) values
    (v_patient_id,
     (now() + interval '4 days 13 hours 45 minutes')::timestamptz,
     'Adnan Menderes Airport (ADB)', 'Swissôtel Büyük Efes',
     'Murat Aslan', '+90 532 234 5678', '35 ABC 081', 'Mercedes-Benz V-Class'),
    (v_patient_id,
     (now() + interval '5 days 9 hours 30 minutes')::timestamptz,
     'Swissôtel Büyük Efes', 'Aegean Plastic Surgery Institute',
     'Murat Aslan', '+90 532 234 5678', '35 ABC 081', 'Mercedes-Benz V-Class'),
    (v_patient_id,
     (now() + interval '12 days 15 hours')::timestamptz,
     'Swissôtel Büyük Efes', 'Adnan Menderes Airport (ADB)',
     'Murat Aslan', '+90 532 234 5678', '35 ABC 081', 'Mercedes-Benz V-Class');

  -- documents (metadata only — actual files not seeded)
  insert into public.documents (
    patient_id, category, title, storage_path, mime_type, file_size, is_visible_to_patient
  ) values
    (v_patient_id, 'contract', 'Service Agreement', 'demo/service_agreement.pdf', 'application/pdf', 184320, true),
    (v_patient_id, 'consent', 'Surgical Consent Form', 'demo/surgical_consent.pdf', 'application/pdf', 92480, true),
    (v_patient_id, 'medical_report', 'Pre-operative Clinical Evaluation', 'demo/preop_evaluation.pdf', 'application/pdf', 251200, true),
    (v_patient_id, 'test_result', 'Bloodwork — November 2026', 'demo/bloodwork_nov_2026.pdf', 'application/pdf', 75200, true);

  -- invoices
  insert into public.invoices (
    patient_id, invoice_no, description, amount, currency, status, due_date
  ) values
    (v_patient_id, 'INV-2026-1042', 'Deposit — concierge package', 1500.00, 'EUR', 'paid', (now() - interval '14 days')::date),
    (v_patient_id, 'INV-2026-1058', 'Pre-operative evaluation', 850.00, 'EUR', 'paid', (now() - interval '7 days')::date),
    (v_patient_id, 'INV-2026-1071', 'Surgical fees — Facelift', 8400.00, 'EUR', 'pending', (now() + interval '3 days')::date),
    (v_patient_id, 'INV-2026-1072', 'Accommodation — Swissôtel (8 nights)', 2240.00, 'EUR', 'pending', (now() + interval '3 days')::date);

  -- thread + messages
  insert into public.threads (patient_id, subject, last_message_at)
  values (v_patient_id, 'Pre-operative preparation', now() - interval '6 hours')
  returning id into v_thread_id;

  insert into public.messages (thread_id, sender_id, body, created_at) values
    (v_thread_id, v_user_id,
     'Should I stop the atorvastatin a week before surgery, or continue as usual?',
     now() - interval '2 days'),
    (v_thread_id, v_user_id,
     'Also — is there a recommended breakfast on the morning before transfer?',
     now() - interval '6 hours');
end $$;
