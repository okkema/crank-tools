<script lang="ts">
    import LayoutGrid, { Cell as Item } from "@smui/layout-grid";
    import DataTable, {
        Head,
        Body,
        Row,
        Cell,
        Label,
        SortValue,
    } from "@smui/data-table";
    import IconButton from "@smui/icon-button";
    import LinearProgress from "@smui/linear-progress";
    import { FormInput } from "@/Forms";
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

    let sort = $state<string>("");
    let sortDirection = $state<Lowercase<keyof typeof SortValue>>("none");

    let {
        label,
        columns,
        rows,
        selected = $bindable<Record<string, any>[]>([]),
        loading = false,
        children,
    }: Props = $props();

    function getColumnName(column: string) {
        return column.charAt(0).toUpperCase() + column.slice(1);
    }

    function handleSort() {
        rows.sort((a, b) => {
            const [aVal, bVal] = [a[sort], b[sort]][
                sortDirection === "ascending" ? "slice" : "reverse"
            ]();
            if (typeof aVal === "string" && typeof bVal === "string") {
                return aVal.localeCompare(bVal);
            }
            return Number(aVal) - Number(bVal);
        });
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
        <DataTable
            table$aria-label={label}
            style="width: 100%;"
            sortable
            bind:sort
            bind:sortDirection
            onSMUIDataTableSorted={handleSort}
        >
            <Head>
                <Row>
                    <Cell checkbox>
                        <Checkbox />
                    </Cell>
                    {#each columns as column}
                        <Cell columnId={column}>
                            <Label>{getColumnName(column)}</Label>
                            <IconButton class="material-icons"
                                >arrow_upward</IconButton
                            >
                        </Cell>
                    {/each}
                </Row>
            </Head>
            <Body>
                {#each rows as row (row.id)}
                    <Row>
                        <Cell checkbox>
                            <Checkbox
                                bind:group={selected}
                                value={row}
                                valueKey={row.id}
                            />
                        </Cell>
                        {#each columns as column}
                            <Cell>{row[column]}</Cell>
                        {/each}
                    </Row>
                {/each}
            </Body>
            {#snippet progress()}
                <LinearProgress indeterminate closed={!loading} />
            {/snippet}
        </DataTable>
    </Item>
</LayoutGrid>
