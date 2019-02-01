import React from 'react';
import {
  withStyles,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Grid
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../images/boomtown.svg';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Fingerprint from '@material-ui/icons/Fingerprint';
import MoreVert from '@material-ui/icons/MoreVert';
import AddCircle from '@material-ui/icons/AddCircle';
import styles from './styles';

const MenuBar = ({ classes, logoutMutation }) => {
  return (
    <div className={classes.root}>
      <Grid container>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Grid item xs={10}>
              <IconButton component={Link} to="/">
                <img src={logo} width="30px" />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton component={Link} to="/share">
                <AddCircle />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton component={Link} to="/profile">
                <Fingerprint />
              </IconButton>
              <IconButton onClick={logoutMutation}>
                <PowerSettingsNew />
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];
export default compose(
  graphql(LOGOUT_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'logoutMutation'
  }),
  withStyles(styles)
)(MenuBar);
