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
  },
  repCard: {
    float: 'right',
    // display: 'flexbox',
    // marginTop: '18px',
    height: '72vh',
    marginLeft: '2vw',
    minWidth: '40vw',
  },
  inputLine: {
    minWidth: '20vw',
    textAlign: 'left',
  },
  navButton: {
    float: 'left',
    marginTop: '20px',
    marginLeft: '20px',
  },
  backButton: {
    marginRight: '3vw',
    marginTop: '20px',
    float: 'right',
  },
  textarea: {
    minWidth: '20vw',
    textAlign: 'left',
    marginTop: '2px',
    marginLeft: '5px'
  },
  repList: {
    listStyleType: 'none',
  }
}));

function AddGig(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const rep = useSelector((store) => store.rep);

  const [heading, setHeading] = useState('Add Gig');
  useEffect(() => {
    dispatch({
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
    <>
      <Button variant="contained" className={classes.navButton} onClick={newRep}>New Rep</Button>
      <Button variant="contained" className={classes.backButton} onClick={goBack}>Cancel</Button>
      <Grid container>
        <Grid item container xs={12}>
          <form onSubmit={handleAddGig}>
            <div className={classes.upcomingCard}>
              <div className="wasCardContent">
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
                      rows="6"
                      id="notes" placeholder="Notes"
                      value={newGig.notes}
                      onChange={(event) => handleNameChange(event, 'notes')} /> <br /><br />
                  </Grid>
                  <Grid item xs={1}>
                    <Button variant="contained" className={classes.editViewButtons} onClick={handleAddGig}>Save</Button>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className={classes.repCard}>
              <div className="wasCardContent">
                <ul className={classes.repList}> Choose Repertoire <br />
                  {rep.map(piece =>
                    <li key={piece.id}><label> <input type="checkbox" onChange={() => handleListChange(piece.id)}

                    />
                      {piece.firstname} {piece.lastname} - {piece.title} <br />
                    </label></li>)}
                </ul>
              </div>
            </div>
          </form>
        </Grid>
      </Grid >
    </>
  );
}

export default AddGig;

