import { createSupabaseServerClient } from "@/lib/supabase/server";

const SENTINEL = "00000000-0000-0000-0000-000000000000";

export default async function MedicalFile() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: patient } = await supabase
    .from("patients")
    .select("*")
    .eq("profile_id", user!.id)
    .maybeSingle();

  const { data: history } = await supabase
    .from("medical_history")
    .select("id, category, title, details, date_recorded")
    .eq("patient_id", patient?.id ?? SENTINEL)
    .order("date_recorded", { ascending: false });

  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-4">
          Medical file
        </p>
        <h1 className="font-serif italic text-tmc-green text-4xl">
          Personal record
        </h1>
      </div>

      <section className="mb-16">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-6 border-b border-tmc-gold/20 pb-3">
          General
        </h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <Field label="Date of birth" value={patient?.date_of_birth} />
          <Field label="Gender" value={patient?.gender} />
          <Field label="Blood type" value={patient?.blood_type} />
          <Field label="Nationality" value={patient?.nationality} />
          <Field
            label="Height"
            value={patient?.height_cm ? `${patient.height_cm} cm` : null}
          />
          <Field
            label="Weight"
            value={patient?.weight_kg ? `${patient.weight_kg} kg` : null}
          />
          <Field label="Insurance" value={patient?.insurance_provider} />
        </div>
      </section>

      <section>
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-6 border-b border-tmc-gold/20 pb-3">
          Medical history
        </h2>
        {history && history.length > 0 ? (
          <div className="space-y-6">
            {history.map((h) => (
              <div key={h.id} className="border-b border-tmc-gold/15 pb-5">
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-serif italic text-tmc-green text-xl">
                    {h.title}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold">
                    {h.category}
                  </p>
                </div>
                {h.details && (
                  <p className="text-sm text-tmc-ink/70 leading-relaxed">
                    {h.details}
                  </p>
                )}
                {h.date_recorded && (
                  <p className="text-xs text-tmc-muted mt-2">
                    Recorded{" "}
                    {new Date(h.date_recorded).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-tmc-muted">
            No history on record.
          </p>
        )}
      </section>

      <p className="text-xs italic text-tmc-muted mt-16 border-t border-tmc-gold/15 pt-8">
        Information is read-only. To request a change, send a message to the concierge team.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-1">
        {label}
      </p>
      <p className="text-base text-tmc-ink">{value ?? "—"}</p>
    </div>
  );
}
