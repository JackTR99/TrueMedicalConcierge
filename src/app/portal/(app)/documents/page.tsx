import { createSupabaseServerClient } from "@/lib/supabase/server";

const SENTINEL = "00000000-0000-0000-0000-000000000000";

export default async function DocumentsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: patient } = await supabase
    .from("patients")
    .select("id")
    .eq("profile_id", user!.id)
    .maybeSingle();

  const { data: docs } = await supabase
    .from("documents")
    .select("id, title, category, created_at, mime_type, file_size")
    .eq("patient_id", patient?.id ?? SENTINEL)
    .eq("is_visible_to_patient", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-4">
          Documents
        </p>
        <h1 className="font-serif italic text-tmc-green text-4xl">
          Shared with you
        </h1>
      </div>

      {docs && docs.length > 0 ? (
        <div className="divide-y divide-tmc-gold/15 border-t border-tmc-gold/15">
          {docs.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between py-6"
            >
              <div>
                <p className="font-serif italic text-tmc-green text-lg md:text-xl">
                  {d.title}
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-muted mt-2">
                  <span className="text-tmc-gold">{formatCategory(d.category)}</span>
                  {" · "}
                  {new Date(d.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold border-b border-tmc-gold/40 pb-1 hover:text-tmc-green-deep transition-colors">
                Download
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm italic text-tmc-muted">
          No documents shared yet.
        </p>
      )}
    </div>
  );
}

function formatCategory(c: string | null): string {
  if (!c) return "Document";
  return c.replace(/_/g, " ").replace(/\b\w/g, (x) => x.toUpperCase());
}
