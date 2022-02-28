import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  SxProps,
} from "@mui/material"
import { ChangeEvent, FocusEvent } from "react"

const CurrencyRegex = /^\d*(\.\d{0,2})?$/

type CurrencyInputProps = {
  name: string
  value: string
  onChange: (event: ChangeEvent) => void
  onBlur: (event: FocusEvent) => void
  sx: SxProps
  error?: boolean
}

const CurrencyInput = ({
  name,
  value,
  onChange: handleChange,
  onBlur: handleBlur,
  sx,
  error,
}: Partial<CurrencyInputProps>): JSX.Element => {
  const handleChangeCurrency = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    if (handleChange && CurrencyRegex.test(value)) handleChange(event)
  }

  return (
    <FormControl variant="outlined" sx={sx}>
      <OutlinedInput
        name={name}
        value={value}
        onChange={handleChangeCurrency}
        onBlur={handleBlur}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        inputProps={{
          style: {
            textAlign: "end",
          },
        }}
        error={error}
      />
    </FormControl>
  )
}

export default CurrencyInput
