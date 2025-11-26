<script lang="ts">
    import type { Snippet } from 'svelte';
    import { pushProblem } from "../Notifications";
    import { Problem } from '@okkema/worker';

    interface Props {
        action: string;
        method: string;
        children: Snippet;
        handleResult?: (json: any) => Promise<void> | void;
    }

    const { action, method, children, handleResult }: Props = $props();

    async function onSubmit(event: SubmitEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        // @ts-expect-error Element to HTMLInputElement
        const data = [...form.elements].reduce(function(result, element: HTMLInputElement) {
            if (element.name && element.value) result[element.name] = element.value;
            return result;
        }, {} as Record<string, any>);
        const button = event.submitter;
        if (button) button.setAttribute("disabled", "disabled");
        const url = action.startsWith("/") ? action : `/${action}`;
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (button) button.removeAttribute("disabled");
        if (!response.ok) {
            const problem = await response.json<Problem>();
            pushProblem(problem);
        } else {
            const result = await response.json();
            if (handleResult) await handleResult(result);
        }
    }
</script>

<form onsubmit={onSubmit} {action}>
    {@render children()}
</form>