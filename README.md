# VISI sign-in theme

The Keycloak login theme for `id.vaqueroisi.org`. It's built with [Keycloakify](https://keycloakify.dev) on the
[shadcn/ui + Tailwind starter](https://docs.keycloakify.dev/starter-themes/shadcn-ui-tailwind)
([`@oussemasahbeni/keycloakify-login-shadcn`](https://github.com/Oussemasahbeni/keycloakify-shadcn-starter)).

The theme keeps the name `keycloakify-starter`, so the realm's login theme setting doesn't change when a new build is deployed.

## What's VISI's

Most files under `src/` are copied in from the npm package by `npm install` (`keycloakify sync-extensions`) and are gitignored. `src/.gitignore` lists the files we own:

| File | Change |
| --- | --- |
| `login/components/Template/layouts/TwoColumnLayout.tsx` | The photos fill the left half and crossfade from one to the next, with the logo, app name and welcome line over them. The logo links to the VISI site. The form is on the right. |
| `login/components/Template/TemplateContent.tsx` | The logo block above the form (shown below `lg`) uses the app name, not the realm name, and links to the VISI site. |
| `login/components/Template/TemplateTopBar.tsx` | The Home button goes to `VISI_HOME_URL` instead of the Keycloak client's Base URL. |
| `login/components/Template/theme/Themes.ts` | The neutral palette and orange buttons follow the VISI Charlotte light and dark themes. |
| `login/i18n.ts` | The welcome line, and "Sign in" instead of "Login". |

To change another file, take ownership of it first, for example `npx keycloakify own --path login/pages/login/Form.tsx`.

The look is set in `vite.config.ts` as defaults for the `SHADCN_THEME_*` settings: logo, app name, layout, side image, colour preset, base palette, radius and font. Setting an environment variable with the same name on the Keycloak container overrides a default without a rebuild. Files in `public/` (the logo and the photos) are referenced as `%BASE_URL%/<file>`.

`SHADCN_THEME_SIDE_IMAGE_URL` takes a comma-separated list of photos, shown in that order, and `VISI_SIDE_IMAGE_SECONDS` (default 8) sets how long each one stays. Only the photo on screen and the next one are downloaded; the show pauses while the tab is in the background and on screens too narrow for the photo column, and stays on the first photo for people who ask for reduced motion. The upstream `image-aside` layout expects a single URL, so keep one photo if you switch to it.

`VISI_HOME_URL` (default `https://visiutrgv.org/`) is where the Home button and the logo go.

The sign-in photo (`public/login-bg.jpg`, `public/login-bg.webp`) is by John Towner on Unsplash.

## Develop

```bash
npm install
npm run dev          # the login page with mock data
npm run storybook    # every page, with toolbar switches for layout, colour and font
```

## Build and deploy

```bash
npm run build-keycloak-theme
```

This needs Maven (`mvn`) on the PATH. It writes `dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar`, the jar for Keycloak 26.

To deploy, copy the jar to `/opt/vaquero/providers/visi-theme.jar` on CT 100 (back up the old one first), then run `docker compose restart keycloak` in `/opt/vaquero`.
