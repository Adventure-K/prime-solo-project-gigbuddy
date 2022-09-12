import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  upcomingCard: {
    display: 'inline-block',
    marginTop: '18px',
    height: '72vh',
    marginLeft: '2vw',
    minWidth: '50vw',
    maxWidth: '60vw',
    alignContent: 'center',
  },
  repCard: {
    display: 'inline-block',
    marginTop: '18px',
    height: '72vh',
    marginLeft: '2vw',
    minWidth: '40vw',
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
  const rep = useSelector((store) => store.rep);

  const [heading, setHeading] = useState('Add Gig');
  useEffect(() => {
    dispatch ({
        type: 'UPDATE_PAGE_TITLE',
        payload: heading
    })
  }, [])  
  
  const [newGig, setNewGig] = useState({ date: '', ensemble: '', show: '', venue: '', fee: '', repList: [], notes: '', city: '' })
  // let repPicks = [];

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_REP'
    })
  }, [])

  const handleAddGig = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_GIG', payload: newGig })
    console.log(newGig);
    history.push('/history')
  }

  // Function to keep repList key up to date with any checkbox changes
  const handleListChange = (id) => {                      // On any checkbox change:
    // console.log('In handleListChange w/ ID', id)
    for (let [index, x] of newGig.repList.entries()) {
      if (x == id) {                                      // If rep ID already in repList (box checked),
        newGig.repList.splice(index, 1);                  // Then remove it
        console.log('repPicks:', newGig.repList)
        return;
      }
    };
    newGig.repList.push(id);                              // Otherwise, add rep ID
    console.log('repPicks:', newGig.repList)
    // handleSelectChange();
  }

  // const handleSelectChange = () => {
  //   setNewGig({
  //     ...newGig,
  //     repList: repPicks
  //   })
  // }

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
        <form onSubmit={handleAddGig}>
          <Card className={classes.upcomingCard}>
            <CardContent>
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
                onChange={(event) => handleNameChange(event, 'venue')} />
              <input
                className={classes.yearLine}
                type="text"
                placeholder="City"
                value={newGig.city}
                onChange={(event) => handleNameChange(event, 'city')} /> <br />
              <input
                className={classes.inputLine}
                type="number"
                placeholder="Fee"
                required
                value={newGig.fee}
                onChange={(event) => handleNameChange(event, 'fee')} /> <br />
              <textarea
                className={classes.textarea}
                placeholder="Notes"
                value={newGig.notes}
                onChange={(event) => handleNameChange(event, 'notes')} /> <br />
              <Button variant="outlined" type="submit">Submit</Button>
            </CardContent>
          </Card>
          <Card className={classes.repCard}>
            <CardContent>
              <ul> Choose Repertoire <br />
                {rep.map(piece =>
                  <li key={piece.id}><label> <input type="checkbox" onChange={() => handleListChange(piece.id)}

                  />
                    {piece.firstname} {piece.lastname} - {piece.title} <br />
                  </label></li>)}
              </ul>
            </CardContent>
          </Card>
        </form>
      </Grid>
    </Grid >
  );
}

export default AddGig;

