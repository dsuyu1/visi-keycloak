/**
 * This file has been claimed for ownership from @oussemasahbeni/keycloakify-login-shadcn version 250004.0.24.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "login/components/Template/layouts/TwoColumnLayout.tsx" --revert
 */

// VISI: the photo fills the left half with the logo and welcome line over it,
// and the form sits on the right. Below lg the photo is dropped and the form's
// own logo block (TemplateContent) shows instead.
//
// SHADCN_THEME_SIDE_IMAGE_URL may list several photos, comma-separated. They
// crossfade every VISI_SIDE_IMAGE_SECONDS (see SideImages below).

import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { resolveAssetUrl } from "@/login/shared/resolveAssetUrl";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { TemplateTopBar } from "../TemplateTopBar";

export function TwoColumnLayout(props: { content: ReactNode; logoUrl: string }) {
    const { content, logoUrl } = props;

    const { kcContext } = useKcContext();

    const { msg } = useI18n();

    const imageUrls = (kcContext.properties.SHADCN_THEME_SIDE_IMAGE_URL ?? "")
        .split(",")
        .map(url => url.trim())
        .filter(Boolean)
        .map(url => resolveAssetUrl(url))
        .filter((url): url is string => Boolean(url));
    const seconds = Number(kcContext.properties.VISI_SIDE_IMAGE_SECONDS) || 8;
    const appName =
        kcContext.properties.SHADCN_THEME_APP_NAME ||
        kcContext.realm.displayName ||
        kcContext.realm.name;
    // VISI: the logo and name link back to the VISI site.
    const homeUrl = kcContext.properties.VISI_HOME_URL || "https://visiutrgv.org/";

    return (
        <div className="grid min-h-svh lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <aside className="relative hidden overflow-hidden bg-neutral-950 lg:block">
                <SideImages urls={imageUrls} seconds={seconds} />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45"
                />

                <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white xl:p-14">
                    <a
                        href={homeUrl}
                        className="flex w-fit items-center gap-3 rounded-md outline-offset-4 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white"
                    >
                        <img src={logoUrl} alt="" className="size-11" />
                        <span className="text-lg font-semibold tracking-tight">{appName}</span>
                    </a>

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

/**
 * The photos behind the left column, crossfading one to the next.
 *
 * Only the photo on screen and the one after it are in the page, so a visitor
 * who signs in quickly downloads one or two photos, not all of them. The show
 * moves on only once the next photo has loaded, pauses while the tab or the
 * column is hidden, and stays on the first photo for people who ask for
 * reduced motion.
 */
function SideImages(props: { urls: string[]; seconds: number }) {
    const { urls, seconds } = props;

    const [active, setActive] = useState(0);
    // The furthest photo shown so far; everything up to the one after it stays mounted.
    const [reached, setReached] = useState(0);
    const loaded = useRef<boolean[]>([]);

    useEffect(() => {
        if (urls.length < 2) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        // The column is hidden below lg (Tailwind's 1024px), so phones keep the first photo.
        const wide = window.matchMedia("(min-width: 1024px)");

        const timer = window.setInterval(() => {
            if (document.hidden || !wide.matches) return;
            setActive(current => {
                const next = (current + 1) % urls.length;
                return loaded.current[next] ? next : current;
            });
        }, seconds * 1000);

        return () => window.clearInterval(timer);
    }, [urls.length, seconds]);

    useEffect(() => setReached(furthest => Math.max(furthest, active)), [active]);

    const mounted = Math.min(reached + 2, urls.length);

    return (
        <>
            {urls.slice(0, mounted).map((url, index) => (
                <img
                    key={url}
                    src={url}
                    alt=""
                    decoding="async"
                    onLoad={() => {
                        loaded.current[index] = true;
                    }}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out motion-reduce:transition-none ${
                        index === active ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}
        </>
    );
}
