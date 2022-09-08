import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  upcomingCard: {
    marginTop: '18px',
    height: '72vh',
    margin: 'auto',
  },
  composerCol: {
    minWidth: '30vw',
    textAlign: 'left',
  },
  titleCol: {
    minWidth: '55vw',
    textAlign: 'left',
  },
}));


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function MusicLibrary(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const rep = useSelector((store) => store.rep);
  const [heading, setHeading] = useState('Functional Component');

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_REP'
    })
  }, [])

  const goDetail = () => {
    history.push(`/repdetail/`)
  }
  const goBack = () => {
    history.push('/dashboard')
  }
  const composers = () => {
    history.push('/composers')
  }
  const newRep = () => {
    history.push('/addrep')
  }

  console.log('rep from store', rep)
  return (
    <Grid container>
      <Button variant="contained" className="navButton" onClick={composers}>Composers</Button>
      <Button variant="contained" className="navButton" onClick={newRep}>New Rep</Button>
      <Button variant="contained" className="navButton" onClick={goBack}>Back</Button>
      <Grid item container xs={12}>
        <Card className={classes.upcomingCard}>
          <CardContent>
            <table>
              <thead>
                <tr>
                  <th className={classes.composerCol}>Composer</th>
                  <th className={classes.titleCol}>Title</th>
                </tr>
              </thead>
              <tbody>
                {rep.map(piece => {
                  return (
                    <tr key={piece.id} onClick={() => { goDetail() }}>
                      <td>{piece.firstname} {piece.lastname}</td>
                      <td>{piece.title}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default MusicLibrary;