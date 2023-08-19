import React from "react";
import { SnackbarQueue } from "./SnackbarQueue";

const SnackbarBlock = () => {
  return (
    <div id="snackbar-queue-root">
      <SnackbarQueue />
    </div>
  )
}

export default SnackbarBlock;