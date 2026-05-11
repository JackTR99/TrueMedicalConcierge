import { createSupabaseServerClient } from "@/lib/supabase/server";

const SENTINEL = "00000000-0000-0000-0000-000000000000";

export default async function TravelPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: patient } = await supabase
    .from("patients")
    .select("id")
    .eq("profile_id", user!.id)
    .maybeSingle();

  const pid = patient?.id ?? SENTINEL;

  const [{ data: flights }, { data: accommodations }, { data: transfers }] =
    await Promise.all([
      supabase
        .from("flights")
        .select("*")
        .eq("patient_id", pid)
        .order("departure_at", { ascending: true }),
      supabase
        .from("accommodations")
        .select("*")
        .eq("patient_id", pid)
        .order("check_in", { ascending: true }),
      supabase
        .from("transfers")
        .select("*")
        .eq("patient_id", pid)
        .order("scheduled_at", { ascending: true }),
    ]);

  return (
    <div className="max-w-5xl">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-4">
          Travel
        </p>
        <h1 className="font-serif italic text-tmc-green text-4xl">
          Your itinerary
        </h1>
      </div>

      <Section title="Flights">
        {flights && flights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flights.map((f) => (
              <div
                key={f.id}
                className="border border-tmc-gold/30 bg-white/40 p-8"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-5">
                  {f.direction === "inbound" ? "Inbound" : "Outbound"} ·{" "}
                  {f.airline} {f.flight_no}
                </p>
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-serif italic text-tmc-green text-3xl md:text-4xl">
                    {f.departure_airport}
                  </span>
                  <span className="text-tmc-gold text-2xl">→</span>
                  <span className="font-serif italic text-tmc-green text-3xl md:text-4xl">
                    {f.arrival_airport}
                  </span>
                </div>
                {f.departure_at && (
                  <p className="text-sm text-tmc-ink/75 leading-relaxed">
                    {new Date(f.departure_at).toLocaleString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
                <div className="mt-6 pt-5 border-t border-tmc-gold/15 flex gap-8 text-[10px] uppercase tracking-[0.3em] text-tmc-muted">
                  {f.seat && (
                    <span>
                      Seat <span className="text-tmc-green">{f.seat}</span>
                    </span>
                  )}
                  {f.pnr && (
                    <span>
                      PNR <span className="text-tmc-green">{f.pnr}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty label="No flights on file." />
        )}
      </Section>

      <Section title="Accommodation">
        {accommodations && accommodations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accommodations.map((a) => (
              <div
                key={a.id}
                className="border border-tmc-gold/30 bg-white/40 p-8"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-4">
                  {a.city ?? "Hotel"}
                </p>
                <h3 className="font-serif italic text-tmc-green text-2xl md:text-3xl mb-3">
                  {a.hotel_name}
                </h3>
                {a.address && (
                  <p className="text-sm text-tmc-ink/70 mb-5">{a.address}</p>
                )}
                <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-tmc-muted pt-4 border-t border-tmc-gold/15">
                  <span>
                    In ·{" "}
                    <span className="text-tmc-green">
                      {a.check_in &&
                        new Date(a.check_in).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                    </span>
                  </span>
                  <span>
                    Out ·{" "}
                    <span className="text-tmc-green">
                      {a.check_out &&
                        new Date(a.check_out).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                    </span>
                  </span>
                </div>
                {a.room_no && (
                  <p className="text-sm text-tmc-ink/75 mt-4">
                    Room <span className="text-tmc-green">{a.room_no}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Empty label="No accommodations on file." />
        )}
      </Section>

      <Section title="Transfers">
        {transfers && transfers.length > 0 ? (
          <div className="space-y-3">
            {transfers.map((t) => (
              <div
                key={t.id}
                className="border border-tmc-gold/25 bg-white/30 p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                <p className="md:col-span-3 text-[10px] uppercase tracking-[0.3em] text-tmc-gold">
                  {t.scheduled_at &&
                    new Date(t.scheduled_at).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </p>
                <p className="md:col-span-6 text-sm">
                  <span className="text-tmc-ink/85">{t.from_location}</span>
                  <span className="text-tmc-gold mx-3">→</span>
                  <span className="text-tmc-ink/85">{t.to_location}</span>
                </p>
                <p className="md:col-span-3 text-[10px] uppercase tracking-[0.3em] text-tmc-muted">
                  {t.driver_name}
                  {t.vehicle_plate ? ` · ${t.vehicle_plate}` : ""}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <Empty label="No transfers on file." />
        )}
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2 className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-6 border-b border-tmc-gold/20 pb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="text-sm italic text-tmc-muted">{label}</p>;
}
