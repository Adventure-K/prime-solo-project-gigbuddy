import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import './GigDetail.css';

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

function GigDetail() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [heading, setHeading] = useState('Gig Detail');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'FETCH_REP'
    })
    dispatch({
      type: 'UPDATE_PAGE_TITLE',
      payload: heading
    })
  }, [])

  const activeGig = useSelector((store) => store.activeGig);
  const rep = useSelector((store) => store.rep);
  const activeGigRep = useSelector((store) => store.activeGigRep);
  // let repIdArray = activeGigRep.map(piece => piece.id)
  const [activeGigToEdit, setActiveGigToEdit] = useState(activeGig);
  const [activeGigRepToEdit, setActiveGigRepToEdit] = useState(activeGigRep);


  // console.log('Gig selected:', activeGig)
  // console.log('Rep for this gig:', activeGigRep)

  const goBack = () => {
    history.push('/history')
  }

  const goRepList = () => {
    history.push('/replist')
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this gig?')) {
      dispatch({
        type: 'DELETE_GIG',
        payload: activeGig.id
      })
      history.push('/history')
    } else {
      return;
    }
  }

  const handleGigEdit = (event) => {
    event.preventDefault();
    setHeading('Edit Gig');
    setEditMode(!editMode);
  }

  const handleGigEditCancel = (event) => {
    event.preventDefault();
    setHeading('Gig Detail');
    setActiveGigToEdit(activeGig); // On cancel, undo all changes to active gig
    setEditMode(!editMode);
  }

  const handleSave = (event) => {
    event.preventDefault();
    console.log('new gig info:', activeGigToEdit)
    const updateRepPkg = { id: activeGig.id, newRep: repIdArray }
    dispatch({
      type: 'UPDATE_GIG',
      // type: 'DELETE_GIG_FOR_EDIT',
      payload: activeGigToEdit
    })
    dispatch({
      type: 'UPDATE_GIG_REP',
      payload: updateRepPkg
    })
    setEditMode(!editMode);
  }

  const handleNameChange = (event, key) => {
    // console.log(event)
    setActiveGigToEdit({
      ...activeGigToEdit,
      [key]: event.target.value
    })
  }

  // Function to keep repList key up to date with any checkbox changes
  const handleListChange = (id) => {
    // console.log('In handleListChange w/ ID', id)
    for (let [index, x] of repIdArray.entries()) {
      if (x == id) {
        repIdArray.splice(index, 1);
        console.log('repPicks:', repIdArray)
        return;
      }
    };
    repIdArray.push(id);
    console.log('repPicks:', repIdArray)
  }

  return (
    <>
      {editMode ? // Edit Mode render
        <div>
          <div>
            <h2>Edit Gig</h2>
            <Button variant="contained" className="navButton" onClick={handleSave}>Save</Button>
            <Button variant="contained" className="navButton" onClick={handleGigEditCancel}>Cancel</Button>
            <Grid container>
              <Grid item container xs={12}>
                <Card className={classes.upcomingCard}>
                  <CardContent>
                    <input
                      className={classes.dateInput}
                      type="date"
                      value={activeGigToEdit.date}
                      onChange={(event) => handleNameChange(event, 'date')} /> <br />
                    <input
                      className={classes.inputLine}
                      type="text"
                      placeholder="Ensemble"
                      value={activeGigToEdit.ensemble}
                      onChange={(event) => handleNameChange(event, 'ensemble')} /> <br />
                    <input
                      className={classes.inputLine}
                      type="text"
                      placeholder="Show"
                      value={activeGigToEdit.show}
                      onChange={(event) => handleNameChange(event, 'show')} />
                    <input
                      className={classes.yearLine}
                      type="text"
                      placeholder="Venue"
                      value={activeGigToEdit.venue}
                      onChange={(event) => handleNameChange(event, 'venue')} />
                    <input
                      className={classes.yearLine}
                      type="text"
                      placeholder="City"
                      value={activeGigToEdit.city}
                      onChange={(event) => handleNameChange(event, 'city')} /> <br />
                    <input
                      className={classes.inputLine}
                      type="number"
                      placeholder="Fee"
                      required
                      value={activeGigToEdit.fee}
                      onChange={(event) => handleNameChange(event, 'fee')} /> <br />
                    <textarea
                      className={classes.textarea}
                      placeholder="Notes"
                      value={activeGigToEdit.notes}
                      onChange={(event) => handleNameChange(event, 'notes')} /> <br />
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
              </Grid>
            </Grid>
          </div>
        </div>
        : // Not Edit Mode render
        <div>
          <h2>Gig Detail</h2>
          {/* <Button variant="contained" className="navButton" onClick={goRepList}>Rep List</Button> */}
          <Button variant="contained" className="navButton" onClick={goBack}>Back</Button>
          <Grid container>
            <Grid item container xs={12}>
              <Card className={classes.upcomingCard}>
                <CardContent>
                  <label htmlFor="date">Date</label>
                  <p id="date">{activeGig.date.slice(0, 10)}</p>
                  <label htmlFor="ensemble">Ensemble</label>
                  <p id="ensemble">{activeGig.ensemble}</p>
                  <label htmlFor="show">Show</label>
                  <p id="show">{activeGig.show}</p>
                  <label htmlFor="venue">Venue</label>
                  <p id="venue">{activeGig.venue}</p>
                  <label htmlFor="city">City</label>
                  <p id="city">{activeGig.city}</p>
                  <label htmlFor="fee">Fee</label>
                  <p id="fee">{activeGig.fee}</p>
                  <label htmlFor="notes">Notes</label>
                  <p id="notes">{activeGig.notes}</p>
                  <Button variant="contained" className="editButton" onClick={handleGigEdit}>Edit</Button>
                  <Button variant="contained" className="delButton" onClick={handleDelete}>Delete</Button>
                </CardContent>
              </Card>
              <Card className={classes.repCard}>
                <CardContent>
                  <ul><label>Rep for this gig</label><br />
                    {activeGigRep.map(piece =>
                      <li key={piece.id}>{piece.firstname} {piece.lastname} - {piece.title}</li>)}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      }
    </>
  );
}

export default GigDetail;