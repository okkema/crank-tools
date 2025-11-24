import { sequence } from "astro:middleware";
import { router } from "@okkema/worker/web";
import { database } from "./Database";
import { schema } from "./schema"

export const onRequest = router({
    "*": sequence(database(schema)),
});