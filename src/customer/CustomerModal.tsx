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

export type CustomerModalProps = {
  open: boolean
  customer: Customer
  onClose: () => void
  onChange: ChangeEventHandler
  onSubmit: () => void
}

const CustomerModal = ({
  open,
  customer: { name, email, phone },
  onClose,
  onChange,
  onSubmit,
}: CustomerModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Customer</DialogTitle>
      <DialogContent>
        <Stack paddingTop={1} spacing={2}>
          <TextField
            value={name}
            label="Name"
            onChange={onChange}
            name="name"
          />
          <TextField
            value={email}
            label="Email"
            onChange={onChange}
            name="email"
          />
          <TextField
            value={phone}
            label="Phone Number"
            onChange={onChange}
            name="phone"
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

export default CustomerModal
