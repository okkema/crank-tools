<script lang="ts">
    import IconButton from "@smui/icon-button";
    import Menu from "@smui/menu";
    import List, { Graphic, Item, Text } from "@smui/list";
    import { Anchor } from "@smui/menu-surface";

    let menu: Menu;
    let anchor: HTMLDivElement | undefined = $state();
    let anchorClasses: { [k: string]: boolean } = $state({});
</script>

<div
    class={Object.keys(anchorClasses).join(" ")}
    use:Anchor={{
        addClass: (className) => {
            if (!anchorClasses[className]) {
                anchorClasses[className] = true;
            }
        },
        removeClass: (className) => {
            if (anchorClasses[className]) {
                delete anchorClasses[className];
            }
        },
    }}
    bind:this={anchor}
>
    <IconButton class="material-icons" onclick={() => menu.setOpen(true)}
        >more_vert</IconButton
    >
    <Menu
        bind:this={menu}
        anchor={false}
        anchorElement={anchor}
        anchorCorner="BOTTOM_START"
    >
        <List>
            <Item href="/settings" tag="a">
                <Graphic class="material-icons" aria-hidden="true"
                    >settings</Graphic
                >
                <Text>Settings</Text>
            </Item>
        </List>
    </Menu>
</div>
