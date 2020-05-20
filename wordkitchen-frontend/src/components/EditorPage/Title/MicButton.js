import React, { useState } from "react";
import proptypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MicOff from "@material-ui/icons/MicOff";
import Mic from "@material-ui/icons/Mic";

const useStyles = makeStyles((theme) => ({
  pulsatingMic: {
    color: theme.palette.error,
    display: "flex",
    justifyContent: "center",
  },
}));

const PulsatingMic = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.pulsatingMic}>
      <Mic />
    </div>
  );
};
function MicButton(props) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <IconButton
      color={isRecording ? "primary" : "secondary"}
      onClick={() => setIsRecording(!isRecording)}
      aria-label="dictate article"
      component="span"
      {...props}
    >
      {isRecording ? <PulsatingMic /> : <MicOff />}
    </IconButton>
  );
}

export default MicButton;
