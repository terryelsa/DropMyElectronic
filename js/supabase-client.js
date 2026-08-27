
/* =====================================================================
   DropMyElectronic — shared Supabase client & auth helpers

   Include AFTER the Supabase CDN script tag on every page that needs it:

   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
   <script src="js/supabase-client.js"></script>
   ===================================================================== */

// =====================================================================
// SUPABASE CONFIGURATION
// =====================================================================

const SUPABASE_URL = "https://awtxygawuuzqwxijwfxr.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_r719mEMdiNwalGxojJwHnw_g_VRp78S";

const sb = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// =====================================================================
// GET CURRENT SESSION
// =====================================================================

/**
 * Returns the logged-in user's session, or null if there is no session.
 */
async function getSession() {

  const {
    data: { session },
    error
  } = await sb.auth.getSession();

  if (error) {
    console.error("getSession error:", error);
    return null;
  }

  return session;
}


// =====================================================================
// GET USER PROFILE
// =====================================================================

/**
 * Returns the logged-in user's profile row.
 *
 * Example:
 * {
 *   id,
 *   full_name,
 *   role,
 *   points,
 *   is_admin,
 *   recycler_status
 * }
 *
 * Returns null if the user is not logged in or the profile
 * cannot be retrieved.
 */
async function getProfile() {

  const session = await getSession();

  if (!session) {
    return null;
  }

  const {
    data,
    error
  } = await sb
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


// =====================================================================
// GENERAL AUTH GUARD
// =====================================================================

/**
 * Guard a page.
 *
 * If the user is not logged in:
 *      → redirects to sign.html
 *
 * If a role is supplied and the user has the wrong role:
 *      → redirects to index.html
 *
 * If role === "recycler":
 *      → recycler must also be approved
 *
 * Returns the user's profile if access is allowed.
 * Returns null if access is denied.
 */
async function requireAuth(role) {

  const profile = await getProfile();

  // ---------------------------------------------------------------
  // User is not logged in
  // ---------------------------------------------------------------

  if (!profile) {

    const currentPage =
      window.location.pathname
        .split("/")
        .pop();

    window.location.href =
      "sign.html?next=" +
      encodeURIComponent(currentPage);

    return null;
  }


  // ---------------------------------------------------------------
  // Wrong role
  // ---------------------------------------------------------------

  if (role && profile.role !== role) {

    alert(
      role === "recycler"
        ? "This page is for recycler accounts only."
        : "This page is for user accounts only."
    );

    window.location.href = "index.html";

    return null;
  }


  // ---------------------------------------------------------------
  // Recycler must be approved
  // ---------------------------------------------------------------

  if (
    role === "recycler" &&
    profile.recycler_status !== "approved"
  ) {

    window.location.href =
      "recycler-pending.html";

    return null;
  }


  return profile;
}


// =====================================================================
// ADMIN GUARD
// =====================================================================

/**
 * Guard an admin-only page.
 *
 * If the user is not logged in:
 *      → redirects to sign.html
 *
 * If the user is logged in but is not an admin:
 *      → redirects to index.html
 *
 * Returns the profile if the user is an admin.
 */
async function requireAdmin() {

  const profile = await getProfile();


  // ---------------------------------------------------------------
  // User is not logged in
  // ---------------------------------------------------------------

  if (!profile) {

    const currentPage =
      window.location.pathname
        .split("/")
        .pop();

    window.location.href =
      "sign.html?next=" +
      encodeURIComponent(currentPage);

    return null;
  }


  // ---------------------------------------------------------------
  // User is not an admin
  // ---------------------------------------------------------------

  if (!profile.is_admin) {

    alert("This page is for admins only.");

    window.location.href = "index.html";

    return null;
  }


  // ---------------------------------------------------------------
  // User is an authenticated admin
  // ---------------------------------------------------------------

  return profile;
}


// =====================================================================
// SIGN OUT
// =====================================================================

/**
 * Signs the current user out of Supabase
 * and redirects to the sign-in page.
 */
async function signOut() {

  const { error } = await sb.auth.signOut();

  if (error) {
    console.error("Sign out error:", error);
  }

  window.location.href = "sign.html";
}


// =====================================================================
// ADMIN SESSION TIMER
// =====================================================================

/**
 * Automatically signs an admin out after 1 minute.
 *
 * This should only be called AFTER requireAdmin()
 * has successfully authenticated the admin.
 *
 * Usage in admin.html:
 *
 * const profile = await requireAdmin();
 * if (!profile) return;
 *
 * startAdminSessionTimer();
 */
function startAdminSessionTimer() {

  const ADMIN_SESSION_TIME = 60 * 1000; // 1 minute


  setTimeout(async () => {

    alert(
      "Your admin session has expired. You have been signed out."
    );

    await signOut();

  }, ADMIN_SESSION_TIME);
}


// =====================================================================
// PICKUP CODE GENERATOR
// =====================================================================

/**
 * Generates a short, human-typeable unique pickup code.
 *
 * Example:
 *      DME-7F3K9Q
 *
 * Characters O/0/I/1 are excluded to avoid confusion.
 */
function generatePickupCode() {

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let i = 0; i < 6; i++) {

    code +=
      chars[
        Math.floor(
          Math.random() * chars.length
        )
      ];

  }

  return "DME-" + code;
}
