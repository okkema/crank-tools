<script lang="ts">
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import navigation from "../state/NavigationState.svelte";

    interface Props {
        title: string;
    }

    const { title }: Props = $props();
</script>

<TopAppBar variant="static">
    <Row>
        <Section>
            <IconButton
                class="material-icons"
                onclick={() => (navigation.open = !navigation.open)}
                >menu</IconButton
            >
            <Title>{title}</Title>
        </Section>
    </Row>
</TopAppBar>
