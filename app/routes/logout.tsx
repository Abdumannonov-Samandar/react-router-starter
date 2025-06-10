import { redirect } from "react-router";
import { userCookie } from "~/lib/cookies.server";

export async function loader() {
    return redirect("/", {
        status: 302,
        headers: {
            "Set-Cookie": await userCookie.serialize("", { path: "/", maxAge: -1 }),
        }
    });
}

export default function Logout() {
    return null;
}
