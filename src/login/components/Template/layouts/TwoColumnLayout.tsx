/**
 * This file has been claimed for ownership from @oussemasahbeni/keycloakify-login-shadcn version 250004.0.24.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "login/components/Template/layouts/TwoColumnLayout.tsx" --revert
 */

// VISI: the photo fills the left half with the logo and welcome line over it,
// and the form sits on the right. Below lg the photo is dropped and the form's
// own logo block (TemplateContent) shows instead.

import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { resolveAssetUrl } from "@/login/shared/resolveAssetUrl";
import type { ReactNode } from "react";
import { TemplateTopBar } from "../TemplateTopBar";

export function TwoColumnLayout(props: { content: ReactNode; logoUrl: string }) {
    const { content, logoUrl } = props;

    const { kcContext } = useKcContext();

    const { msg } = useI18n();

    const imageUrl = resolveAssetUrl(kcContext.properties.SHADCN_THEME_SIDE_IMAGE_URL);
    const appName =
        kcContext.properties.SHADCN_THEME_APP_NAME ||
        kcContext.realm.displayName ||
        kcContext.realm.name;

    return (
        <div className="grid min-h-svh lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <aside className="relative hidden overflow-hidden bg-neutral-950 lg:block">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45"
                />

                <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white xl:p-14">
                    <div className="flex items-center gap-3">
                        <img src={logoUrl} alt="" className="size-11" />
                        <span className="text-lg font-semibold tracking-tight">{appName}</span>
                    </div>

                    <p className="max-w-md text-2xl font-medium leading-snug tracking-tight text-white/95 xl:text-3xl">
                        {msg("welcomeMessage")}
                    </p>
                </div>
            </aside>

            <div className="relative flex min-h-svh flex-col lg:min-h-0">
                <TemplateTopBar />

                <div className="flex flex-1 items-center justify-center p-6 pt-20 md:p-10">
                    <main className="w-full max-w-md">{content}</main>
                </div>
            </div>
        </div>
    );
}
