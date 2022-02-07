import {
  Box,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Theme,
  Typography,
} from "@mui/material"
import { ChangeEventHandler } from "react"
import { Transmission, AnalysisType } from "./TransmissionAnalysis"

type TransmissionFormProps = {
  values: Transmission
  handleChange: ChangeEventHandler
  theme: Theme
}

const ANALYSIS: {
  label: string
  value: AnalysisType
}[] = [
  {
    label: "Gear Ratio",
    value: "ratio",
  },
  // {
  //   label: "Meters Development",
  //   value: "meters",
  // },
]

const WHEELS: {
  label: string
  value: number
}[] = [
  {
    label: "700c",
    value: 622,
  },
]

const renderInput = (
  name: string,
  value: string,
  handleChange: ChangeEventHandler,
): JSX.Element => (
  <TextField
    variant="outlined"
    name={name}
    value={value}
    onChange={handleChange}
    inputProps={{ style: { textAlign: "center" } }}
    sx={{ width: "56px" }}
  />
)

const renderValue = (
  type: AnalysisType,
  crank: string,
  cog: string,
  wheel: string,
  theme: Theme,
): JSX.Element => {
  let value: number | undefined
  let background = "inherit"
  let text = "inherit"
  if (crank && cog) {
    value = +crank / +cog
    switch (type) {
      case "ratio":
        if (value < 1.5) {
          background = theme.palette.success.light
          text = theme.palette.success.contrastText
        } else if (value < 3) {
          background = theme.palette.primary.light
          text = theme.palette.primary.contrastText
        } else {
          background = theme.palette.error.light
          text = theme.palette.error.contrastText
        }
        break
      case "meters":
        if (wheel) value = value * ((+wheel * Math.PI) / 1000)
        break
    }
  }
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={background}
      color={text}
      height="56px"
    >
      {value && value.toFixed(2)}
    </Box>
  )
}

const Desktop = ({
  values: { type, cranks, cogs, wheel },
  handleChange,
  theme,
}: TransmissionFormProps): JSX.Element => {
  return (
    <Stack alignItems="center" width="min-content">
      <Stack direction="row" spacing={2} alignSelf="start">
        <TextField
          select
          label="Analysis Type"
          name="type"
          value={type}
          onChange={handleChange}
          sx={{ width: "200px" }}
        >
          {ANALYSIS.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        {type !== "ratio" && (
          <>
            <TextField
              select
              label="Wheel Size"
              name="wheel"
              value={wheel}
              onChange={handleChange}
              sx={{ width: "200px" }}
            >
              {WHEELS.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}
      </Stack>
      <Typography>Cogs</Typography>
      <Stack direction="row" alignItems="center">
        <Typography sx={{ rotate: "-90deg" }}>Cranks</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell />
                {cogs.map((cog, index) => (
                  <TableCell key={index} padding="none" align="center">
                    {renderInput(`cogs[${index}]`, cog, handleChange)}
                  </TableCell>
                ))}
              </TableRow>
              {cranks.map((crank, index) => (
                <TableRow key={index}>
                  <TableCell padding="none" align="center">
                    {renderInput(`cranks[${index}]`, crank, handleChange)}
                  </TableCell>
                  {cogs.map((cog, index) => (
                    <TableCell key={index} padding="none">
                      {renderValue(type, crank, cog, wheel, theme)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  )
}

const Mobile = ({
  values: { type, cranks, cogs, wheel },
  handleChange,
  theme,
}: TransmissionFormProps): JSX.Element => {
  return (
    <Stack>
      <TextField
        select
        fullWidth
        label="Analysis Type"
        name="type"
        value={type}
        onChange={handleChange}
      >
        {ANALYSIS.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
      <Typography alignSelf="center">Cranks</Typography>
      <Stack direction="row" alignItems="center">
        <Typography sx={{ rotate: "-90deg" }}>Cogs</Typography>
        <TableContainer sx={{ width: "min-content" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell />
                {cranks.map((crank, index) => (
                  <TableCell key={index} padding="none" align="center">
                    {renderInput(`cranks[${index}]`, crank, handleChange)}
                  </TableCell>
                ))}
              </TableRow>
              {cogs.map((cog, index) => (
                <TableRow key={index}>
                  <TableCell padding="none" align="center">
                    {renderInput(`cogs[${index}]`, cog, handleChange)}
                  </TableCell>
                  {cranks.map((crank, index) => (
                    <TableCell key={index} padding="none">
                      {renderValue(type, crank, cog, wheel, theme)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  )
}

const TransmissionForms = { Desktop, Mobile }

export default TransmissionForms
