import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
// import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const useStyles = makeStyles(() => ({
  root: {
      // flexGrow: 1,
      margin: 'auto',
      marginTop: '10px',
      textAlign: 'center',
  },
  footer: {
      position: 'absolute',
      height: '6vh',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#144D00'
  },
  footToolbar: {
    minHeight: '5px'
  }
}));

export default function Footer() {
  const classes = useStyles();
  const history = useHistory();

  return (
          <AppBar position="static" className={classes.footer}>
              <Toolbar className={classes.footToolbar}>
              <Typography className={classes.root}><span onClick={() => history.push('/about')}>© 2022 Andrew Kane</span></Typography>
              </Toolbar>
          </AppBar>
  )
}