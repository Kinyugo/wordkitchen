import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}));

function ModalWrapper({
  open,
  handleClose,
  ariaLabel,
  ariaDescription,
  children
}) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby={ariaLabel}
        aria-describedby={ariaDescription}
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Paper>{children}</Paper>
        </Fade>
      </Modal>
    </div>
  );
}

ModalWrapper.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  ariaDescription: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

ModalWrapper.defaultProps = {
  ariaLabel: "Modal-title",
  ariaDescription: "Modal-Description"
};

export default ModalWrapper;
