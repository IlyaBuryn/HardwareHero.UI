import React from "react"
import { Box, CircularProgress } from "@mui/material"


export default function LoadingCircularProgress() {
  return (
    <Box className="absolute-center" sx={{ display: 'flex' }}>
      <CircularProgress size={100} />
    </Box>
  )
}