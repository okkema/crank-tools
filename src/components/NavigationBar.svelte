<script lang="ts">
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import navigation from "../state/NavigationState.svelte";
    import type { Snippet } from "svelte";

    interface Props {
        title: string;
        children: Snippet;
    }

    const { title, children }: Props = $props();
</script>

<TopAppBar variant="static">
    <Row>
        <Section>
            <IconButton
                class="material-icons"
                onclick={() => (navigation.open = !navigation.open)}
                aria-label="Toggle navigation menu">menu</IconButton
            >
            <Title>{title}</Title>
        </Section>
        <Section align="end" toolbar>
            {@render children()}
        </Section>
    </Row>
</TopAppBar>
