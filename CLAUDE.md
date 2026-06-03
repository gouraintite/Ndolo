# CLAUDE.md — Ndolo

> **Nom de travail : `Ndolo`** (« l'amour » en duala). Provisoire — find-replace pour renommer.
> Ce fichier est la source de vérité que Claude Code doit lire avant toute tâche. Il décrit **ce qu'on construit, pourquoi, pour qui, et comment**.

---

## 1. Pitch en une phrase

Ndolo est une plateforme web qui rend visibles les orphelinats et associations caritatives du Cameroun (en priorité ceux des zones reculées, non recensés), permet aux gens de leur faire des dons **en confiance**, et relie donateurs et centres autour de mises à jour, photos et histoires de réussite.

## 2. L'idée maîtresse (à ne jamais perdre de vue)

**Ndolo n'est pas un annuaire avec un bouton « donner ». C'est une machine à fabriquer de la confiance.**

Le frein n°1 d'un donateur — surtout dans la diaspora — n'est pas « je ne connais pas ce centre », c'est *« comment je sais que mon argent arrive vraiment à l'enfant ? »*.

- La **visibilité** règle la *découverte*.
- La **confiance** règle la *conversion* (le don réel).

Tout le produit s'architecture donc autour de deux mécaniques qui se renforcent :

1. **Vérifiabilité** — ce centre existe, voici les preuves.
2. **Traçabilité** — voici où va chaque franc, prouvé par l'usage.

Quand un arbitrage produit/technique se pose, trancher en faveur de **la confiance et de la dignité du centre**, jamais au détriment.

## 3. Périmètre & hypothèses

- **Marché** : Cameroun, lancement **national d'emblée** + **diaspora** (Camerounais à l'étranger = premier réservoir de donateurs).
- **Bilingue** : FR/EN dès le départ (i18n non négociable).
- **Mobile-first** : les gérants de centres ont des smartphones bas de gamme et une connexion instable. Chaque écran de saisie doit rester utilisable en 3G.
- **Multi-rail paiement** : Mobile Money (Orange Money, MTN MoMo) pour le local, cartes pour la diaspora.

### Hors périmètre de l'équipe tech (géré par d'autres équipes)
- La **détention des fonds** (custody) et le reversement réel : assurés par un **PSP/agrégateur agréé** externe. Ndolo **n'encaisse jamais l'argent en propre** : la plateforme **orchestre** (objectifs, paliers, conditions de déblocage), le PSP custodie et reverse sur instruction.
- La conformité réglementaire, les agréments, la fiscalité, le cantonnement de compte.
- → Côté code, on isole tout ça derrière une interface `IPaymentProvider` (adapter pattern) : on code la logique métier, le branchement réel viendra ensuite. **Aucune logique de custody en dur dans Ndolo.**

## 4. Personas

| # | Persona | Contexte | Besoin clé |
|---|---------|----------|-----------|
| 1 | **Donateur diaspora** | Camerounais à l'étranger, paie par carte, peur de l'arnaque | Preuve que le centre est réel + voir où va l'argent |
| 2 | **Donateur local** | Au Cameroun, paie en Mobile Money, dons fréquents déclenchés par l'émotion | Friction zéro, MoMo natif |
| 3 | **Gérant de centre** | Peu à l'aise avec le numérique, smartphone bas de gamme, connexion instable | Onboarding simple, mobile-first, upload de preuves facile. **Casse si l'UX est lourde.** |
| 4 | **Contributeur / signaleur** | Bénévole qui connaît un centre non recensé | Déclaration ultra-simple, sans devoir gérer le centre ensuite |
| 5 | **Modérateur / admin** | Interne (toi au début) | Back-office avec file de tâches + tout le contexte sous les yeux |

## 5. Les 3 piliers (par difficulté réelle)

1. **Flux d'argent + orchestration** — le sujet à risque, structure toute l'archi. (Custody déléguée au PSP.)
2. **Confiance / vérification des centres** — le vrai différenciateur (epic 2, la colonne vertébrale).
3. **Découverte** — listing, filtres, « asso à la une ». La plus visible, la plus simple techniquement.

## 6. Modèle de confiance — `TrustLevel` (cœur du produit)

