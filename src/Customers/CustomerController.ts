import type { APIRoute } from "astro";
import { json } from "../Api";
import { CustomerRepository } from "./CustomerRepository";
import type { Customer } from "./CustomerSchema";

export const list: APIRoute = async function(context) {
    const repo = new CustomerRepository(context.locals.db);
    const customers = await repo.list();
    return json(customers);
}

export const create: APIRoute = async function(context) {
    const repo = new CustomerRepository(context.locals.db);
    const body = await context.request.json<Customer>();
    body.id = crypto.randomUUID();
    const customer = await repo.create(body);
    return json(customer);
}

export const update: APIRoute = async function(context) {
    const repo = new CustomerRepository(context.locals.db);
    const body = await context.request.json<Customer>();
    const customer = await repo.update(body);
    return json(customer);
}