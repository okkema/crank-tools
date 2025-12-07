<script lang="ts">
    import Select, { Option } from "@smui/select";

    interface Props {
        label: string;
        name: string;
        value?: string;
        options: {
            value: string;
            label: string;
        }[];
    }

    let { label, name, value = $bindable(), options }: Props = $props();
</script>

<Select bind:value {label} hiddenInput input$name={name} style="width: 100%;">
    {#each options as option}
        <Option value={option.value}>{option.label}</Option>
    {/each}
</Select>
