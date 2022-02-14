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

export type ServiceDetailModalProps = {
  open: boolean
  detail: ServiceDetail
  onClose: () => void
  onChange: ChangeEventHandler
  onSubmit: () => void
}

const ServiceDetailModal = ({
  open,
  detail: { description, amount },
  onClose,
  onChange,
  onSubmit,
}: ServiceDetailModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Service Detail</DialogTitle>
      <DialogContent>
        <Stack paddingTop={1} spacing={2}>
          <TextField
            value={description}
            label="Description"
            onChange={onChange}
            name="description"
          />
          <TextField
            value={amount}
            label="Amount"
            onChange={onChange}
            name="amount"
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

export default ServiceDetailModal
