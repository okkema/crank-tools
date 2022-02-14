import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material"
import { ChangeEventHandler } from "react"

export type ServiceModalProps = {
  open: boolean
  service: Service
  customers: Customer[]
  onClose: () => void
  onChange: ChangeEventHandler
  onSubmit: () => void
}

const ServiceModal = ({
  open,
  service: { customer },
  customers,
  onClose,
  onChange,
  onSubmit,
}: ServiceModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Service</DialogTitle>
      <DialogContent>
        <Stack paddingTop={1} spacing={2}>
          <TextField
            value={customer}
            label="Customer"
            onChange={onChange}
            name="customer"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ServiceModal
