<script lang="ts">
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import navigation from "./NavigationState.svelte";
    import type { Snippet } from "svelte";

    interface Props {
        page: string;
        children: Snippet;
    }

    const { page, children }: Props = $props();
</script>

<TopAppBar variant="static">
    <Row>
        <Section>
            <IconButton
                class="material-icons"
                onclick={() => (navigation.open = !navigation.open)}
                aria-label="Toggle navigation menu">menu</IconButton
            >
            <Title>{page}</Title>
        </Section>
        <Section align="end" toolbar>
            {@render children()}
        </Section>
    </Row>
</TopAppBar>
