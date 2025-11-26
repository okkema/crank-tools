import Kitchen, { type Config } from "@smui/snackbar/kitchen";

let kitchen: Kitchen;

export function setKitchen(instance: Kitchen) {
    kitchen = instance;
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