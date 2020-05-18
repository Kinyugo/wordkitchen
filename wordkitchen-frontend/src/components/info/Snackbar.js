import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";

import SnackbarWrapper from "./SnackbarWrapper";

function CustomSnackbar({ open, handleClose, status, statusMessage }) {
  return (
    /* Sanckbar to display information, success, and errors */

    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={Boolean(open)}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarWrapper variant={status} message={statusMessage} />
    </Snackbar>
  );
}

CustomSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  status: PropTypes.oneOf(["success", "error", "info"]).isRequired,
  statusMessage: PropTypes.string.isRequired
};

export default CustomSnackbar;
