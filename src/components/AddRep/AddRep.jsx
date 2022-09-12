import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
    margin: 'auto',
    minWidth: '80vw',
    maxWidth: '98vw',
    alignContent: 'center',
  },
  inputLine: {
    minWidth: '20vw',
    textAlign: 'left',
  },
  notes: {
    minWidth: '10vw',
    textAlign: 'left',
  },
  yearLine: {
    minWidth: '1vw',
    maxWidth: '8vw',
    textAlign: 'left',
  },
  nationalityCol: {
    minWidth: '10vw',
    textAlign: 'left',
  },
}));

function AddRep(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_COMPOSERS'
    })
  }, [])

  const [heading, setHeading] = useState('Add Rep');
  useEffect(() => {
    dispatch ({
        type: 'UPDATE_PAGE_TITLE',
        payload: heading
    })
  }, [])  
  
  const [newRep, setNewRep] = useState({ title: '', composer_id: '', collection: '', scorelink: '', reclink: '', category: '' })
  const composers = useSelector((store) => store.composers);

  const handleAddRep = () => {
    event.preventDefault();
    dispatch({ type: 'ADD_REP', payload: newRep })
    console.log(newRep);
    alert('Success!');
    history.push('/musiclibrary')
  }

  const handleNameChange = (event, key) => {
    // console.log(event)
    setNewRep({
      ...newRep,
      [key]: event.target.value
    })
  }

  const goBack = () => {
    history.push('/dashboard')
  }
  const goComposers = () => {
    history.push('/composers')
  }


  return (
    <Grid container>
      <Button variant="contained" className="navButton" onClick={goComposers}>Composers</Button>
      <Button variant="contained" className="navButton" onClick={goBack}>Cancel</Button>
      <Grid item container xs={12}>
        <Card className={classes.upcomingCard}>
          <CardContent>
            <form onSubmit={handleAddRep}>
              <input
                className={classes.inputLine}
                type="text"
                placeholder="Title"
                value={newRep.title}
                onChange={(event) => handleNameChange(event, 'title')} /> <br />
              <select
                name="composerSelect"
                className={classes.inputLine}
                onChange={(event) => handleNameChange(event, 'composer_id')} >
                <option value='0'>Composer</option>
                {composers.map(composer => {
                  return (
                    <>
                      <option key={composer.id} value={composer.id}>{composer.firstname} {composer.lastname}</option>
                    </>
                  );
                })}
              </select> <br />
              <input
                className={classes.inputLine}
                type="text"
                placeholder="Larger Work / Collection"
                value={newRep.collection}
                onChange={(event) => handleNameChange(event, 'collection')} /> <br />
              <input
                className={classes.inputLine}
                type="text"
                placeholder="Link to Score"
                value={newRep.scorelink}
                onChange={(event) => handleNameChange(event, 'scorelink')} /> <br />
              <input
                className={classes.inputLine}
                type="text"
                placeholder="Link to Recording"
                value={newRep.reclink}
                onChange={(event) => handleNameChange(event, 'reclink')} /> <br />
              <select
                className={classes.select}
                value={newRep.category}
                onChange={(event) => handleNameChange(event, 'category')} >
                  <option value='solo'>Solo piece</option>
                  <option value='chamber'>Chamber piece</option>
                  <option value='large work'>Large work</option>
              </select> <br />
              <Button variant="outlined" type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AddRep;