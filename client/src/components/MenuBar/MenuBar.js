import React from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import styles from './styles';

const MenuBar = ({ classes }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography component="p" color="inherit">
            Boomtown
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(MenuBar);
