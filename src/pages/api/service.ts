import type { APIRoute } from "astro";
import { json } from "../../Api";

export const GET: APIRoute = async function(context) {
    return json([]);
}