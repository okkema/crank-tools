<script lang="ts">
  import { onMount } from "svelte";
  import Button, { Icon, Label } from "@smui/button";
  import { DataTable } from "@/DataTable";
  import { FormHandler, FormInput, FormModal } from "@/Forms";
  import type { Customer } from "./CustomerSchema";

  const columns = ["name", "email"];

  let open = $state(false);
  let rows = $state<Customer[]>([]);
  let loading = $state(false);
  let selected = $state<Customer[]>([]);
  let current = $derived.by<Customer>(function() {
    return selected[0];
  });

  async function getData() {
    loading = true;
    selected = [];
    const response = await fetch("/api/customers");
    rows = await response.json<Customer[]>();
    loading = false;
  }

  onMount(getData);

  async function handleResult() {
    open = false;
    await getData();
  }
</script>

<DataTable label="Customers" {columns} {rows} {loading} bind:selected>
  <Button variant="raised" onclick={() => open = true} disabled={!!selected.length}>
    <Label>Create</Label>
    <Icon class="material-icons">add</Icon>
  </Button>
  <Button variant="raised" onclick={() => open = true} disabled={!(selected.length == 1)}>
    <Label>Update</Label>
    <Icon class="material-icons">edit</Icon>
  </Button>
</DataTable>
<FormHandler
  action="/api/customers"
  method={current ? "PUT" : "POST"}
  {handleResult}
>
  <FormModal title="Add new customer" bind:open>
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
