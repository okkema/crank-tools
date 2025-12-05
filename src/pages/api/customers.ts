import { CustomerController } from "../../Customers";

export const prerender = false;

export const GET = CustomerController.list;
export const POST = CustomerController.create;
export const PUT = CustomerController.update;
