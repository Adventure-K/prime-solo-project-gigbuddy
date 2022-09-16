import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    margin: 'auto',
  },
  upcomingCard: {
    display: 'inline-block',
    marginTop: '25px',
  },
  repCard: {
    float: 'right',
    display: 'inline',
    height: '67.75vh',
    marginLeft: '60px',
    minWidth: '40vw',
    backgroundColor: '#c2c2ad',
    border: '1px solid black',
    borderRadius: '10px',
  },
  repCardTitle: {
    textAlign: 'center',
    marginTop: '5px',
  },
  repList: {
    listStyleType: 'none',
    overflow: 'auto',
    height: '60vh',
  },
  inputLine: {
    minWidth: '20vw',
    textAlign: 'left',
  },
  navButton: {
    float: 'left',
    margin: '20px',
  },
  backButton: {
    marginRight: '2.5vw',
    marginTop: '20px',
    float: 'right',
  },
  textarea: {
    minWidth: '20vw',
    textAlign: 'left',
    marginTop: '2px',
    marginLeft: '5px'
  },
  editViewButtons: {
    marginBottom: '20px',
  },
  addGigForm: {
    overflow: 'auto',
    height: '62vh',
    width: '30vw',
    display: 'inline-block',
    backgroundColor: '#c2c2ad',
    marginLeft: '20px',
    padding: '20px',
    border: '1px solid black',
    borderRadius: '10px',

  }
}));

function AddGig(props) {
  const rep = useSelector((store) => store.rep);

  const [heading, setHeading] = useState('Add Gig');
  useEffect(() => {
    dispatch({
      type: 'UPDATE_PAGE_TITLE',
      payload: heading
    })
  }, [])

  const [newGig, setNewGig] = useState({ date: '', ensemble: '', show: '', venue: '', fee: '', notes: '', city: '', repList: [] })
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
  }

  const handleNameChange = (event, key) => {
    // console.log(event)
    setNewGig({
      ...newGig,
      [key]: event.target.value
    })
  }

  const goBack = () => {
    history.goBack()
  }
  const newRep = () => {
    history.push('/addrep')
  }

  return (
    <>
      <Button variant="contained" className={classes.navButton} onClick={newRep}>New Rep</Button>
      <Button variant="contained" className={classes.backButton} onClick={goBack}>Cancel</Button>
      {/* <Grid container> */}
      {/* <Grid item container xs={12} className={classes.mainGrid}> */}
      <div className={classes.upcomingCard}>
        <form onSubmit={handleAddGig}>
          <div className={classes.addGigForm} >
            <Grid container direction="column">
              <Grid item xs={11}>
                <label htmlFor="date">Date</label><br />
                <input
                  className={classes.dateInput}
                  id="date" type="date"
                  value={newGig.date}
                  onChange={(event) => handleNameChange(event, 'date')} /> <br />
                <label htmlFor="ensemble">Ensemble</label><br />
                <input
                  className={classes.inputLine}
                  id="ensemble" type="text"
                  placeholder="Ensemble"
                  value={newGig.ensemble}
                  onChange={(event) => handleNameChange(event, 'ensemble')} /> <br />
                <label htmlFor="show">Show</label><br />
                <input
                  className={classes.inputLine}
                  id="show" type="text"
                  placeholder="Show"
                  value={newGig.show}
                  onChange={(event) => handleNameChange(event, 'show')} /> <br />
                <label htmlFor="venue">Venue</label><br />
                <input
                  className={classes.inputLine}
                  id="venue" type="text"
                  placeholder="Venue"
                  value={newGig.venue}
                  onChange={(event) => handleNameChange(event, 'venue')} /><br />
                <label htmlFor="city">City</label><br />
                <input
                  className={classes.yearLine}
                  id="city" type="text"
                  placeholder="City"
                  value={newGig.city}
                  onChange={(event) => handleNameChange(event, 'city')} /> <br />
                <label htmlFor="fee">Fee</label><br />
                <input
                  className={classes.inputLine}
                  id="fee" type="number"
                  placeholder="Fee"
                  required
                  value={newGig.fee}
                  onChange={(event) => handleNameChange(event, 'fee')} /> <br />
                <label htmlFor="notes">Notes</label><br />
                <textarea
                  className={classes.textarea}
                  rows="4"
                  id="notes" placeholder="Notes"
                  value={newGig.notes}
                  onChange={(event) => handleNameChange(event, 'notes')} /> <br /><br />
              </Grid>
              <Grid item xs={1}>
                <Button variant="contained" className={classes.editViewButtons} onClick={handleAddGig}>Save</Button>
              </Grid>
            </Grid>
          </div>

          <div className={classes.repCard}>
            <div className={classes.repCardTitle}>Choose Repertoire</div>
            <div>
              <ul className={classes.repList}>
                {rep.map(piece =>
                  <li key={piece.id}><label> <input type="checkbox" onChange={() => handleListChange(piece.id)}
                  />
                    {piece.firstname} {piece.lastname} - {piece.title} 
                  </label></li>)}
              </ul>
            </div>
          </div>
        </form>
      </div>
      {/* </Grid> */}
      {/* </Grid > */}
    </>
  );
}

export default AddGig;

