/**
 * This file has been claimed for ownership from @oussemasahbeni/keycloakify-login-shadcn version 250004.0.24.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "login/components/Template/TemplateTopBar.tsx" --revert
 */

// VISI: the Home button always goes to the VISI site (VISI_HOME_URL).
// Upstream used kcContext.client.baseUrl, falling back to the origin of a
// redirect_url query parameter, so where it went depended on each Keycloak
// client's settings. That is what sent people to a download instead of home.

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/login/components/ui/ThemeToggle";
import { FiHome } from "react-icons/fi";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import { Languages } from "../ui/Langauges";

export function TemplateTopBar() {
    const { kcContext } = useKcContext();
    const { enabledLanguages } = useI18n();

    const homeUrl = kcContext.properties.VISI_HOME_URL || "https://visiutrgv.org/";

    return (
        <div className="absolute inset-x-4 top-4 z-20 flex items-center gap-2">
            <Button type="button" variant="outline" size="icon" asChild>
                <a href={homeUrl} aria-label="VISI home">
                    <FiHome />
                </a>
            </Button>

            {kcContext.darkMode !== false && <ModeToggle />}

            {enabledLanguages.length > 1 && <Languages />}
        </div>
    );
}
