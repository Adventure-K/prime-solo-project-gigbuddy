import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
      height: '3vw',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#144D00'
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
          <AppBar position="static" className={classes.footer}>
              <Toolbar>
              <Typography className={classes.root}>© 2022 Andrew Kane</Typography>
              </Toolbar>
          </AppBar>
  )
}