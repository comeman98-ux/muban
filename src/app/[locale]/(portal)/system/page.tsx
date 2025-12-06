import { createSupabaseServerClient } from "@/lib/supabaseServer";
import InternalSystemClient from "./InternalSystemClient";

type SystemPageProps = {
  params: { locale: string };
};

export default async function InternalSystemPage({ params }: SystemPageProps) {
  const supabase = createSupabaseServerClient();

  const { data: users } = await supabase
    .from("system_users")
    .select("id, identity_id, is_active")
    .order("id", { ascending: true });

  return <InternalSystemClient locale={params.locale} users={users ?? null} />;
}

