import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  upcomingCard: {
    marginTop: '18px',
    height: '72vh',
    minWidth: '85vw',
    margin: 'auto',
  },
  nameCol: {
    minWidth: '20vw',
    textAlign: 'left',
  },
  datesCol: {
    minWidth: '10vw',
    textAlign: 'left',
  },
  periodCol: {
    minWidth: '10vw',
    textAlign: 'left',
  },
  nationalityCol: {
    minWidth: '10vw',
    textAlign: 'left',
  },
}));


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Composers(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const composers = useSelector((store) => store.composers);
  const [heading, setHeading] = useState('Composers');
  useEffect(() => {
    dispatch ({
        type: 'UPDATE_PAGE_TITLE',
        payload: heading
    })
  }, [])

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_COMPOSERS'
    })
  }, [])

  const goBack = () => {
    history.push('/musiclibrary')
  }

  const addComposer = () => {
    history.push('/addcomposer')
  }

  console.log('composers from store', composers)
  return (
    <Grid container>
      <Button variant="contained" className="navButton" onClick={goBack}>Back</Button>
      <Button variant="contained" className="navButton" onClick={addComposer}>New Composer</Button>
      <Grid item container xs={12}>
        <Card className={classes.upcomingCard}>
          <CardContent>
            <table>
              <thead>
                <tr>
                  <th className={classes.nameCol}>Name</th>
                  <th className={classes.datesCol}>Dates</th>
                  <th className={classes.periodCol}>Period</th>
                  <th className={classes.nationalityCol}>Nationality</th>
                  <th className={classes.schoolCol}>School</th>
                  <th className={classes.edit}></th>
                </tr>
              </thead>
              <tbody>
                {composers.map(composer => {
                  return (
                    <tr key={composer.id}>
                      <td>{composer.firstname} {composer.lastname}</td>
                      <td>{composer.yob} - {composer.yod}</td>
                      <td>{composer.period}</td>
                      <td>{composer.nationality}</td>
                      <td>{composer.school}</td>
                      <td><button className="editBtn">Edit</button></td>
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

export default Composers;