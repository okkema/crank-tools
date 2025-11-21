<script lang="ts">
    import Drawer, {
        AppContent,
        Scrim,
        Header,
        Title,
        Subtitle,
        Content,
    } from "@smui/drawer";
    import List, { Graphic, Item, Text } from "@smui/list";
    import type { Snippet } from "svelte";
    import navigation from "../state/NavigationState.svelte";

    interface Props {
        title: string;
        subtitle: string;
        items: [
            {
                href: string;
                text: string;
                icon: string;
            },
        ];
        active: string;
        children: Snippet;
    }
    const { title, subtitle, items, active, children }: Props = $props();
</script>

<Drawer variant="modal" fixed={false} bind:open={navigation.open}>
    <Header>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
    </Header>
    <Content>
        <List>
            {#each items as item}
                <Item href={item.href} activated={item.href == active}>
                    <Graphic class="material-icons" aria-hidden="true"
                        >{item.icon}</Graphic
                    >
                    <Text>{item.text}</Text>
                </Item>
            {/each}
        </List>
    </Content>
</Drawer>
<Scrim fixed={false} />
<AppContent>
    {@render children()}
</AppContent>
