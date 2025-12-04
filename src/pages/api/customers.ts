import type { APIRoute } from "astro";
import { CustomerRepository, type Customer } from "../../Customers";
import { json } from "../../Api";

export const prerender = false;

export const GET: APIRoute = async function(context) {
    const repo = new CustomerRepository(context.locals.db);
    const customers = await repo.list();
    return json(customers);
}

export const POST: APIRoute = async function(context) {
    const repo = new CustomerRepository(context.locals.db);
    const body = await context.request.json<Customer>();
    body.id = crypto.randomUUID();
    const customer = await repo.create(body);
    return json(customer);
}

export const PUT: APIRoute = async function(context) {
    const repo = new CustomerRepository(context.locals.db);
    const body = await context.request.json<Customer>();
    const customer = await repo.update(body);
    return json(customer);
}