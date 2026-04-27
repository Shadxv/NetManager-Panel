# Features & pages

## Public pages

### `/` — Landing page

Marketing page describing the panel's capabilities. Contains a hero section, feature cards (services, console access, file management, database management, roles/permissions, deployment), and navigation with language and theme toggles.

---

### `/login` — Login

Email and password form. On success the user is redirected based on their account status:

| Status | Redirect |
|---|---|
| `AUTHENTICATED` | `/dashboard` |
| `REQUIRES_SETUP` | `/login/setup` |
| `REQUIRES_PASSWORD_RESET` | `/login/reset` |

---

### `/login/setup` — First-time setup

Shown to newly invited users. Collects first name, last name, and a permanent password. Marks the account as provisioned and redirects to `/dashboard`.

---

### `/login/reset` — Password reset

Shown when an administrator has forced a password reset. Accepts a new password and redirects to `/dashboard`.

---

## Dashboard pages

All dashboard routes require a valid session. Users without the necessary permissions see disabled controls or are redirected.

---

### `/dashboard` — Overview

Statistics panel:

- Pie chart: running vs stopped services
- Pod health summary: total pods, healthy pods, unhealthy pods
- Instance distribution across service groups

Data is fetched from the NetManager Gateway API (`/gateway/v1/services/stats`).

---

### `/dashboard/services` — Services list

Cards for every registered Paper and Velocity service showing name, type badge, and current status. Includes a **Create service** button that opens the NetManager CLI wizard (service creation is handled by the orchestrator, not the panel directly).

---

### `/dashboard/services/[id]` — Service detail

Two-column layout:

- **Left:** service metadata, type, status, current version
- **Right:** live console output streamed from the orchestrator

Pod list below shows every running pod with its status and quick-access links.

---

### `/dashboard/services/[id]/versions` — Version history

Lists available build versions for the service. Allows switching to a different version (triggers a redeployment via the orchestrator).

---

### `/dashboard/services/[id]/settings` — Service settings

Configuration options for the service. Includes a **Delete service** button with a confirmation dialog. Requires the `UPDATE_SERVICES` permission.

---

### `/dashboard/services/[id]/pod/[podId]` — Pod detail

Details for a single pod instance:

- Status and readiness
- Internal and external IP addresses
- Port mapping
- Log output

---

### `/dashboard/users` — Users list

Filterable and sortable table of all panel accounts:

- Search by name or email
- Sort by name, email, role, or join date
- Role badge per user
- Provisioning status indicator
- **Invite user** button (opens a modal — requires `CREATE_USERS` or `MANAGE_USERS` permission)

---

### `/dashboard/users/[id]` — User profile

Full user profile with:

- Account information (email, name, avatar)
- Role assignment dropdown (respects role hierarchy — cannot assign a role ranked above your own)
- Additional permissions editor (granular string-based permissions)
- "Created by" attribution
- **Delete user** action (requires `REMOVE_USERS` or `MANAGE_USERS`)
- **Reset password** action — sends a reset email and forces the user to set a new password on next login (requires `MANAGE_USERS`)

---

### `/dashboard/roles` — Roles list

Sidebar listing all roles sorted by hierarchy index (highest rank first). On desktop, selecting a role opens the role editor inline. On mobile, navigates to `/dashboard/roles/[id]`.

---

### `/dashboard/roles/[id]` — Role editor

Full role configuration:

- Name and colour picker
- Permission flags editor — toggle each of the 23 permission bits individually
- **Move role** — drag or set a new index to reorder within the hierarchy
- **Delete role** — requires `DELETE_ROLES` permission
- Timestamps (created at, last updated)

Changes take effect immediately for all users assigned to the role.

---

## Permission-gated UI

The panel hides or disables controls based on the current user's permissions. The `usePermissions()` hook provides:

| Method | Description |
|---|---|
| `hasPermission(flag)` | True if the user has the given permission bit |
| `isAdmin` | True if the ADMIN bit (bit 0) is set — bypasses all checks |
| `canManageIndex(n)` | True if the user's role index is lower than `n` (higher rank) |
| `canAssignBit(value)` | True if the user can grant the given permission to others |

The navigation sidebar itself hides sections the current user has no access to.
