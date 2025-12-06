import type { APIRoute } from "astro";
import { ServiceRepository } from "./ServiceRepository";
import { json } from "@/Api";
import { Problem } from "@okkema/worker";

export const listCalendar: APIRoute = async function (context) {
    const start = context.url.searchParams.get("start");
    const end = context.url.searchParams.get("end");
    if (!start || !end) throw new Problem({
        title: "List Service Error",
        detail: "Start and/or end are missing",
        status: 400,
    });
    const repo = new ServiceRepository(context.locals.db);
    const service = await repo.list(start, end);
    return json(service.map(function(s) {
        return {
            id: s.id,
            start: s.date,
            end: s.date,
            title: s.customer,
        }
    }));
}