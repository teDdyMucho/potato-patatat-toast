# Authentication (Login, Registration, Google)

Auth is handled by **Supabase Auth**:

- **Email/password sign-up** sends a **verification email**. The account is
  inactive until the user clicks the link — **no auto-login**, and login is
  blocked until the email is confirmed.
- **"Continue with Google"** uses Supabase's Google provider (email already
  verified by Google).
- Sessions are managed by Supabase (stored in cookies).

> There is no custom `users` table / password hashing / JWT anymore — Supabase
> Auth owns all of that (`auth.users`).

---

## 1. Setup

### a. Environment variables

Supabase Dashboard → **Project Settings → API**. In `.env` (gitignored):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon / public key>
```

Both are public by design (used in the browser). No service_role key or
JWT secret needed.

### b. Email verification (on by default)

Supabase → **Authentication → Providers → Email** → ensure **"Confirm email"**
is **ON** (it is by default). This is what makes sign-up send a verification
link and block login until confirmed.

> The verification link redirects back to `/login?verified=1`, which shows a
> "you can now log in" message. Supabase's built-in email sender is rate-limited
> for testing; for production set up custom SMTP under
> **Authentication → Emails → SMTP Settings**.

### c. Enable "Continue with Google"

1. **Google Cloud Console** → APIs & Services → **Credentials** → Create
   **OAuth client ID** → *Web application*.
   - **Authorized redirect URI**: `https://<your-project-ref>.supabase.co/auth/v1/callback`
   - Copy the **Client ID** + **Client secret**.
2. **Supabase** → **Authentication → Providers → Google** → enable, paste them.
3. **Supabase** → **Authentication → URL Configuration**:
   - **Site URL**: `http://localhost:3000` (prod URL in production)
   - **Redirect URLs**: add `http://localhost:3000/**` (and your prod URL).

### d. Run

```bash
npm install
npm run dev
```

---

## 2. Flows

**Sign up (email):** form → `supabase.auth.signUp(...)` → Supabase emails a link
→ UI shows "check your inbox" (no session) → user clicks link → confirmed →
returns to `/login?verified=1` → user logs in.

**Log in (email):** `supabase.auth.signInWithPassword(...)`. If the email isn't
confirmed yet, login is rejected with "Please verify your email first."

**Google:** login page → `signInWithOAuth({ provider: "google" })` → Google →
`/auth/callback` exchanges the code for a session → redirect to the app.

---

## 3. Key files

- [`lib/auth.tsx`](../lib/auth.tsx) — `AuthProvider` / `useAuth()`; wraps the
  Supabase browser client (`signUp`, `signInWithPassword`, `signInWithOAuth`,
  `signOut`) and exposes `user`, `ready`, `login`, `signup`, `loginWithGoogle`,
  `logout`.
- [`lib/supabase/server.ts`](../lib/supabase/server.ts) — server client (cookies) for the callback.
- [`app/auth/callback/route.ts`](../app/auth/callback/route.ts) — OAuth code exchange.
- [`app/login/page.tsx`](../app/login/page.tsx) — login / sign-up / Google UI.

---

## 3a. Roles & admin access

Admin access is backed by a `public.profiles` table (one row per `auth.users`,
with a `role` of `'user'` or `'admin'`). The admin dashboard at `/admin` checks
`role = 'admin'`.

- **Setup:** run [`docs/sql/admin-profiles.sql`](./sql/admin-profiles.sql) once
  in the Supabase SQL editor (creates the table, RLS, a new-user trigger,
  backfills existing users, and seeds the first admin).
- **Admin writes** (promoting/suspending users) use the **service-role key** on
  the server only — set `SUPABASE_SERVICE_ROLE_KEY` in `.env`. RLS blocks users
  from changing their own `role`.
- **Client:** `useAuth()` now also returns `role` and `isAdmin`.
- **Server guard:** `lib/admin.ts` → `checkAdmin()`, used by `app/admin/layout.tsx`.
- Full build plan: [`docs/ADMIN_PAGE.md`](./ADMIN_PAGE.md).

---

## 4. Troubleshooting

| Symptom                                          | Fix                                                                                   |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| "Auth isn't configured"                          | Set `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env`, restart.   |
| Sign-up logs in immediately (no email)           | Turn **Confirm email** ON in Supabase (Authentication → Providers → Email).            |
| "Please verify your email first" but no email    | Check spam; Supabase test email is rate-limited — wait, or configure custom SMTP.      |
| Verification link errors / wrong redirect        | Add your URL to **Authentication → URL Configuration** (Site URL + Redirect URLs).     |
| Google: redirect_uri_mismatch                    | The Google OAuth redirect URI must be `https://<ref>.supabase.co/auth/v1/callback`.    |

> Note: this replaced the earlier custom auth (raw Postgres / `pg`, bcrypt,
> JWT cookie). Those env vars (`DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
> `JWT_SECRET`) and the `db/schema.sql` table are no longer used. Any users you
> created in the old `public.users` table won't exist in Supabase Auth — sign up
> again.
