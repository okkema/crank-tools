<script lang="ts">
    import Dialog, { Header, Title, Content, Actions } from "@smui/dialog";
    import IconButton from "@smui/icon-button";
    import Button, { Label } from "@smui/button";
    import type { Snippet } from "svelte";

    interface Props {
        title: string;
        open: boolean;
        children: Snippet;
    }

    let { title, open = $bindable(), children }: Props = $props();
</script>

<Dialog bind:open fullscreen>
    <Header>
        <Title>{title}</Title>
        <IconButton action="close" class="material-icons" type="button">close</IconButton>
    </Header>
    <Content>
        {@render children()}
    </Content>
    <Actions>
        <Button action="save" defaultAction>
            <Label>Save</Label>
        </Button>
    </Actions>
</Dialog>