import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Dashboard from '../Dashboard/Dashboard';
import AddComposer from '../AddComposer/AddComposer';
import AddGig from '../AddGig/AddGig';
import AddRep from '../AddRep/AddRep';
import Composers from '../Composers/Composers';
import GigDetail from '../GigDetail/GigDetail';
import History from '../History/History';
import MusicLibrary from '../MusicLibrary/MusicLibrary';
import RepDetail from '../RepDetail/RepDetail';
import RepList from '../RepList/RepList';
import Upcoming from '../Upcoming/Upcoming';

import './App.css';

const useStyles = makeStyles((theme) => ({
  contentArea: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    flexGrow: 1,
    backgroundColor: '#f5f5dc',
  },
}));

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);
  const classes = useStyles();

  return (
    <div className={classes.contentArea}>
      <Grid container direction="column">

        <Router>
          <div>
            <Grid item>
              <Nav />
            </Grid>
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              {/* Visiting localhost:3000/about will show the about page. */}
              <Route
                // shows AboutPage at all times (logged in or not)
                exact
                path="/about"
              >
                <AboutPage />
              </Route>

              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path="/home"
              >
                <UserPage />
              </ProtectedRoute>

              <ProtectedRoute
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/info"
              >
                <InfoPage />
              </ProtectedRoute>

              <Route
                exact
                path="/login"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect to the /user page
                  <Redirect to="/dashboard" />
                  :
                  // Otherwise, show the login page
                  <LoginPage />
                }
              </Route>

              <Route
                exact
                path="/registration"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /user page
                  <Redirect to="/home" />
                  :
                  // Otherwise, show the registration page
                  <RegisterPage />
                }
              </Route>

              <Route
                exact
                path="/home"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /user page
                  <Redirect to="/home" />
                  :
                  // Otherwise, show the Landing page
                  <LandingPage />
                }
              </Route>

              <Route exact path="/dashboard">
                <Dashboard />
              </Route>

              <Route exact path="/addcomposer">
                {!user.id ?
                  <Redirect to="/login" />
                  :
                  <AddComposer />
                }
              </Route>

              <Route exact path="/addgig">
                {!user.id ?
                  <Redirect to="/login" />
                  :
                  <AddGig />
                }              
                </Route>

              <Route exact path="/addrep">
                {!user.id ?
                  <Redirect to="/login" />
                  :
                  <AddRep />
                }              
                </Route>

              <Route exact path="/composers">
                {!user.id ?
                  <Redirect to="/login" />
                  :
                  <Composers />
                }             
                </Route>

              <Route exact path="/gigdetail">
                {!user.id ?
                  <Redirect to="/login" />
                  :
                  <GigDetail />
                }             
                </Route>

              <Route exact path="/history">
                {!user.id ?
                  <Redirect to="/login" />
                  :
                  <History />
                }
                </Route>

              <Route exact path="/musiclibrary">
                {!user.id ?
                  <Redirect to="/login" />
                  :
                  <MusicLibrary />
                }
                </Route>

              <Route exact path="/repdetail">
                {!user.id ?
                  <Redirect to="/login" />
                  :
                  <RepDetail />
                }
                </Route>

              <Route exact path="/replist">
                {!user.id ?
                  <Redirect to="/login" />
                  :
                  <RepList />
                }
                </Route>

              <Route exact path="/upcoming">
                {!user.id ?
                  <Redirect to="/login" />
                  :
                  <Upcoming />
                }
                </Route>

              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
          </div>
        </Router>

        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </div>


  );
}

export default App;
