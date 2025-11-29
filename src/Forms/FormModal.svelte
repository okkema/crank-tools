<script lang="ts">
    import Dialog, { Header, Title, Content, Actions } from "@smui/dialog";
    import IconButton from "@smui/icon-button";
    import Button, { Label } from "@smui/button";
    import type { Snippet } from "svelte";

    interface Props {
        title: string;
        open: boolean;
        children: Snippet;
        handleClose: (event: CustomEvent<{ action: string; }>) => void;
    }

    let { title, open = $bindable(), children, handleClose }: Props = $props();
</script>

<Dialog bind:open fullscreen onSMUIDialogClosed={handleClose}>
    <Header>
        <Title>{title}</Title>
        <IconButton action="close" class="material-icons" type="reset">close</IconButton>
    </Header>
    <Content>
        {@render children()}
    </Content>
    <Actions>
        <Button action="close" type="reset">
            <Label>Close</Label>
        </Button>
        <Button action="" defaultAction variant="raised" type="submit">
            <Label>Save</Label>
        </Button>
    </Actions>
</Dialog>