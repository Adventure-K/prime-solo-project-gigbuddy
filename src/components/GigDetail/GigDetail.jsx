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
  upcomingCardE: {
    display: 'inline-block',
    // marginTop: '18px',
    height: '65vh',
    marginLeft: '15vw',
    minWidth: '25vw',
    maxWidth: '60vw',
    alignContent: 'center',
    padding: '5px',
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: '#ecffe5',
    boxShadow: '2px 2px 5px #000',
    overflow: 'auto',
  },
  upcomingCardV: {
    display: 'inline-block',
    textAlign: 'center',
    marginTop: '18px',
    height: '60vh',
    marginLeft: '15vw',
    minWidth: '25vw',
    // maxWidth: '60vw',
    alignContent: 'center',
    padding: '5px',
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: '#ecffe5',
    boxShadow: '2px 2px 5px #000',
    overflow: 'auto',
  },
  repCardE: {
    float: 'right',
    display: 'inline-block',
    paddingTop: '10px',
    // marginTop: '18px',
    height: '65vh',
    marginLeft: '2vw',
    minWidth: '40vw',
    alignContent: 'center',
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: '#ecffe5',
    boxShadow: '2px 2px 5px #000',
  },
  repCardE2: {
    marginTop: '10px',
    overflow: 'auto',
    height: '57vh',
  },
  repCardV: {
    float: 'right',
    display: 'inline-block',
    marginTop: '18px',
    height: '62vh',
    marginLeft: '2vw',
    marginRight: '15vw',
    paddingRight: '3vw',
    minWidth: '15vw',
    alignContent: 'center',
    textAlign: 'center',
    overflow: 'auto',
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: '#ecffe5',
    boxShadow: '2px 2px 5px #000',
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
  navButton: {
    marginTop: '20px',
    marginLeft: '20px',
    float: 'left',
    display: 'inline',
  },
  editViewButtons: {
    float: 'bottom'
  },
  backButton: {
    marginRight: '3vw',
    marginTop: '2vw',
    float: 'right',
  },
  textarea: {
    minWidth: '20vw',
    textAlign: 'left',
    marginTop: '2px',
    marginLeft: '5px'
  },
  repLabel: {
    marginLeft: '5vw',
    fontWeight: 'bold'
  },
  repUl: {
    listStyleType: 'none',
  },
  repPiece: {
    fontWeight: 'normal'
  },
  contentP: {
    marginTop: '5px',
    marginBottom: '20px',
}
}));

