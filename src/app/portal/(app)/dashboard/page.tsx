import { createSupabaseServerClient } from "@/lib/supabase/server";

const SENTINEL = "00000000-0000-0000-0000-000000000000";

export default async function PortalDashboard() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user!.id)
    .maybeSingle();

  const { data: patient } = await supabase
    .from("patients")
    .select("id, file_no, status")
    .eq("profile_id", user!.id)
    .maybeSingle();

  const pid = patient?.id ?? SENTINEL;
  const nowIso = new Date().toISOString();

  const [
    { data: nextTreatment },
    { data: nextFlight },
    { data: pendingInvoice },
    { count: docCount },
  ] = await Promise.all([
    supabase
      .from("treatments")
      .select("procedure_name, scheduled_date, doctors(full_name, title), clinics(name)")
      .eq("patient_id", pid)
      .gte("scheduled_date", nowIso)
      .order("scheduled_date", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("flights")
      .select("departure_airport, arrival_airport, departure_at")
      .eq("patient_id", pid)
      .gte("departure_at", nowIso)
      .order("departure_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("invoices")
      .select("amount, currency, due_date")
      .eq("patient_id", pid)
      .eq("status", "pending")
      .order("due_date", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("documents")
      .select("id", { count: "exact", head: true })
      .eq("patient_id", pid)
      .eq("is_visible_to_patient", true),
  ]);

  const doctor = (nextTreatment?.doctors as { full_name?: string; title?: string } | null) ?? null;
  const clinic = (nextTreatment?.clinics as { name?: string } | null) ?? null;

  return (
    <div className="max-w-5xl">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-muted mb-3">
          Good day,
        </p>
        <h1 className="font-serif italic text-tmc-green text-4xl md:text-5xl">
          {profile?.full_name ?? "Patient"}.
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-muted mt-4">
          File · {patient?.file_no ?? "—"}
        </p>
      </div>

      {nextTreatment && (
        <div className="bg-tmc-green text-tmc-ivory p-10 border border-tmc-gold/40 mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-4">
            Next step
          </p>
          <h2 className="font-serif italic text-2xl md:text-3xl mb-3">
            {nextTreatment.procedure_name}
          </h2>
          {doctor?.full_name && (
            <p className="text-base text-tmc-ivory/85 mb-1">
              with {doctor.title ? `${doctor.title} ` : ""}
              {doctor.full_name}
            </p>
          )}
          {clinic?.name && (
            <p className="text-sm text-tmc-ivory/70">{clinic.name}</p>
          )}
          {nextTreatment.scheduled_date && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mt-6">
              {new Date(nextTreatment.scheduled_date).toLocaleString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          label="Treatment status"
          value={patient?.status ? formatStatus(patient.status) : "—"}
        />
        <DashboardCard
          label="Pending balance"
          value={
            pendingInvoice
              ? formatMoney(pendingInvoice.amount, pendingInvoice.currency)
              : "Settled"
          }
          sub={
            pendingInvoice?.due_date
              ? `Due ${new Date(pendingInvoice.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}`
              : undefined
          }
        />
        <DashboardCard
          label="Next flight"
          value={
            nextFlight
              ? `${nextFlight.departure_airport} → ${nextFlight.arrival_airport}`
              : "—"
          }
          sub={
            nextFlight?.departure_at
              ? new Date(nextFlight.departure_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                })
              : undefined
          }
        />
        <DashboardCard label="Documents" value={`${docCount ?? 0} shared`} />
      </div>
    </div>
  );
}

function DashboardCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="border border-tmc-gold/25 bg-white/40 p-8">
      <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-3">
        {label}
      </p>
      <p className="font-serif italic text-tmc-green text-2xl">{value}</p>
      {sub && <p className="text-xs text-tmc-muted mt-2">{sub}</p>}
    </div>
  );
}

function formatStatus(s: string): string {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatMoney(amount: number, currency: string): string {
  const symbol =
    ({ TRY: "₺", EUR: "€", USD: "$", GBP: "£" } as Record<string, string>)[
      currency
    ] ?? currency;
  return `${symbol} ${amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
  })}`;
}
