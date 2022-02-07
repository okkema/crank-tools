import { Container, useMediaQuery, useTheme } from "@mui/material"
import { useFormik } from "formik"
import TransmissionForms from "./TransmissionForms"

export type AnalysisType = "ratio" | "meters"

export type Transmission = {
  type: AnalysisType
  cranks: string[]
  cogs: string[]
  wheel: string
}

// 3 x 13
const DEFAULT: Transmission = {
  type: "ratio",
  cranks: ["", "", ""],
  cogs: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  wheel: "",
}

const TransmissionAnalysis = (): JSX.Element => {
  const { values, handleChange } = useFormik<Transmission>({
    initialValues: DEFAULT,
    onSubmit: (values) => console.log(values),
  })
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Container sx={{ paddingTop: 2 }}>
      {mobile ? (
        <TransmissionForms.Mobile
          values={values}
          handleChange={handleChange}
          theme={theme}
        />
      ) : (
        <TransmissionForms.Desktop
          values={values}
          handleChange={handleChange}
          theme={theme}
        />
      )}
    </Container>
  )
}

export default TransmissionAnalysis
