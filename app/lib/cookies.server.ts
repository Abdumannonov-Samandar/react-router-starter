import { createCookie } from "react-router";

export const userCookie = createCookie("user", { httpOnly: true, path: "/", maxAge: 300 });

export const isAuthenticated = async (request: Request): Promise<boolean> => {
    const cookieHeader = request.headers.get("Cookie");
    const user: string | null = await userCookie.parse(cookieHeader);
    return user !== null;
}
