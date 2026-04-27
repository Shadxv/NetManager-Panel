# NetManager — Panel

> **Note:** This repository is a public mirror of the original private repository maintained by the DreamMC Network organization. It is published for portfolio and reference purposes.

> **Status:** Minimum Viable Product. This is an early-stage implementation — the panel is functional for core use cases but does not yet cover all planned features (file manager, database viewer, application settings, and extended service controls are partially implemented or pending).

A web-based management dashboard for the **DreamMC Network** infrastructure. The panel provides a unified interface for deploying and monitoring Minecraft services on Kubernetes, managing team members and their permissions, and configuring roles across the network.

---

<video src="https://raw.githubusercontent.com/Shadxv/NetManager-Panel/main/docs/assets/example.mp4" controls width="100%">
</video>

---

## Part of the NetManager ecosystem

| Component | Repository | Description |
|---|---|---|
| **Panel** | *(this repo)* | Web management UI |
| **REST API** | [NetManager-RestAPI](https://github.com/Shadxv/NetManager-RestAPI) | Required backend — authentication, users, roles |
| **Orchestrator** | [NetManager](https://github.com/Shadxv/NetManager) | Kubernetes service orchestration and CLI |

Both the REST API and the Orchestrator must be running for the panel to be fully functional.

---

## Features

### Implemented

| Area | What it provides |
|---|---|
| **Authentication** | JWT login, first-time account setup, forced password reset flow |
| **Dashboard** | Statistics overview — running/stopped services, pod health, instance distribution chart |
| **Services** | List all Paper/Velocity services, view console output, manage pods, delete services |
| **Service versions** | Browse available versions and switch between them |
| **Users** | Invite users by email, view and edit roles and permissions, delete accounts |
| **Roles** | Create roles, set name and colour, configure bitwise permission flags, reorder hierarchy |
| **Notifications** | Toast popup system for operation feedback |
| **Localisation** | Full Polish and English translations |
| **Dark / light mode** | Theme toggle with persistent preference |
| **Responsive layout** | Works on desktop and mobile |

### Planned / in progress

- File manager — browse and edit service config files without FTP
- Database viewer — inspect and manage MongoDB collections
- Application settings — global network configuration
- Extended service controls — start, stop, rebuild from the panel
- Activity log — audit trail for team actions

---

## Technology stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS 4, Headless UI 2 |
| State | Redux Toolkit 2, React Context |
| HTTP | Axios 1.13 |
| Forms | Formik 2 |
| Charts | Recharts 3 |
| Animations | GSAP 3 |
| Drag & drop | dnd-kit 6 |
| i18n | next-intl 4 (Polish, English) |

---

## Requirements

- Node.js 20+
- Running **[NetManager-RestAPI](https://github.com/Shadxv/NetManager-RestAPI)** instance (authentication, users, roles)
- Running **[NetManager](https://github.com/Shadxv/NetManager)** instance (service and pod data)

---

## Getting started

```bash
npm install
```

Configure the API URLs (see [docs/configuration.md](docs/configuration.md)), then:

```bash
# Development
npm run dev
```

The panel starts on `http://localhost:3000`.

**Default admin credentials** are set when the REST API seeds its database on first run:

| Field | Default |
|---|---|
| Email | `admin` |
| Password | `admin123` (or `ADMIN_DEFAULT_PASSWORD` env var in the REST API) |

---

## Build for production

```bash
npm run build
npm start
```

---

## Configuration

See [docs/configuration.md](docs/configuration.md) for full details.

The panel requires the API base URLs to be set before building. Currently the URLs default to `https://panel.dreammc.pl` — override them for local or self-hosted deployments.

---

## Pages

See [docs/features.md](docs/features.md) for a detailed breakdown of each page.

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Login |
| `/login/setup` | First-time account setup |
| `/login/reset` | Forced password reset |
| `/dashboard` | Statistics overview |
| `/dashboard/services` | Services list |
| `/dashboard/services/[id]` | Service console and pod list |
| `/dashboard/services/[id]/versions` | Version history |
| `/dashboard/services/[id]/settings` | Service settings, delete |
| `/dashboard/services/[id]/pod/[podId]` | Pod details and logs |
| `/dashboard/users` | Users list |
| `/dashboard/users/[id]` | User profile and permissions editor |
| `/dashboard/roles` | Roles list |
| `/dashboard/roles/[id]` | Role editor |

---

## Project structure

```
NetManager-Panel/
├── lib/                        # Redux store, slices, typed hooks
├── messages/                   # i18n translation files (en.json, pl.json)
├── public/                     # Static assets
└── src/
    ├── app/                    # Next.js App Router pages
    │   ├── page.tsx            # Landing page
    │   ├── login/              # Auth flow pages
    │   └── dashboard/          # Protected dashboard pages
    ├── components/
    │   ├── home/               # Landing page components
    │   └── dashboard/          # Dashboard UI components
    │       ├── services/
    │       ├── users/
    │       └── roles/
    ├── hooks/
    │   └── permissions.ts      # Permission checking hook
    ├── types/                  # TypeScript interfaces
    ├── constants/              # API URLs, permission flags, nav config
    ├── utils/                  # Date formatting, log styling helpers
    └── middleware.ts           # Route protection (Next.js middleware)
```

---

## About

This project was created as part of the **DreamMC Network** infrastructure. The source code in this repository represents the public mirror of the internal development repository and may not reflect the latest internal state.
