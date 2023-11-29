import {
  AccountCircle,
  BuildCircle,
  CheckCircle,
  Error,
  Help,
  Pending,
} from "@mui/icons-material"
import { Chip } from "@mui/material"

type ServiceStatusChipProps = {
  status: ServiceStatus
}

export function ServiceStatusChip({
  status,
}: ServiceStatusChipProps): JSX.Element {
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
