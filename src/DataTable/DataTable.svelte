<script lang="ts">
    import LayoutGrid, { Cell as Item } from "@smui/layout-grid";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import { FormInput } from "../Forms";
    import type { Snippet } from "svelte";

    interface Props {
        label: string;
        columns: string[];
        rows: Record<string, any>[];
        children: Snippet;
    }

    const { label, columns, rows, children }: Props = $props();

    function getColumnName(column: string) {
        return column.charAt(0).toUpperCase() + column.slice(1);
    }
</script>

<LayoutGrid>
    <Item spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
        <FormInput label="Search" name="search" />
    </Item>
    <Item align="middle" spanDevices={{ desktop: 6, tablet: 4, phone: 2 }} style="justify-self: end;">
        {@render children()}
    </Item>
    <Item span={12}>
        <DataTable table$aria-label={label} style="width: 100%;">
            <Head>
                <Row>
                    {#each columns as column}
                        <Cell>{getColumnName(column)}</Cell>
                    {/each}
                </Row>
            </Head>
            <Body>
                {#each rows as row (row.id)}
                    <Row>
                        {#each columns as column}
                            <Cell>{row[column]}</Cell>
                        {/each}
                    </Row>
                {/each}
            </Body>
        </DataTable>
    </Item>
</LayoutGrid>
