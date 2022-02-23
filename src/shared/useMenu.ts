import { PopoverOrigin } from "@mui/material"
import { useState } from "react"

const anchorOrigin: PopoverOrigin = { horizontal: "left", vertical: "bottom" }

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>()
  const open = !!anchorEl
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(undefined)
  }

  return { anchorEl, anchorOrigin, open, handleOpen, handleClose }
}

export default useMenu
