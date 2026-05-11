import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .maybeSingle();

  return (
    <div className="max-w-2xl">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-4">
          Profile
        </p>
        <h1 className="font-serif italic text-tmc-green text-4xl">
          Your details
        </h1>
      </div>

      <div className="space-y-6 border-t border-tmc-gold/15">
        <Field label="Full name" value={profile?.full_name} />
        <Field label="Email" value={user?.email} />
        <Field label="Phone" value={profile?.phone} />
        <Field
          label="Preferred language"
          value={profile?.preferred_language?.toUpperCase()}
        />
      </div>

      <p className="text-xs italic text-tmc-muted mt-16 border-t border-tmc-gold/15 pt-8">
        To change any of these, please send a message to the concierge team.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="border-b border-tmc-gold/15 pb-5 pt-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-2">
        {label}
      </p>
      <p className="text-base text-tmc-ink">{value ?? "—"}</p>
    </div>
  );
}
