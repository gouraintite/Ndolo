# Ndolo

> **Ndolo** — « l'amour » en duala.

Plateforme web qui rend visibles les orphelinats et associations caritatives du Cameroun, permet de leur faire des dons en confiance, et relie donateurs et centres autour de mises à jour, photos et histoires de réussite.

---

## Pourquoi Ndolo ?

Le frein numéro un d'un donateur — surtout dans la diaspora — n'est pas _« je ne connais pas ce centre »_, c'est **« comment je sais que mon argent arrive vraiment à l'enfant ? »**.

Ndolo est une **machine à fabriquer de la confiance**, pas un simple annuaire avec un bouton « donner » :

- **Visibilité** → découverte des centres, y compris ceux des zones reculées non recensés
- **Vérifiabilité** → chaque centre prouve son existence (géolocalisation, photos datées, documents)
- **Traçabilité** → les fonds sont débloqués par tranches uniquement sur présentation de preuves d'usage

---

## Stack technique

| Couche       | Technologies                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------- |
| **Frontend** | React 19 · Vite · TypeScript · Tailwind CSS · TanStack Query · react-i18next · React Router    |
| **Backend**  | ASP.NET Core (.NET 10) · Entity Framework Core · PostgreSQL + PostGIS · ASP.NET Identity · JWT |
| **Jobs**     | Hangfire (rotation « asso du jour », checks automatiques)                                      |
| **Paiement** | Interface `IPaymentProvider` — custody déléguée à un PSP externe (MoMo + carte)                |
| **Infra**    | Docker Compose · GitHub Actions CI                                                             |

---

## Architecture

```
orfans/
├── backend/
│   ├── Ndolo.Api/          # API REST — Controllers · Services · Models · EF Core
│   └── Ndolo.Api.Tests/    # Tests xUnit + FluentAssertions + Moq
├── frontend/
│   └── src/
│       ├── api/            # Clients HTTP (Axios)
│       ├── components/     # UI generiques + layouts
│       ├── features/       # Composants par domaine (centers, auth)
│       ├── pages/          # Une page par route
│       ├── hooks/          # Auth context, custom hooks
│       ├── types/          # Types TypeScript partagés
│       └── locales/        # Traductions FR / EN
├── .github/workflows/      # CI backend · frontend · Docker
├── docker-compose.yml
└── TASKS.md                # Roadmap Sprint 1–4
```

---

## Démarrage rapide

### Prérequis

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

### 1. Cloner le dépôt

```bash
git clone https://github.com/<your-org>/ndolo.git
cd ndolo
```

### 2. Lancer la base de données

```bash
docker compose up db -d
```

### 3. Backend

```bash
cd backend
dotnet restore
# Appliquer les migrations (première fois)
dotnet ef database update --project Ndolo.Api
dotnet run --project Ndolo.Api
# API disponible sur http://localhost:5000
# Swagger UI : http://localhost:5000/swagger

#Github action will be use for CI/CD
```

### 4. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
# App disponible sur http://localhost:5173
```

### 5. Tout en une commande (Docker)

```bash
docker compose up
# Frontend : http://localhost:3000
# API      : http://localhost:5000
# Swagger  : http://localhost:5000/swagger
```

---

## Tests

```bash
# Backend
dotnet test backend/Ndolo.slnx

# Frontend
cd frontend && npm run test:run
```

---

## Modèle de confiance — TrustLevel

Un centre ne peut **pas collecter** tant qu'il n'a pas atteint le niveau L2.

| Niveau                        | Condition                                         | Débloque                                  |
| ----------------------------- | ------------------------------------------------- | ----------------------------------------- |
| **L0** — Déclaré              | Auto-inscription ou signalement                   | Listing · badge « non vérifié »           |
| **L1** — Identité confirmée   | Pièce d'identité + géoloc + photos datées         | Page complète · publication de contenu    |
| **L2** — Vérifié              | Docs du centre + référent + validation modérateur | **Création de cagnottes** · badge vérifié |
| **L3** — Certifié transparent | Historique de preuves d'usage dans les délais     | Boost de ranking · badge premium          |

---

## Cagnottes & déblocage par tranches

Les fonds collectés sont **custodisés par un PSP externe** (jamais par Ndolo directement). Chaque tranche n'est reversée au centre que lorsqu'il fournit une **ProofOfUse** (photo, facture, attestation) validée par la modération.

---

## Internationalisation

L'interface est bilingue **FR / EN** dès le départ (`react-i18next`). Les chaînes sont dans `frontend/src/locales/`.

---

## Roadmap

Voir [TASKS.md](./TASKS.md) pour le détail Sprint 1 → Sprint 4.

| Sprint | Objectif                                         |
| ------ | ------------------------------------------------ |
| **S1** | Home page (mock data, design tokens à appliquer) |
| **S2** | Auth + API centres branchée                      |
| **S3** | Workflow de vérification + modération            |
| **S4** | Cagnottes + dons + preuves d'usage               |

---

## Contribution

Les PRs sont les bienvenues. Conventions de commit : `feat:` · `fix:` · `chore:` · `docs:`.

---

_Ndolo est un projet en construction. Le nom est provisoire — find-replace pour renommer._
