<script lang="ts">
    import LayoutGrid, { Cell as Item } from "@smui/layout-grid";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import LinearProgress from "@smui/linear-progress";
    import { FormInput } from "../Forms";
    import type { Snippet } from "svelte";
    import Checkbox from "@smui/checkbox";

    interface Props {
        label: string;
        columns: string[];
        rows: Record<string, any>[];
        selected?: Record<string, any>[];
        loading?: boolean;
        children: Snippet;
    }

    let { label, columns, rows, selected = $bindable<Record<string, any>[]>([]), loading = false, children }: Props = $props();

    function getColumnName(column: string) {
        return column.charAt(0).toUpperCase() + column.slice(1);
    }
</script>

<LayoutGrid>
    <Item spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
        <FormInput label="Search" name="search" />
    </Item>
    <Item
        align="middle"
        spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
        style="justify-self: end;"
    >
        {@render children()}
    </Item>
    <Item span={12}>
        <DataTable table$aria-label={label} style="width: 100%;">
            <Head>
                <Row>
                    <Cell checkbox>
                        <Checkbox />
                    </Cell>
                    {#each columns as column}
                        <Cell>{getColumnName(column)}</Cell>
                    {/each}
                </Row>
            </Head>
            <Body>
                {#each rows as row (row.id)}
                    <Row>
                        <Cell checkbox>
                            <Checkbox bind:group={selected} value={row} valueKey={row.id} />
                        </Cell>
                        {#each columns as column}
                            <Cell>{row[column]}</Cell>
                        {/each}
                    </Row>
                {/each}
            </Body>
            {#snippet progress()}
                <LinearProgress
                    indeterminate
                    closed={!loading}
                />
            {/snippet}
        </DataTable>
    </Item>
</LayoutGrid>
