import { sequence } from "astro:middleware";
import { router } from "@okkema/worker/web";
import { database } from "./Database";
import { schema } from "./schema";
import { notification } from "./Notifications";

export const onRequest = router({
    "*": sequence(notification, database(schema)),
});