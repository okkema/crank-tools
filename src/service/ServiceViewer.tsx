import {
  AccountCircle,
  AddCircle,
  BuildCircle,
  CheckCircle,
  Edit,
  Error,
  Help,
  Pending,
} from "@mui/icons-material"
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useParams } from "react-router-dom"
import ServiceDetailTable from "./ServiceDetailTable"

const STATUS: ServiceStatus[] = [
  "pending",
  "active",
  "issue",
  "completed",
  "delivered",
]

const DEFAULT: Service[] = [
  {
    id: "123abc",
    details: [
      {
        id: "1",
        description: "Basic Maintenance",
        amount: 60,
      },
      {
        id: "2",
        description: "Brake Cables x2",
        amount: 10,
      },
    ],
    status: "delivered",
    customer: {
      id: "abc123",
      name: "Ben Okkema",
      email: "ben@okkema.org",
      phone: "6306709876",
    },
    bike: {
      id: "1a2b3c",
      brand: "Specialized",
      model: "Rockhopper",
      color: "Blue",
    },
  },
]

const renderTitle = (bike: string | Bike | undefined, index: number) => {
  if (!bike) return `Service ${index + 1}`
  if (typeof bike === "string") return bike
  const { color, brand, model } = bike
  return `${color} ${brand} ${model}`
}

const renderStatus = (status: ServiceStatus) => {
  switch (status) {
    case "pending":
      return <Chip color="info" icon={<Pending />} label={status} />
    case "active":
      return <Chip color="success" icon={<BuildCircle />} label={status} />
    case "issue":
      return <Chip color="error" icon={<Error />} label={status} />
    case "completed":
      return <Chip color="secondary" icon={<CheckCircle />} label={status} />
    case "delivered":
      return (
        <Chip
          color="info"
          variant="outlined"
          icon={<AccountCircle />}
          label={status}
        />
      )
    default:
      return <Chip icon={<Help />} label="unknown" />
  }
}

const ServiceViewer = (): JSX.Element => {
  const { date } = useParams<{ date: string }>()

  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{date}</Typography>
        <Button variant="contained" startIcon={<AddCircle />}>
          Add Service
        </Button>
      </Stack>
      <Box>
        {DEFAULT.map((service, index) => {
          const { id, status, bike, details } = service
          return (
            <Accordion key={id}>
              <AccordionSummary>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Typography>{renderTitle(bike, index)}</Typography>
                  <Box>{renderStatus(status)}</Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <ServiceDetailTable details={details} />
              </AccordionDetails>
              {/* <AccordionActions>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    select
                    label="Update Status"
                    sx={{ width: "150px" }}
                  >
                    {STATUS.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button variant="contained">Save</Button>
                </Stack>
              </AccordionActions> */}
            </Accordion>
          )
        })}
      </Box>
    </Stack>
  )
}

export default ServiceViewer
