import stylesheet from "~/app.css?url";
import type { Route } from "./+types/default";
// import AppHeader from "~/components/AppHeader";
import { isAuthenticated } from "~/lib/cookies.server";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

export const meta = () => {
    return [
        { title: "React Router Starter" },
        { name: "description", content: "Welcome to React Router Starter!" },
    ];
}

export const links = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
    { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request }: Route.LoaderArgs) {
    const isLoggedIn = await isAuthenticated(request);
    return {
        isLoggedIn,
    }
}

export default function Layout({ loaderData }: Route.ComponentProps) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="antialiased flex flex-col h-dvh">
                {/* <AppHeader hasUser={loaderData.isLoggedIn} /> */}
                <main id="app-content" className="flex-1">
                    <Outlet />
                </main>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}