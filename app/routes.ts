import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

// index() - default page
// route() - page endpoint
// layout() - layout page

export default [
    layout("layouts/default.tsx", [
        index("routes/home.tsx"),
        route("/login", "routes/login.tsx"),
        route("/register", "routes/register.tsx")
    ]),
    route("/logout", "routes/logout.tsx")
] satisfies RouteConfig;
