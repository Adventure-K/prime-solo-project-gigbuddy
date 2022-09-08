import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
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

function AddGig(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const [heading, setHeading] = useState('Functional Component');
  const [newGig, setNewGig] = useState({ date: '', ensemble: '', show: '', venue: '', fee: '', repList: [], notes: ''})

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleAddGig = () => {
    event.preventDefault();
    dispatch({ type: 'ADD_GIG', payload: newGig })
    console.log(newGig);
    alert('Success!');
    history.push('/history')
  }

  const handleEditRepList = () => {
    history.push('/replist');
  }

  const handleNameChange = (event, key) => {
    // console.log(event)
    setNewGig({
      ...newGig,
      [key]: event.target.value
    })
  }

  const goBack = () => {
    history.push('/dashboard')
  }
  const newRep = () => {
    history.push('/addrep')
  }

  return (
    <Grid container>
      <Button variant="contained" className="navButton" onClick={newRep}>New Rep</Button>
      <Button variant="contained" className="navButton" onClick={goBack}>Cancel</Button>
      <Grid item container xs={12}>
        <Card className={classes.upcomingCard}>
          <CardContent>
            <form onSubmit={handleAddGig}>
              <input
                className={classes.dateInput}
                type="date"
                value={newGig.date}
                onChange={(event) => handleNameChange(event, 'date')} /> <br />
              <input
                className={classes.inputLine}
                type="text"
                placeholder="Ensemble"
                value={newGig.ensemble}
                onChange={(event) => handleNameChange(event, 'ensemble')} /> <br />
              <input
                className={classes.inputLine}
                type="text"
                placeholder="Show"
                value={newGig.show}
                onChange={(event) => handleNameChange(event, 'show')} />
              <input
                className={classes.yearLine}
                type="text"
                placeholder="Venue"
                value={newGig.venue}
                onChange={(event) => handleNameChange(event, 'venue')} /> <br />
              <input
                className={classes.inputLine}
                type="number"
                placeholder="Fee"
                value={newGig.fee}
                onChange={(event) => handleNameChange(event, 'fee')} /> <br />
              <Button 
                variant="outlined" 
                className={classes.inFormBtn} 
                onClick={handleEditRepList}> Rep List </Button>
              <textarea
                className={classes.textarea}
                placeholder="Notes"
                value={newGig.notes}
                onChange={(event) => handleNameChange(event, 'fee')} /> <br />
              <Button variant="outlined" type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AddGig;