import { CustomerController } from "@/Customers";

export const prerender = false;

export const GET = CustomerController.search;
