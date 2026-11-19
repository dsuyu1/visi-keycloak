import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import { defineConfig } from "vite";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";

// The SHADCN_THEME_* defaults below are VISI's look. Each can be overridden
// without a rebuild by setting the same-named environment variable on Keycloak.
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        keycloakify({
            themeName: "keycloakify-starter",
            accountThemeImplementation: "none",
            environmentVariables: [
                { name: "SHADCN_THEME_LOGO_WHITE_URL", default: "%BASE_URL%/visi-mark.png" },
                { name: "SHADCN_THEME_LOGO_DARK_URL", default: "%BASE_URL%/visi-mark.png" },
                { name: "SHADCN_THEME_APP_NAME", default: "VISI" },
                { name: "SHADCN_THEME_LAYOUT", default: "two-column" },
                { name: "SHADCN_THEME_SIDE_IMAGE_URL", default: "%BASE_URL%/login-bg.jpg" },
                { name: "SHADCN_THEME_PRESET", default: "orange" },
                { name: "SHADCN_THEME_BASE", default: "neutral" },
                { name: "SHADCN_THEME_RADIUS", default: "default" },
                { name: "SHADCN_THEME_FONT", default: "geist" },
                { name: "SHADCN_THEME_PLACEHOLDER", default: "true" },
                // Where the Home button and the logo go. Fixed on purpose: the
                // upstream Home button used the client's Base URL, which sent
                // people somewhere other than the VISI site.
                { name: "VISI_HOME_URL", default: "https://visiutrgv.org/" }
            ]
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "src")
        }
    }
});
