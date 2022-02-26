import {
  AddCircle,
  CalendarViewMonth,
  ChevronLeft,
  ChevronRight,
  Today,
  ViewWeek,
} from "@mui/icons-material"
import { Button, ButtonGroup, Stack, Typography } from "@mui/material"
import { ServiceSchedulerView } from "./ServiceScheduler"

export type ServiceToolbarProps = {
  title?: string
  view: ServiceSchedulerView
  onClickAdd: () => void
  onClickToday: () => void
  onClickWeek: () => void
  onClickMonth: () => void
  onClickPrev: () => void
  onClickNext: () => void
}

const ServiceToolbar = ({
  title = "",
  view,
  onClickAdd: handleClickAdd,
  onClickToday: handleClickToday,
  onClickWeek: handleClickWeek,
  onClickMonth: handleClickMonth,
  onClickPrev: handleClickPrev,
  onClickNext: handleClickNext,
}: ServiceToolbarProps): JSX.Element => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={2}
    >
      <Typography variant="h5">{title}</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" color="success" onClick={handleClickAdd}>
          <AddCircle />
        </Button>
        <ButtonGroup variant="contained">
          <Button variant="contained" onClick={handleClickToday}>
            <Today />
          </Button>
          {view !== "week" && (
            <Button onClick={handleClickWeek}>
              <ViewWeek />
            </Button>
          )}
          {view !== "month" && (
            <Button onClick={handleClickMonth}>
              <CalendarViewMonth />
            </Button>
          )}
        </ButtonGroup>
        <ButtonGroup variant="contained">
          <Button onClick={handleClickPrev}>
            <ChevronLeft />
          </Button>
          <Button onClick={handleClickNext}>
            <ChevronRight />
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  )
}

export default ServiceToolbar
