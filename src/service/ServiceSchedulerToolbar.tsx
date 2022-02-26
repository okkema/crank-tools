import { CalendarApi } from "@fullcalendar/react"
import {
  CalendarViewMonth,
  ChevronLeft,
  ChevronRight,
  Today,
  ViewWeek,
} from "@mui/icons-material"
import { Button, ButtonGroup, Stack, Typography } from "@mui/material"

const weekView = "dayGridWeek"
const monthView = "dayGridMonth"

export type ServiceSchedulerToolbarProps = {
  title: string
  type: string
  calendar: CalendarApi
}

const ServiceSchedulerToolbar = ({
  title,
  type,
  calendar,
}: Partial<ServiceSchedulerToolbarProps>): JSX.Element => {
  // today
  const handleClickToday = () => {
    calendar?.today()
  }

  // toggle page
  const handleClickPrev = () => {
    calendar?.prev()
  }
  const handleClickNext = () => {
    calendar?.next()
  }

  //toggle view
  const handleClickWeek = () => {
    calendar?.changeView(weekView)
  }
  const handleClickMonth = () => {
    calendar?.changeView(monthView)
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={2}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" onClick={handleClickToday}>
          <Today />
        </Button>
        <ButtonGroup variant="contained">
          <Button onClick={handleClickPrev}>
            <ChevronLeft />
          </Button>
          <Button onClick={handleClickNext}>
            <ChevronRight />
          </Button>
        </ButtonGroup>
      </Stack>
      <Typography variant="h5">{title}</Typography>
      <ButtonGroup variant="contained">
        {type !== weekView && (
          <Button onClick={handleClickWeek}>
            <ViewWeek />
          </Button>
        )}
        {type !== monthView && (
          <Button onClick={handleClickMonth}>
            <CalendarViewMonth />
          </Button>
        )}
      </ButtonGroup>
    </Stack>
  )
}

export default ServiceSchedulerToolbar
