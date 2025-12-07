<script lang="ts">
    import { FormHandler, FormInput, FormSelect } from "@/Forms";
    import { ServiceStatusValues, type Service } from "./ServiceSchema";
    import LayoutGrid, { Cell } from "@smui/layout-grid";

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
    <LayoutGrid>
        <Cell spanDevices={{ desktop: 3, tablet: 3, phone: 4 }}>
            <FormSelect
                label="Status"
                name="status"
                value={service?.status ?? ServiceStatusValues[0]}
                {options}
                required
            />
        </Cell>
        <Cell spanDevices={{ desktop: 6, tablet: 2, phone: 4 }} />
        <Cell spanDevices={{ desktop: 3, tablet: 3, phone: 4 }}>
            <FormInput
                label="Date"
                name="date"
                type="date"
                value={service?.date ?? new Date().toISOString().split("T")[0]}
                required
            />
        </Cell>
    </LayoutGrid>
</FormHandler>
