<script lang="ts">
  import { onMount } from "svelte";
  import Button, { Icon, Label } from "@smui/button";
  import { DataTable } from "../DataTable";
  import { FormHandler, FormInput, FormModal } from "../Forms";
  import type { Customer } from "./CustomerSchema";

  const columns = ["name", "email"];
  let form: FormHandler;

  let open = $state(false);
  let rows = $state<Customer[]>([]);
  let current = $state<Customer>();
  let loading = $state(false);

  async function getData() {
    loading = true;
    const response = await fetch("/api/customers");
    rows = await response.json<Customer[]>();
    loading = false;
  }

  onMount(getData);

  function handleClose(event: CustomEvent<{ action: string }>) {
    switch (event.detail.action) {
      case "close":
        form.reset();
        break;
    }
  }
</script>

<DataTable label="Customers" {columns} {rows} {loading}>
  <Button variant="raised" onclick={() => (open = true)}>
    <Label>New</Label>
    <Icon class="material-icons">add</Icon>
  </Button>
</DataTable>
<FormHandler
  action="/api/customers"
  method={current ? "PUT" : "POST"}
  bind:this={form}
  handleResult={getData}
>
  <FormModal title="Add new customer" bind:open {handleClose}>
    <input type="hidden" name="id" value={current?.id} />
    <FormInput label="Name" name="name" value={current?.name} required />
    <FormInput
      label="Email"
      name="email"
      type="email"
      value={current?.email}
      required
    />
  </FormModal>
</FormHandler>
