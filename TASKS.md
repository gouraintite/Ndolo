# TASKS.md — Ndolo

## Sprint 1 — Home page ✅ DONE

**Goal:** Home page fully demonstrable with mock data.

- [x] S1-01  Design tokens (Urbanist, orange palette, CSS `@property` glow)
- [x] S1-02  `FeaturedCenter` — full-bleed hero, 30s rotation, KPIs, cagnotte bar
- [x] S1-03  `CenterCard` — trust badge, region, cagnotte progress
- [x] S1-04  `CenterFilters` — 4 filter chips, live filtering
- [x] S1-05  `HomePage` — full layout with all sections
- [x] S1-06  `PublicLayout` — sticky header, burger menu, FR/EN toggle, footer
- [x] S1-07  i18n — full FR + EN strings in `locales/*/translation.json`
- [x] S1-08  `TrustBadge` + `UrgentBadge` — certified / verified / unverified / urgent
- [x] S1-09  Routing: `/` → `HomePage`, `/centres/:id` → `CenterDetailPage` (shell)
- [x] S1-10  Vitest: `Button`, `Input`, `trustLevel` — 14 tests passing
- [x] S1-11  Hero redesign: full-bleed background image, directional orange scrim

---

## Sprint 2 — Backend + Auth ✅ DONE

- [x] `DesignTimeDbContextFactory` — enables `dotnet ef migrations add` without running DB
- [x] `InitialCreate` EF migration generated
- [x] `DbSeeder` — auto-migrates + seeds roles, admin user, 6 mock centers in dev
- [x] `ICenterService` + `CenterService` — list (paginated, filterable) + get by id
- [x] `CentersController` — `GET /api/centers`, `GET /api/centers/{id}`
- [x] `LoginForm` — real form wired to `authApi.login` via TanStack Query mutation
- [x] `RegisterForm` — real form wired to `authApi.register`
- [x] `useCenters` hook — TanStack Query with graceful mock fallback when API is down
- [x] `HomePage` centers grid — uses `useCenters`, loading skeleton while fetching

### To run the full stack locally
```bash
# 1. Start the database
docker compose up db -d

# 2. Start the API (auto-migrates + seeds on first run)
cd backend && dotnet run --project Ndolo.Api

# 3. Start the frontend
cd frontend && npm run dev

# Swagger: http://localhost:5000/swagger
# App:     http://localhost:5173
```

---

## Sprint 3 — Verification workflow

- [ ] `VerificationDossier` submission endpoint (center manager)
- [ ] Auto-signal checks: geoloc coherence, duplicate detection, photo freshness, completeness
- [ ] `VerificationDossier` state machine enforced in service layer (`draft → submitted → auto_check → in_review`)
- [ ] Moderator back-office queue: `GET /api/moderation/dossiers`
- [ ] Moderator decision endpoint: `POST /api/moderation/dossiers/{id}/decision`
- [ ] Email/SMS notifications via `INotificationService` on submit + decision
- [ ] Frontend: center manager dashboard (submit dossier, track status)
- [ ] Frontend: moderator queue page (protected, `Moderator` role)

## Sprint 4 — Cagnottes

- [ ] `POST /api/cagnottes` — guard: `center.TrustLevel >= L2`
- [ ] Milestone creation + ordering
- [ ] Donation flow via `IPaymentProvider` (mock)
- [ ] `ProofOfUse` submission (`POST /api/milestones/{id}/proof`)
- [ ] Milestone unlock on proof approval (moderator)
- [ ] Frontend: cagnotte creation form (center manager)
- [ ] Frontend: donation flow (donor)
- [ ] Frontend: proof upload + milestone timeline
