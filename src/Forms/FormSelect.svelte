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
        required?: boolean;
    }

    let {
        label,
        name,
        value = $bindable(""),
        options,
        required,
    }: Props = $props();
</script>

<Select
    bind:value
    {label}
    hiddenInput
    input$name={name}
    style="width: 100%;"
    {required}
>
    {#each options as option}
        <Option value={option.value}>{option.label}</Option>
    {/each}
</Select>
