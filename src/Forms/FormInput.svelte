<script lang="ts">
    import TextField from "@smui/textfield";

    interface Props {
        label: string;
        name: string;
        value?: string;
        type?: string;
        required?: boolean;
    }

    let { label, name, value = $bindable(""), type = "text", required }: Props = $props();
</script>

<TextField
    {label}
    input$name={name}
    {value}
    {type}
    style="width: 100%;"
    helperLine$style="width: 100%;"
    {required}
/>
