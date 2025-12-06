<script>
    import { Calendar, DayGrid, Interaction } from "@event-calendar/core";
    import LayoutGrid, { Cell } from "@smui/layout-grid";

    let options = $state({
        view: "dayGridMonth",
        firstDay: 1, // Monday
        eventSources: [{
            url: "/api/service/calendar",
        }]
    });
</script>

<LayoutGrid>
    <Cell span={12}>
        <Calendar plugins={[DayGrid, Interaction]} {options} />
    </Cell>
</LayoutGrid>