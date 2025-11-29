<script>
    import { Calendar, DayGrid } from "@event-calendar/core";
    import LayoutGrid, { Cell } from "@smui/layout-grid";

    let options = $state({
        view: "dayGridMonth",
        firstDay: 1, // Monday
        events: [
            // your list of events
        ]
    });
</script>

<LayoutGrid>
    <Cell span={12}>
        <Calendar plugins={[DayGrid]} {options} />
    </Cell>
</LayoutGrid>