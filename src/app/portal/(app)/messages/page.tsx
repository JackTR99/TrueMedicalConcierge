import { createSupabaseServerClient } from "@/lib/supabase/server";

const SENTINEL = "00000000-0000-0000-0000-000000000000";

export default async function MessagesPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: patient } = await supabase
    .from("patients")
    .select("id")
    .eq("profile_id", user!.id)
    .maybeSingle();

  const { data: threads } = await supabase
    .from("threads")
    .select("id, subject, last_message_at, created_at")
    .eq("patient_id", patient?.id ?? SENTINEL)
    .order("last_message_at", { ascending: false, nullsFirst: false });

  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-4">
          Messages
        </p>
        <h1 className="font-serif italic text-tmc-green text-4xl">
          Concierge correspondence
        </h1>
      </div>

      {threads && threads.length > 0 ? (
        <div className="divide-y divide-tmc-gold/15 border-t border-tmc-gold/15">
          {threads.map((t) => (
            <div key={t.id} className="py-7">
              <p className="font-serif italic text-tmc-green text-xl md:text-2xl mb-2">
                {t.subject ?? "(untitled)"}
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-muted">
                {t.last_message_at
                  ? `Updated ${new Date(t.last_message_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                    })}`
                  : "Opened recently"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm italic text-tmc-muted">
          No conversations yet. The concierge team will reach out shortly.
        </p>
      )}
    </div>
  );
}
