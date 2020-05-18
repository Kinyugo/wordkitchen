import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

function HideOnScroll({ children, window }) {
  const trigger = useScrollTrigger({ target: window ? Window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};
function CustomAppBar({ title }) {
  const classes = useStyles();

  return (
    <div>
      <HideOnScroll>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
}

CustomAppBar.propTypes = {
  title: PropTypes.string
};

CustomAppBar.defaultProps = {
  title: "Word Kitchen"
};

export default CustomAppBar;
