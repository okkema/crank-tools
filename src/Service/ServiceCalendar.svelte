<script>
    import { Calendar, DayGrid, Interaction } from "@event-calendar/core";
    import LayoutGrid, { Cell } from "@smui/layout-grid";

    let options = $state({
        view: "dayGridMonth",
        firstDay: 1, // Monday
        eventSources: [{
            url: "/api/service/calendar",
        }],
        eventClick(info) {
            const { origin } = window.location;
            window.location.href = `${origin}/service/${info.event.id}`;
        },
    });
</script>

<LayoutGrid>
    <Cell span={12}>
        <Calendar plugins={[DayGrid, Interaction]} {options} />
    </Cell>
</LayoutGrid>