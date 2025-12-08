<script lang="ts" generics="T">
  import Autocomplete from "@smui-extra/autocomplete";
  import { Text } from "@smui/list";
  import CircularProgress from "@smui/circular-progress";

  interface Props {
    label: string;
    getLabel: (option: T) => string;
    url: string;
    required?: boolean;
  }

  let { label, getLabel, url,  required }: Props = $props();
  let value = $state<any>();
  let counter = 0;
  let controller: AbortController | undefined;

  async function search(input: string) {
    if (input === "") return [];
    if (value) return [value];
    const current = ++counter;
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (current !== counter) return false;
    if (controller) controller.abort();
    controller = new AbortController();
    const response = await fetch(url + "?q=" + encodeURIComponent(input), {
      signal: controller.signal,
    });
    controller = undefined;
    return await response.json<T[]>();
  }

  function getOptionLabel(option: T) {
    if (!option) return "";
    return getLabel(option);
  }
</script>

<Autocomplete
  bind:value
  {label}
  {search}
  {getOptionLabel}
  showMenuWithNoInput={false}
  style="width: 100%;"
  textfield$style="width: 100%;"
  textfield$required={required}
  
>
  {#snippet loading()}
    <Text
      style="display: flex; width: 100%; justify-content: center; align-items: center;"
    >
      <CircularProgress style="height: 24px; width: 24px;" indeterminate />
    </Text>
  {/snippet}
</Autocomplete>
