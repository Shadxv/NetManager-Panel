# Configuration reference

## API URLs

The panel communicates with two backend services. Their base URLs are defined in `src/constants/index.ts`:

| Constant | Default value | Points to |
|---|---|---|
| `API_URL` | `https://panel.dreammc.pl/api/v1` | NetManager-RestAPI |
| `GATEWAY_URL` | `https://panel.dreammc.pl/gateway/v1` | NetManager (Gateway API) |
| `SSE_URL` | `https://panel.dreammc.pl/gateway/events` | NetManager (Server-Sent Events) |

For local development, update these values to match your running instances, e.g.:

```ts
// src/constants/index.ts
export const API_URL     = "http://localhost:8080/api/v1";
export const GATEWAY_URL = "http://localhost:4000/gateway/v1";
export const SSE_URL     = "http://localhost:4000/gateway/events";
```

> Alternatively, these can be moved to environment variables (`NEXT_PUBLIC_*`) to avoid editing source files for each environment.

---

## Next.js environment variables

No `.env` file is required by default. If you refactor the URL constants to env vars, create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_GATEWAY_URL=http://localhost:4000/gateway/v1
NEXT_PUBLIC_SSE_URL=http://localhost:4000/gateway/events
```

---

## Internationalisation

The active locale is stored in the `NEXT_LOCALE` cookie. Supported values:

| Value | Language |
|---|---|
| `en` | English (default) |
| `pl` | Polish |

The locale can be changed from the account menu in the panel. Translation files are in `messages/en.json` and `messages/pl.json`.

---

## Theme

The active theme (`light` / `dark`) is stored in the browser's `localStorage` under the Redux `preferences` key. It defaults to `light` if not set. The theme is toggled from the account menu.

---

## Authentication tokens

| Storage | Key | Lifetime |
|---|---|---|
| `localStorage` | `nm_auth_token` | Until logout or expiry |
| Cookie | `nm_auth_token` | 7 days (Secure, SameSite=Strict) |

The token is injected into all outgoing Axios requests as a Bearer token automatically. If the token is missing or expired the middleware redirects to `/login`.

---

## Remote image domains

The Next.js image optimisation pipeline is configured to allow avatars from GitHub (`avatars.githubusercontent.com`). If you use a different avatar provider, add its hostname to `next.config.ts`:

```ts
images: {
  remotePatterns: [
    { hostname: "avatars.githubusercontent.com" },
    { hostname: "your-avatar-host.example.com" },
  ],
},
```
