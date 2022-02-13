import { Container, Typography } from "@mui/material"
import { useParams } from "react-router-dom"

const ServiceViewer = (): JSX.Element => {
  const { date } = useParams<{ date: string }>()
  return <Typography variant="h6">{date}</Typography>
}

export default ServiceViewer
