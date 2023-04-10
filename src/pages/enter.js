import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";

const Enter = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{}} />
      ) : (
        <p>Account page will go here.</p>
      )}
    </div>
  );
};

export default Enter;
