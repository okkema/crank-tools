import { Box, CircularProgress } from "@mui/material"

const Loading = (): JSX.Element => {
  return (
    <Box
      display="flex"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
