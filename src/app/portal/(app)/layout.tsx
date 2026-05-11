import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalHeader } from "@/components/portal/PortalHeader";

export default async function PortalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const { data: patient } = await supabase
    .from("patients")
    .select("file_no")
    .eq("profile_id", user.id)
    .maybeSingle();

  return (
    <div className="flex min-h-screen bg-tmc-ivory">
      <PortalSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <PortalHeader
          name={profile?.full_name ?? user.email ?? "Patient"}
          fileNo={patient?.file_no ?? "—"}
        />
        <main className="flex-1 px-8 py-12 md:px-12">{children}</main>
      </div>
    </div>
  );
}
