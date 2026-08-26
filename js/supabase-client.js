/* =====================================================================
   DropMyElectronic — shared Supabase client & auth helpers
   Include AFTER the Supabase CDN script tag on every page that needs it:

   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
   <script src="js/supabase-client.js"></script>
   ===================================================================== */

// TODO: fill these in from Supabase Dashboard → Project Settings → API
const SUPABASE_URL = "https://awtxygawuuzqwxijwfxr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_r719mEMdiNwalGxojJwHnw_g_VRp78S";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/** Returns the logged-in user's session, or null. */
async function getSession() {
  const { data: { session } } = await sb.auth.getSession();
  return session;
}

/** Returns the logged-in user's profile row (id, full_name, role, points...), or null. */
async function getProfile() {
  const session = await getSession();
  if (!session) return null;
  const { data, error } = await sb
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();
  if (error) {
    console.error("getProfile error:", error);
    return null;
  }
  return data;
}

/**
 * Guard a page: redirects to sign.html if not logged in, or optionally
 * if logged in with the wrong role. For role === 'recycler', this also
 * enforces that the recycler has been approved by an admin — if not,
 * it redirects to recycler-pending.html instead of letting them in.
 * Call at the top of a page's script. Returns the profile if allowed,
 * or null (and redirects) if not.
 */
async function requireAuth(role) {
  const profile = await getProfile();
  if (!profile) {
    window.location.href = "sign.html?next=" + encodeURIComponent(window.location.pathname.split("/").pop());
    return null;
  }
  if (role && profile.role !== role) {
    alert(role === "recycler"
      ? "This page is for recycler accounts only."
      : "This page is for user accounts only.");
    window.location.href = "index.html";
    return null;
  }
  if (role === "recycler" && profile.recycler_status !== "approved") {
    window.location.href = "recycler-pending.html";
    return null;
  }
  return profile;
}

/** Guard an admin-only page. Returns the profile, or null (and redirects). */
async function requireAdmin() {
  const profile = await getProfile();
  if (!profile) {
    window.location.href = "sign.html?next=" + encodeURIComponent(window.location.pathname.split("/").pop());
    return null;
  }
  if (!profile.is_admin) {
    alert("This page is for admins only.");
    window.location.href = "index.html";
    return null;
  }
  return profile;
}

async function signOut() {
  await sb.auth.signOut();
  window.location.href = "sign.html";
}

/** Generates a short, human-typeable unique pickup code, e.g. DME-7F3K9Q. */
function generatePickupCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O/0/I/1 to avoid confusion
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return "DME-" + code;
}
