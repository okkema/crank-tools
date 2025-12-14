<script lang="ts">
    import { FormHandler, FormInput, FormLookup, FormSelect } from "@/Forms";
    import { ServiceStatusValues, type Service } from "./ServiceSchema";
    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import { type Customer } from "@/Customers";
    import Button from "@smui/button";

    interface Props {
        service?: Service;
    }

    let { service }: Props = $props();
    const options = ServiceStatusValues.map(function (status) {
        return {
            label: status,
            value: status,
        };
    });
</script>

<FormHandler action="/api/service" method={service ? "PUT" : "POST"}>
    <input name="id" type="hidden" value={service?.id} />
    <LayoutGrid>
        <Cell>
            <FormInput
                label="Date"
                name="date"
                type="date"
                value={service?.date ?? new Date().toISOString().split("T")[0]}
                required
            />
        </Cell>
        <Cell>
            <FormSelect
                label="Status"
                name="status"
                value={service?.status ?? ServiceStatusValues[0]}
                {options}
                required
            />
        </Cell>
        <Cell>
            <FormLookup
                label="Customer"
                name="customer"
                url="/api/customers/search"
                getLabel={(option: Customer) =>
                    option.name + " - " + option.email}
                required
                value={service?.customer}
            />
        </Cell>
        <Cell>
            <Button variant="raised" type="submit">Submit</Button>
        </Cell>
    </LayoutGrid>
</FormHandler>
