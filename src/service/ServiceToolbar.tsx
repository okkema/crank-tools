import {
  AddCircle,
  CalendarViewMonth,
  CalendarViewWeek,
  ChevronLeft,
  ChevronRight,
  Today,
} from "@mui/icons-material"
import { Button, ButtonGroup, Stack, Typography } from "@mui/material"
import { useServiceContext } from "./ServiceProvider"

const ServiceToolbar = (): JSX.Element => {
  const {
    view: { type },
    toolbar: {
      title,
      onClickAdd: handleClickAdd,
      onClickToday: handleClickToday,
      onClickWeek: handleClickWeek,
      onClickMonth: handleClickMonth,
      onClickPrev: handleClickPrev,
      onClickNext: handleClickNext,
    },
  } = useServiceContext()

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
          {type !== "week" && (
            <Button onClick={handleClickWeek}>
              <CalendarViewWeek />
            </Button>
          )}
          {type !== "month" && (
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
