import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Dashboard (Protected)</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
