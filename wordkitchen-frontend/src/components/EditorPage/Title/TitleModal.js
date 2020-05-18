import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import ModalWrapper from "../../info/ModalWrapper";

const inputProps = {
  style: {
    fontSize: "2rem"
  }
};
const useStyles = makeStyles(theme => ({
  content: {
    width: "60vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  title: {
    margin: theme.spacing(5),
    marginBottom: theme.spacing(0),
    padding: theme.spacing(5)
  },
  body: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(0)
  },
  textField: {
    width: "80%",
    display: "flex",
    fontSize: "2rem !important",
    fontWeight: 600,
    margin: theme.spacing(5)
  }
}));

function TitleModal({ open, handleClose, title, handleTitleChange }) {
  const classes = useStyles();
  return (
    <ModalWrapper
      open={open}
      handleClose={handleClose}
      ariaLabel="Verify Title"
      ariaDescription="Modal for the user to verify the auto-chosen title."
    >
      <div className={classes.content}>
        <Typography variant="h4" component="h2" className={classes.title}>
          Edit Title
        </Typography>
        <Typography variant="body2" component="p" className={classes.body}>
          The title is automatically chosen from your article.
        </Typography>
        <TextField
          variant="standard"
          label="Article's Title"
          value={title}
          onChange={handleTitleChange}
          className={classes.textField}
          inputProps={inputProps}
        />
      </div>
    </ModalWrapper>
  );
}

TitleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired
};

export default TitleModal;
