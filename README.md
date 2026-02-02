# diagnoVET – UI Engineer Challenge

Prototype focused on **improving the login and first-time experience**, with a mini database for authentication, design aligned with DiagnovetAI identity, and additional efficiency improvements for the veterinarian (language, study management, drafts).

---

## Reference: Platform Videos

The analysis and audit are based on the following materials:

| Video                                                                             | Description                                                                                                                                       |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Clinic setup and first login](https://www.youtube.com/watch?v=FKd49yNKtUc)       | Step-by-step guide: create account, configure clinic details, and access the dashboard for the first time.                                        |
| [Language preference](https://www.youtube.com/watch?v=7t1xlc5-0v0)                | How to adjust the language in the DiagnoVET platform (where to click, available options).                                                         |
| [Create and manage ultrasound cases](https://www.youtube.com/watch?v=PgTmi96Xr_E) | Full flow with Nicolás Alborno: creating and managing cases, exercises with and without initial observations and presumptive diagnoses (~22 min). |

---

## 1. Analyze & Audit

Analysis based on the videos above and the current flow (login, onboarding, forms, dashboard, patient analysis, studies).

### Friction points

- **Login and onboarding** _(visible in video 1)_

  - The "Processing..." state appears with no clear context (what is being validated?).
  - It’s not clear whether the user is new (register/clinic) or returning.
  - Multiple steps in a row (login → Almost done → Veterinary Information) can feel like one long tunnel.

- **Forms** _(visible in video 3)_

  - "Analyze Patient" packs many required fields into a single view (date, name, age, unit, species, breed, gender, referrer, guardian, study type), increasing cognitive load.
  - Fields like "Professional's Email" and "Guardian's Email" have no visible validation or inline error messages.
  - The image upload area is separate from the form flow; there’s no clear progress feedback (e.g. “1 of 3 images”).

- **Dashboard**

  - Empty state "No reports found" with no guidance or secondary CTA (only the main "CREATE NEW REPORT" button).
  - The "Information saved successfully" notification doesn’t say which step it came from; it should be dismissible.

- **Language and consistency** _(visible in video 2)_
  - Mix of Spanish and English in the same session (e.g. "Almost done..." vs "Inicia sesión") when language preference isn’t prominent or persisted.

### Cognitive load

- Too much information on one screen in "Analyze Patient" (many fields + upload).
- Onboarding spread over several steps with no progress indicator (steps) or “how much is left”.
- Lack of clear visual grouping (e.g. “Patient data” vs “Guardian data” vs “Study”).

### Missed opportunities

- **Login**: Friendly error state (“Incorrect username or password” with suggestions), “Forgot password?”, registration visible on the same screen.
- **Empty states**: Empty dashboard with CTA “Create your first report” and, where relevant, tips or short video; image zone with accepted formats and max size.
- **Feedback**: Real-time validation (email, phone); toasts or banners with “Undo” when saving something critical.
- **Veterinarian efficiency**: Shortcuts to reuse “Referring Professional” or “Guardian”; draft on leaving the form or “Create as draft”; ability to delete studies and change status (draft / active / completed).

---

## 2. Strategic Overview

Prioritized changes to improve veterinarian efficiency and UI clarity:

| Area                   | Proposed change                                                                                                                     | Expected impact                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Login / first time** | Single screen for identity (email/username) and password; explicit loading and error states; registration visible on the same view. | Less drop-off and fewer doubts on first access. |
| **Onboarding**         | Progress bar or “Step 1 of 3” and “Complete later” option to go to dashboard.                                                       | Less tunnel feeling and more control.           |
| **Forms**              | Group into sections (Patient / Guardian / Study); inline validation; “Create as draft” option.                                      | Lower cognitive load and less data loss.        |
| **Empty dashboard**    | Illustration + action-oriented message + CTA “Create my first report” and, where relevant, tips or short video.                     | Less friction to take the first step.           |
| **Images**             | Drag & drop with preview and counter; visible formats and limits; upload progress.                                                  | Fewer errors and more confidence.               |
| **Language**           | Language selector in header from first use and persistence (cookie + localStorage).                                                 | Consistency and better experience in LATAM.     |
| **Studies**            | Delete study with confirmation; change status (draft / active / completed) from list and detail.                                    | More control and fewer steps to close cases.    |

---

## 3. The Prototype – Why This Improvement

### Main improvement: **Login and first experience with mini database**

**Why this improvement**

1. **Impact on the funnel**  
   Login and registration are the first real touchpoint with the platform. Friction or confusion here (opaque loading states, unclear errors, hidden registration) loses users before they see the value (reducing report time from 45 min to 5 min).

2. **Aligned with the challenge**  
   The brief asks for a “mini database for login”: the prototype implements user persistence, login and registration against a mini DB, with state handling, forms, and APIs.

3. **Interaction detail**

   - Loading state (“Processing…”) with context.
   - Clear, recoverable error messages.
   - Login → dashboard transition with persisted session (cookie).
   - Design aligned with DiagnovetAI (teal, logo, copy in Spanish/English).

4. **Scalable**  
   The same structure (API routes + data layer) can later connect to Firebase or another backend without changing the user experience.

### What the prototype includes (core)

- **Mini database**: JSON persistence (`users.json`, `reports.json`, `clinics.json`) with API routes for auth, profile, clinic, and reports.
- **Login**: email or username, password, “Continue”, “Processing…” state, and inline error messages.
- **Registration**: Required fields, basic validation, and clear feedback; on success → onboarding.
- **Session**: Session cookie; redirect to dashboard after successful login.
- **Dashboard**: Stats (Total reports, Total patients, Active reports), search, report list, empty state with CTA, dismissible success banner.
- **Design**: Teal, clear typography, careful loading and error states, basic accessibility (labels, contrast).

### Additional improvements implemented (post-audit)

- **Language (ES/EN)**: EN/ES button in header; full UI, species, study types, and dates translated; preference stored in cookie and localStorage; layout metadata by language.
- **Study management**: Delete study with confirmation dialog; change status (Draft / Active / Completed) from studies table and report detail; API `PATCH /api/reports/[id]` (status) and `DELETE /api/reports/[id]`.
- **Drafts**: “Create as draft” option in new report form; new reports can be saved as draft or active.
- **Data consistency**: Species, dates, and study/treatment types display in the selected language (e.g. Canine vs Canino, “November 20, 2025” vs “20 de noviembre de 2025”).

---

## 4. Tech Stack

- **React 19** + **TypeScript**
- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **Mini DB**: JSON files (`users.json`, `reports.json`, `clinics.json`) + API Routes (auth, profile, clinic, reports)
- **i18n**: Language context (ES/EN), copy in `lib/constants.ts`, cookie + localStorage for persistence

---

## 5. Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You will be redirected to `/login` if there is no session.

### Main flows

- **Login**: Email or username + password. Examples: `fernanda@diagnovet.ai` / `FERNANDASVET` — `demo123`; `demo@diagnovet.ai` / `demo` — `demo123`.
- **Registration**: Create account → **Almost done** (profile: phone, title Dr./Dra./M.V., optional license) → **Veterinary Information** (clinic). “Skip for now” available on both steps.
- **Dashboard**: Stats, search by patient/guardian/referrer, report list, empty state with CTA “Create your first report”, success banner when creating a report.
- **Create report** (Analyze Patient): Form by sections (Patient, Referrer & Guardian, Study), “Create as draft” option, image upload with preview. Data in `data/reports.json`.
- **My studies**: Table with pagination; change status from select; delete with confirmation; link to each report detail.
- **Study detail**: Report data; status selector; “Delete study” button with confirmation.
- **Language**: EN/ES button in header; switches full UI, species, study types, and date format.
- **Settings**: Personal profile and clinic data; text follows selected language.

**Base de datos**

- **Solo local (por defecto)**: usa archivos JSON en `data/` (`users.json`, `reports.json`, `clinics.json`). El login y los datos funcionan solo en tu máquina.
- **Para que funcione para todos los usuarios** (login, registro, estudios compartidos en producción):
  1. Crea un proyecto en [Supabase](https://supabase.com).
  2. En el Dashboard → SQL Editor, ejecuta el contenido de `supabase/schema.sql` para crear las tablas `users`, `clinics` y `reports`.
  3. En tu despliegue (p. ej. Vercel), define las variables de entorno:
     - `SUPABASE_URL` (Project Settings → API → Project URL)
     - `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API → service_role, secret)
  4. Vuelve a desplegar. La app detectará estas variables y usará Supabase en lugar de los JSON; el mismo código sirve para todos los usuarios.

Puedes copiar `.env.example` a `.env.local` y rellenar los valores para probar con Supabase en local.

---

## 6. Deliverables (for the challenge)

- **Repository**: Public GitHub repo with this README, prototype code, and analysis/strategy document.
- **Demo**: Deployed on Vercel (or link provided in the repo).
- **“Why” document**: Sections 1 (Analyze & Audit), 2 (Strategic Overview), and 3 (The Prototype – Why This Improvement).
- **Video**: Screen-share ≤5 min showing the prototype and defending design decisions (by the candidate).

---

## 7. Project structure

```
app/
  page.tsx                         # Redirects to /login or /dashboard by session
  layout.tsx, globals.css
  login/page.tsx                   # Login (email/username + password)
  register/page.tsx                # Registration → onboarding
  onboarding/
    almost-done/page.tsx, AlmostDoneForm.tsx
    clinic/page.tsx, ClinicForm.tsx
  dashboard/page.tsx, DashboardClient.tsx
  analyze/page.tsx, AnalyzePatientForm.tsx
  studies/page.tsx                 # My studies (StudiesTable)
  studies/[id]/page.tsx, StudyDetailActions.tsx
  settings/page.tsx, SettingsContent.tsx
  api/auth/*, api/profile, api/clinic, api/reports, api/reports/[id]
contexts/
  LocaleContext.tsx                # Provider and useLocale for ES/EN
lib/
  auth.ts, db.ts, reports-db.ts, clinics-db.ts
  types.ts, constants.ts, format.ts
  locale.ts, locale-server.ts      # Cookie and getCopyAsync for i18n
data/
  users.json, reports.json, clinics.json
components/
  AppHeader.tsx, AuthCard.tsx, EmptyState.tsx, ReportListItem.tsx, StudiesTable.tsx
  OnboardingLayout.tsx, WhySection.tsx, UserProfileDropdown.tsx
  ui/ (Button, Card, ConfirmDialog, Input, Label, Select, etc.)
```

---

_diagnoVET – Transforming veterinary medicine with AI._
