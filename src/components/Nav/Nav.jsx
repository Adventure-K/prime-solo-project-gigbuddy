import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '@fontsource/merriweather'
import '@fontsource/marck-script';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
    fontFamily: 'merriweather',
    // fontFamily: 'arial',
    // fontSize: '72px',
    marginBottom: 0,
  },
  fudge: {
    margin: 0,
    top: '25%',
  },
  pageTitle: {
    marginTop: 0,
    fontFamily: 'merriweather'
    // fontSize: '48px',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#144D00',
    display: 'inline-block',
  },
  buttonGrid: {
    align: 'center',
    justify: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  navLink: {
    color: 'white',
  },
  navButton: {
    marginTop: '15px',
  },
  // userStatus: {
  //   margin: 'auto',
  //   flexGrow: 1,
  //   textAlign: 'center',
  // },
}));

function Nav() {
  const user = useSelector((store) => store.user);
  const pageTitle = useSelector((store) => store.pageTitle);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (route) => {
    console.log('handle click');
    history.push(route);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Grid container>
            {/* <Grid item xs={1} /> */}
            <Grid item xs={2} >
              <Link to="/dashboard" className="title-thingy">
                <Typography variant="h3" align="right" className={classes.title}>
                  GigBuddy
                </Typography>
              </Link>
              <Typography variant="h5" align="right" className={classes.pageTitle}>
                {pageTitle}
              </Typography>
            </Grid>
            <Grid item xs={5} />
            <Grid className="navBtnSlot" id="nbs1" item xs={1}> </Grid>
            <Grid className="navBtnSlot" id="nbs2" item xs={1}> </Grid>
            <Grid className="navBtnSlot" id="nbs3" item xs={1}> </Grid>
            <Grid className="navBtnSlot" id="nbs4" item xs={1}> </Grid>
            {/* If no user is logged in, show these links */}
            {!user.id && (
              // If there's no user, show login/registration links
              <Grid item xs={1} align='right'>
                <Link className={classes.navLink} to="/login">
                  Login / Register
                </Link>
              </Grid>
            )}
            {/* If a user is logged in, show these links */}
            {user.id && (
              <Grid item xs={1} align='right' id="logGrid">
                {/* <LogOutButton className={classes.logout} /> */} 
                <Button variant="contained" align="center" className={classes.navButton} onClick={() => { dispatch({ type: 'LOGOUT' }) }}>Logout</Button> {/* login.saga */}
                <Typography variant="subtitle1" align="center" className={classes.userStatus}>
                  User: {user.username}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
