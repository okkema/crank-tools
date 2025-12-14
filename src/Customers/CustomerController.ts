import type { APIRoute } from "astro";
import { json } from "@/Api";
import { CustomerRepository } from "./CustomerRepository";
import type { Customer } from "./CustomerSchema";
import { Problem } from "@okkema/worker";

export const list: APIRoute = async function (context) {
    const repo = new CustomerRepository(context.locals.db);
    const customers = await repo.list();
    return json(customers);
}

export const create: APIRoute = async function (context) {
    const repo = new CustomerRepository(context.locals.db);
    const body = await context.request.json<Customer>();
    body.id = crypto.randomUUID();
    const customer = await repo.create(body);
    return json(customer);
}

export const update: APIRoute = async function (context) {
    const repo = new CustomerRepository(context.locals.db);
    const body = await context.request.json<Customer>();
    const customer = await repo.update(body);
    return json(customer);
}

export const search: APIRoute = async function (context) {
    const repo = new CustomerRepository(context.locals.db);
    const query = context.url.searchParams.get("q");
    if (!query) throw new Problem({ 
        title: "Customer Search Error", 
        detail: "Must provide query string 'q'" 
    });
    const customers = await repo.search(`%${query}%`);
    return json(customers);
}