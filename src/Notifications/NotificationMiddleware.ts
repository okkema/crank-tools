import { Problem } from "@okkema/worker";
import type { APIContext, MiddlewareNext } from "astro";

export async function notification(context: APIContext, next: MiddlewareNext) {
    try {
        return await next();
    } catch (error: any) {
        if (error instanceof Problem) return error.response;
        return new Problem({
            title: "Unknown Error",
            detail: error.message,
        }).response;
    }
}