La confiance est une **échelle**, chaque niveau débloque des capacités. Un centre **ne peut pas collecter** tant qu'il n'a pas atteint L2.

| Niveau | Comment l'atteindre | Débloque |
|--------|--------------------|---------|
| **L0 — Déclaré** | Auto-inscrit ou signalé par un contributeur | Listing avec badge « non vérifié ». **Pas de collecte.** |
| **L1 — Identité confirmée** | Pièce d'identité du gérant + existence physique (géoloc + photos datées) | Page centre complète, peut publier du contenu. Collecte bloquée. |
| **L2 — Vérifié** | Docs du centre + référent contactable + validation modérateur | **Peut créer des cagnottes.** Badge vérifié. |
| **L3 — Certifié transparent** | Historique : a livré ses preuves d'usage dans les délais sur cagnottes passées | Boost de ranking + badge premium. |

- **L0 → L1 → L2** : montée pilotée par la modération (humain assisté par machine, cf. §7).
- **L2 → L3** : **automatique**, calculé sur le comportement passé. → « encourage les centres à améliorer leurs pratiques » : la transparence est *récompensée par de la visibilité*.

## 7. Workflow de vérification (epic 2)

### Principe : la machine tamise, l'humain tranche
1. **Vérifs automatiques** à la soumission (réduisent l'intervention humaine) :
   - **Géolocalisation** : cohérence des coordonnées (dans le pays/région, pas en plein océan), distance vs adresse déclarée.
   - **Doublons** : même géoloc / même gérant (téléphone, pièce d'identité) / mêmes photos (hash perceptuel) qu'un centre existant.
   - **Photos** : présence, date/EXIF récente, pas déjà vues ailleurs.
   - **Complétude** : champs obligatoires présents.
   - Chaque vérif produit un **signal** : `green` / `amber` / `red`.
2. Le dossier arrive en **file de modération pré-renseignée** : le modérateur voit tous les signaux d'un coup d'œil, n'intervient pas à froid.
3. **Décision humaine** : `verify` / `reject` / `needs_more_info`.
4. **Notification du déclarant** systématique. En cas de `reject` ou `needs_more_info`, le message explique le problème **et affiche un numéro de téléphone de contact** pour rappeler en cas d'erreur de notre part.

### Machine à états du dossier de vérification
```
draft → submitted → auto_check → in_review → [needs_more_info ↺ submitted] → verified | rejected
```
- `suspended` : état accessible depuis n'importe où (litige/fraude détectée). Gèle le centre **et ses cagnottes en cours**.

### Signaux anti-fraude (à logger dès maintenant, exploités progressivement)
- Détection de doublons (géoloc / gérant / photos).
- Cohérence géoloc + fraîcheur des photos.
- **Signalement communautaire** : bouton « signaler » sur chaque page publique → file de modération.
- Principe : accumuler les signaux tôt plutôt que tout bloquer à l'inscription (sinon on tue l'onboarding du persona 3).

## 8. Cagnottes, paliers & preuve d'usage

Les cagnottes ne sont **pas** de simples barres de progression : elles intègrent dès la v1 le **déblocage par tranches contre preuve**.

- Une **Cagnotte** a un objectif (montant + intitulé : « scolariser un enfant », « reconstruire un mur ») et un ou plusieurs **Milestones** (paliers).
- Le PSP custodie les fonds collectés. Une tranche n'est **débloquée vers le centre** que lorsque le centre fournit une **ProofOfUse** (photo du mur reconstruit, attestation de scolarité, facture) validée par la modération.
- C'est le pont entre pilier argent et pilier confiance : la preuve rassure le donateur **et** garde-fou anti-fraude.

## 9. « À la une » — asso du jour (équité)

- Le header de la home met en avant **un centre différent chaque jour**, par **rotation algorithmique équitable** (pas toujours les mêmes ; pondération par : besoin urgent, ancienneté de la dernière mise en avant, niveau de confiance ≥ L2).
- Contenu mis en avant : **belle image digne** (enfant souriant, cérémonie, groupe, diplôme, fierté — **jamais d'imagerie misérabiliste**), **chiffres clés**, **bouton** → cagnotte active, sinon page détail.
- **Mode test** : en dev, la rotation s'effectue **toutes les 30 s** (constante `ROTATION_INTERVAL_MS`, prod = 1×/jour). Données mockées (cf. TASKS Sprint 1).

## 10. Listing & filtres (découverte)

- Page de listing des centres avec **classement / mise en avant** sur : **impact social**, **transparence financière** (score dérivé du comportement de preuve, cf. L3), **besoins urgents**.
- **Filtres** : région, type (orphelinat / asso / centre d'aide), niveau de confiance, besoin urgent, présence de cagnotte active.
- Objectif : choix éclairés du donateur + incitation des centres à mieux faire.

## 11. Architecture proposée — *À CONFIRMER PAR LE PRODUCT OWNER*

> Tu te réserves le droit de valider/remplacer. Voici une base cohérente avec React + ASP.NET :

**Front**
- React + **Vite** + **TypeScript**
- **React Router** (routing), **TanStack Query** (état serveur / cache / retries — clé en connexion instable)
- **Tailwind CSS** (handoff fluide depuis Claude Design ; tokens de design centralisés)
- **react-i18next** (FR/EN)
- Optimisations connexion faible : lazy-loading, images responsives + placeholders, optimistic UI, mode offline-friendly sur les écrans de saisie

**Back**
- **ASP.NET Core** (Web API, .NET 8+)
- **Entity Framework Core**
- **PostgreSQL** + **PostGIS** (la géoloc des centres est centrale : dédoublonnage spatial, recherche par proximité)
- **ASP.NET Identity + JWT** (auth, rôles)
- **Stockage objet** S3-compatible / Azure Blob (photos, preuves)
- **Jobs** : Hangfire ou Hosted Service (rotation « asso du jour », checks auto, recalcul des scores)
- **Notifications** : abstraction `INotificationService` → email + **SMS** (le SMS est critique pour le gérant et le numéro de rappel)

**Intégrations isolées (adapters)**
- `IPaymentProvider` (PSP MoMo + cartes) — implémentation réelle hors scope tech immédiat
- `IStorageProvider`, `INotificationService`, `IFraudSignalProvider`

**Découpage back** : Clean Architecture *ou* vertical slices (Feature folders). Domaine riche : `TrustLevel`, machines à états explicites.

## 12. Modèle de domaine (entités clés)

```
User            (Id, Roles[], Phone, Email, Locale)
  Roles: Donor | CenterManager | Contributor | Moderator | Admin

Center          (Id, Name, Type, Description, GeoLocation, Region,
                 TrustLevel: L0..L3, VerificationStatus, ManagerId, CreatedBy)
  Type: Orphanage | Charity | AidCenter

VerificationDossier (Id, CenterId, Status, AutoSignals[], Documents[],
                     ModeratorDecisions[], SubmittedAt)
  AutoSignal: { Kind: GeoLocation|Duplicate|PhotoFreshness|Completeness,
                Result: Green|Amber|Red, Detail }

CenterPost      (Id, CenterId, Title, Body, Media[], PublishedAt)   // quotidien, histoires

Cagnotte        (Id, CenterId, Title, Goal: {Amount, Currency, Purpose},
                 Status, RaisedAmount, Milestones[])
  Status: Draft | Active | Funded | Suspended | Closed

Milestone       (Id, CagnotteId, Order, Amount, Description,
                 UnlockStatus: Locked|ProofPending|Released)

ProofOfUse      (Id, MilestoneId, Media[], Note, ReviewStatus, ReviewedBy)

Donation        (Id, CagnotteId, DonorId?, Amount, Channel: MoMo|Card,
                 ProviderRef, Status, Anonymous)

Report          (Id, TargetType, TargetId, ReporterId?, Reason, Status)  // signalements

FeaturedRotation (Id, CenterId, Date, Score)   // asso du jour
```

## 13. Conventions Claude Code

- **Langue** : code & identifiants en **anglais** ; commentaires métier en FR autorisés ; contenu UI via i18n (jamais de texte FR/EN en dur dans les composants).
- **Mobile-first** systématique (designer pour 360px d'abord).
- **Accessibilité** : sémantique, contrastes AA, `prefers-reduced-motion` respecté (cf. hero animé), navigation clavier.
- **API REST** : ressources au pluriel, verbes HTTP propres, pagination par défaut, erreurs au format Problem Details (RFC 7807).
- **États explicites** : les `enum` (`TrustLevel`, statuts) pilotent des **guards**. Ex. : `if (center.TrustLevel < L2) → création de cagnotte interdite`.
- **Pas de logique de custody** dans Ndolo : tout passe par `IPaymentProvider`.
- **Mock-first** : tant que les intégrations externes ne sont pas branchées, fournir des implémentations mock (`MockPaymentProvider`, données de centres mockées) pour que la home et les parcours soient démontrables.
- **Tests** : unitaires sur le domaine (machines à états, guards de TrustLevel, rotation équitable).
- **Commits** : conventionnels (`feat:`, `fix:`, `chore:`…).
- **Lire `TASKS.md`** pour l'ordre de priorité. **La home d'abord.**

## 14. Glossaire
- **Centre** : orphelinat, association caritative ou centre d'aide.
- **Cagnotte** : collecte fléchée vers un objectif précis d'un centre.
- **TrustLevel (L0–L3)** : échelle de confiance débloquant des capacités.
- **ProofOfUse** : preuve d'usage débloquant une tranche de fonds.
- **À la une** : centre mis en avant du jour, rotation équitable.
- **PSP** : prestataire de services de paiement (custody externe).

## 15. Arborescene

project-root/
│
├── backend/
│   │
│   ├── ProjectName.sln                       # Solution liant tous les projets
│   │
│   ├── ProjectName.Api/                      # API REST principale
│   │   │
│   │   ├── Controllers/                      # Endpoints HTTP
│   │   │   ├── AuthController.cs
│   │   │   └── [Resource]Controller.cs
│   │   │
│   │   ├── Services/                         # Logique métier
│   │   │   ├── IAuthService.cs               # Interface (DI + testabilité)
│   │   │   ├── AuthService.cs
│   │   │   ├── IJwtService.cs
│   │   │   └── JwtService.cs
│   │   │
│   │   ├── Models/                           # Entités EF Core (domaine)
│   │   │   ├── User.cs
│   │   │   └── [Entity].cs
│   │   │
│   │   ├── Data/                             # Couche persistance
│   │   │   ├── ApplicationDbContext.cs       # DbContext + DbSets + OnModelCreating
│   │   │   └── Configurations/               # Fluent API par entité (si projet grossit)
│   │   │       └── UserConfiguration.cs
│   │   │
│   │   ├── Dtos/                             # Data Transfer Objects (séparés des entités)
│   │   │   ├── Auth/
│   │   │   │   ├── RegisterRequest.cs
│   │   │   │   ├── LoginRequest.cs
│   │   │   │   ├── LoginResponse.cs
│   │   │   │   └── UserResponse.cs
│   │   │   └── [Resource]/
│   │   │
│   │   ├── Middleware/                       # Middlewares custom (si besoin)
│   │   │   └── ExceptionHandlingMiddleware.cs
│   │   │
│   │   ├── Migrations/                       # Versioning du schéma BDD
│   │   │   ├── YYYYMMDDHHMMSS_InitialCreate.cs
│   │   │   └── ApplicationDbContextModelSnapshot.cs
│   │   │
│   │   ├── Properties/
│   │   │   └── launchSettings.json
│   │   │
│   │   ├── appsettings.json                  # Config publique
│   │   ├── appsettings.Development.json      # Override dev (gitignored)
│   │   ├── Program.cs                        # Entry point + DI + pipeline
│   │   ├── ProjectName.Api.csproj
│   │   ├── packages.lock.json
│   │   ├── Dockerfile                        # Multi-stage
│   │   └── .dockerignore
│   │
│   └── ProjectName.Api.Tests/                # Projet de tests xUnit
│       │
│       ├── Services/                         # Tests unitaires (logique pure)
│       │   ├── AuthServiceTests.cs
│       │   └── JwtServiceTests.cs
│       │
│       ├── Controllers/                      # Tests d'intégration HTTP
│       │   └── AuthControllerIntegrationTests.cs
│       │
│       ├── CustomWebApplicationFactory.cs    # Bootstrap API en mémoire pour tests
│       └── ProjectName.Api.Tests.csproj
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── api/                              # Clients HTTP + appels API
│   │   │   ├── client.ts                     # Instance Axios + intercepteurs
│   │   │   ├── auth.ts                       # authApi.register, login, me
│   │   │   └── [resource].ts
│   │   │
│   │   ├── components/                       # Composants UI réutilisables
│   │   │   ├── ui/                           # Design system (génériques)
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   └── Input.test.tsx
│   │   │   ├── layout/                       # Headers, Sidebars, Footers
│   │   │   │   ├── PublicLayout.tsx
│   │   │   │   └── AuthenticatedLayout.tsx
│   │   │   └── ProtectedRoute.tsx            # Wrapper d'auth pour routes privées
│   │   │
│   │   ├── features/                         # Composants par domaine métier
│   │   │   ├── auth/
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── RegisterForm.test.tsx
│   │   │   │   └── LoginForm.tsx
│   │   │   └── [domain]/
│   │   │
│   │   ├── pages/                            # Une page par route
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── DashboardPage.tsx
│   │   │
│   │   ├── hooks/                            # Custom hooks
│   │   │   ├── AuthContext.tsx               # Provider d'auth global
│   │   │   ├── useAuth.ts                    # Hook consumer du Context
│   │   │   └── useFetch.ts                   # Hook générique de fetch
│   │   │
│   │   ├── types/                            # Types TypeScript partagés
│   │   │   ├── auth.ts                       # Miroir des DTOs backend
│   │   │   └── api.ts                        # ApiError, génériques
│   │   │
│   │   ├── utils/                            # Helpers purs (format, validate)
│   │   │   └── validators.ts
│   │   │
│   │   ├── test/                             # Setup des tests
│   │   │   └── setup.ts
│   │   │
│   │   ├── App.tsx                           # Routing global
│   │   ├── main.tsx                          # Entry point + Providers
│   │   └── index.css                         # @import "tailwindcss"
│   │
│   ├── public/                               # Assets statiques
│   ├── .env                                  # Variables d'env locales (gitignored)
│   ├── .env.example                          # Template versionné
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json                         # Config TS + alias "@/*"
│   ├── vite.config.ts                        # Plugins + alias + tests Vitest
│   ├── eslint.config.js
│   ├── .prettierrc
│   ├── .prettierignore
│   ├── nginx.conf                            # Config nginx pour le serve en prod
│   ├── Dockerfile                            # Multi-stage : node → nginx
│   └── .dockerignore
│
├── .github/
│   └── workflows/
│       ├── backend-ci.yml                    # Lint + tests + build .NET
│       ├── frontend-ci.yml                   # Lint + format + tests + build React
│       └── docker-build.yml                  # Build des images Docker
│
├── .vscode/
│   ├── settings.json                         # Format on save, defaults
│   └── extensions.json                       # Extensions recommandées
│
├── docker-compose.yml                        # Orchestration : back + front + DB
├── .gitignore                                # .NET + Node + IDE + OS + secrets
└── README.md                                 # Architecture, stack, démarrage

# Backend — Layered architecture
HTTP Request
    ↓
Controllers      → Validation entrée (DTOs + Data Annotations)
    ↓               Gestion des codes HTTP (200, 201, 400, 401, 404, 409)
    ↓
Services         → Logique métier pure
    ↓               Orchestration des opérations
    ↓               Levée d'exceptions métier (InvalidOperationException, etc.)
    ↓
DbContext        → Accès aux données via EF Core
    ↓               LINQ → SQL généré automatiquement
    ↓
Database         → SQL Server / PostgreSQL

Règles strictes :

Les Controllers ne contiennent aucune logique métier — juste mappage HTTP ↔ services
Les Services ne connaissent rien d'HTTP — pas de IActionResult, pas de codes statut
Les DTOs sont séparés des entités — jamais exposer une entité avec un PasswordHash au client
Toute dépendance externe passe par une interface (IXxxService) injectée via DI

# Frontend — Feature-based architecture

src/
├── components/ui/      → composants génériques, réutilisables partout
├── components/layout/  → layouts (header, sidebar, footer)
├── features/           → regroupement par DOMAINE MÉTIER, pas par type technique
├── pages/              → une page par route
├── hooks/              → logique partagée (auth, fetch, state global)
├── api/                → couche d'accès HTTP
├── types/              → types TS partagés
└── utils/              → helpers purs