<script lang="ts">
    import { onMount } from "svelte";
    import Kitchen from "@smui/snackbar/kitchen";
    import { setKitchen } from "./NotificationState"

    interface Props {}

    let kitchen: Kitchen;

    onMount(function() {
        setKitchen(kitchen);
    })
</script>

<Kitchen bind:this={kitchen} dismiss$class="material-icons" />