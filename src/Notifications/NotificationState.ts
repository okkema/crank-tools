import { type Problem } from "@okkema/worker";
import Kitchen, { type Config } from "@smui/snackbar/kitchen";

let kitchen: Kitchen;

export function setKitchen(instance: Kitchen) {
    kitchen = instance;
}

export function pushProblem(problem: Problem) {
    pushNotification({
        label: problem.detail,
        dismissButton: true,
        props: {
            timeoutMs: -1
        }
    })
}

export function pushNotification(config: Config) {
    kitchen.push({ 
        ...config,
        props: {
            ...(config?.props ?? {}),
            leading: true,
        }
    });
}