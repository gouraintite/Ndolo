# TASKS.md — Ndolo

## Sprint 1 — Home page

**Goal:** Home page fully demonstrable with mock data, no real backend calls needed.

### Done when
- [ ] Home page loads at `localhost:5173`
- [ ] "Asso du jour" hero cycles through mock centers every 30s (dev mode)
- [ ] Center listing shows mock cards with TrustLevel badge
- [ ] Filters panel renders (UI only, not wired)
- [ ] FR/EN language switch works
- [ ] All CI checks green

### Tasks
- [ ] **S1-01** Apply design tokens from Canva/Claude Design output (colors, typography, spacing)
- [ ] **S1-02** `PublicLayout` — header with logo, nav links, lang switch (FR/EN), footer
- [ ] **S1-03** `FeaturedCenter` — hero with image, center name, key stats, CTA button, 30s rotation
- [ ] **S1-04** `CenterCard` — name, region, `TrustBadge`, active cagnotte indicator
- [ ] **S1-05** `CenterFilters` — region, type, trust level, urgent checkboxes (UI only)
- [ ] **S1-06** `HomePage` — wire `FeaturedCenter` + filter + `CenterCard` grid with `MOCK_CENTERS`
- [ ] **S1-07** `TrustBadge` — style L0 (grey) → L1 (blue) → L2 (green) → L3 (gold)
- [ ] **S1-08** `CenterDetailPage` — shell with center name, description, posts list, cagnotte section
- [ ] **S1-09** i18n — fill all FR + EN keys in `locales/*/translation.json`
- [ ] **S1-10** Tests — `Button`, `Input`, `FeaturedCenter` rotation logic (Vitest)
- [ ] **S1-11** `LoginPage` / `RegisterPage` — form layout (no real API call yet)

## Sprint 2 — Backend + Auth (next)

- [ ] Run EF migrations against local PostgreSQL (`docker compose up db`)
- [ ] Wire `AuthController` end-to-end (register + login)
- [ ] Connect frontend `LoginForm` / `RegisterForm` to real API
- [ ] `CentersController` — list + get endpoints with mock seed data
- [ ] Replace `MOCK_CENTERS` with real API calls via TanStack Query

## Sprint 3 — Verification workflow

- [ ] `VerificationDossier` submission flow (center manager)
- [ ] Auto-signal checks (geoloc coherence, completeness)
- [ ] Moderator back-office queue
- [ ] Email/SMS notifications via `INotificationService`

## Sprint 4 — Cagnottes

- [ ] Create cagnotte (guard: TrustLevel ≥ L2)
- [ ] Milestone creation
- [ ] Donation flow (mock `IPaymentProvider`)
- [ ] `ProofOfUse` submission + milestone unlock