function GigDetail() {

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
  let repIdArray = []; {/* activeGigRep.map(piece => piece.id) */ }
  const [activeGigToEdit, setActiveGigToEdit] = useState(activeGig);
  const [activeGigRepToEdit, setActiveGigRepToEdit] = useState(activeGigRep);

  // console.log('Gig selected:', activeGig)
  // console.log('Rep for this gig:', activeGigRep)

  const goBack = () => {
    history.push('/history')
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
    setEditMode(!editMode);
  }

  const handleGigEditCancel = (event) => {
    event.preventDefault();
    setActiveGigToEdit(activeGig); // On cancel, undo all changes to active gig
    setEditMode(!editMode);
  }

  const handleSave = (event) => {
    event.preventDefault();
    console.log('new rep info:', repIdArray)
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
    history.goBack();
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

  const goLibrary = () => {
    console.log('click');
    history.push('/musiclibrary');
  }

  return (
    <>
      {editMode ? // Edit Mode render
        <div>
          <div>
            <Button variant="contained" className={classes.backButton} onClick={handleGigEditCancel}>Cancel</Button>
            <Grid container>
              <Grid item container xs={12}>
                <div className={classes.upcomingCardE}>
                  <div className="wasCardContent">
                    <Grid container direction="column">
                      <Grid item xs={11}>
                        <label htmlFor="date">Date</label><br />
                        <input
                          className={classes.dateInput}
                          id="date" type="date"
                          value={activeGig.date}
                          onChange={(event) => handleNameChange(event, 'date')} /> <br />
                        <label htmlFor="ensemble">Ensemble</label><br />
                        <input
                          className={classes.inputLine}
                          id="ensemble" type="text"
                          placeholder="Ensemble"
                          value={activeGigToEdit.ensemble}
                          onChange={(event) => handleNameChange(event, 'ensemble')} /> <br />
                        <label htmlFor="show">Show</label><br />
                        <input
                          className={classes.inputLine}
                          id="show" type="text"
                          placeholder="Show"
                          value={activeGigToEdit.show}
                          onChange={(event) => handleNameChange(event, 'show')} /> <br />
                        <label htmlFor="venue">Venue</label><br />
                        <input
                          className={classes.inputLine}
                          id="venue" type="text"
                          placeholder="Venue"
                          value={activeGigToEdit.venue}
                          onChange={(event) => handleNameChange(event, 'venue')} /><br />
                        <label htmlFor="city">City</label><br />
                        <input
                          className={classes.yearLine}
                          id="city" type="text"
                          placeholder="City"
                          value={activeGigToEdit.city}
                          onChange={(event) => handleNameChange(event, 'city')} /> <br />
                        <label htmlFor="fee">Fee</label><br />
                        <input
                          className={classes.inputLine}
                          id="fee" type="number"
                          placeholder="Fee"
                          required
                          value={activeGigToEdit.fee}
                          onChange={(event) => handleNameChange(event, 'fee')} /> <br />
                        <label htmlFor="notes">Notes</label><br />
                        <textarea
                          className={classes.textarea}
                          rows="4"
                          id="notes" placeholder="Notes"
                          value={activeGigToEdit.notes}
                          onChange={(event) => handleNameChange(event, 'notes')} /> <br /><br />
                      </Grid>
                      <Grid item xs={1}>
                        <Button variant="contained" className={classes.editViewButtons} onClick={handleSave}>Save</Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div>
                  <div className={classes.repCardE}>
                    <span className={classes.repLabel}>Choose Repertoire</span><br />
                    <div className={classes.repCardE2}>
                      <ul className={classes.repUl}>
                        {rep.map(piece =>
                          <li key={piece.id}><label className={classes.repPiece}> <input type="checkbox" onChange={() => handleListChange(piece.id)}
                          />
                            {piece.firstname} {piece.lastname} - {piece.title} <br />
                          </label></li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        : // Not Edit Mode render
        <div>
          {/* <h2>Gig Detail</h2> */}
          {/* <Button variant="contained" className={classes.navButton} onClick={goRepList}>Rep List</Button> */}
          <Button variant="contained" className={classes.backButton} onClick={goBack}>Back</Button>
          <Button variant="contained" className={classes.navButton} onClick={handleDelete}>Delete</Button>
          <Button variant="contained" className={classes.navButton} onClick={handleGigEdit}>Edit</Button>
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.upcomingCardV}>
                <div>
                  <label htmlFor="date">Date</label>
                  <p className={classes.contentP} id="date">{activeGig.date.slice(0, 10)}</p>
                  <label htmlFor="ensemble">Ensemble</label>
                  <p className={classes.contentP} id="ensemble">{activeGig.ensemble}</p>
                  <label htmlFor="show">Show</label>
                  <p className={classes.contentP} id="show">{activeGig.show}</p>
                  <label htmlFor="venue">Venue</label>
                  <p className={classes.contentP} id="venue">{activeGig.venue}</p>
                  <label htmlFor="city">City</label>
                  <p className={classes.contentP} id="city">{activeGig.city}</p>
                  <label htmlFor="fee">Fee</label>
                  <p className={classes.contentP} id="fee">{activeGig.fee}</p>
                  <label htmlFor="notes">Notes</label>
                  <p className={classes.contentP} id="notes">{activeGig.notes}</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.repCardV}>
                <div className="wasCardContent">
                  <ul className={classes.repUl}><label>Rep for this gig</label><br />
                    {activeGigRep.map(piece =>
                      <li key={piece.id} onClick={() => history.push('/musiclibrary')}>{piece.firstname} {piece.lastname} - {piece.title}</li>)}
                  </ul>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      }
    </>
  );
}

export default GigDetail;