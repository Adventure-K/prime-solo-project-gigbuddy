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

  useEffect(() => {
    dispatch({
      type: 'FETCH_REP'
    })
  }, [])

  const activeGig = useSelector((store) => store.activeGig);
  const rep = useSelector((store) => store.rep);
  const activeGigRep = useSelector((store) => store.activeGigRep);
  const [heading, setHeading] = useState('Gig Detail');

  console.log('Gig selected:', activeGig)
  console.log('Rep for this gig:', activeGigRep)

  const goBack = () => {
    history.push('/history')
  }

  const goRepList = () => {
    history.push('/replist')
  }

  return (
    <div>
      <h2>{heading}</h2>
      <Button variant="contained" className="navButton" onClick={goRepList}>Rep List</Button>
      <Button variant="contained" className="navButton" onClick={goBack}>Back</Button>
      <Grid container>
        <Grid item container xs={12}>
          <Card className={classes.upcomingCard}>
            <CardContent>
              <label htmlFor="date">Date</label>
              <p id="date">{activeGig.date}</p>
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
            </CardContent>
          </Card>
          <Card className={classes.repCard}>
            <CardContent>
              <ul><label>Rep for this gig</label><br />
                {activeGigRep.map(piece =>
                <li>{piece.firstname} {piece.lastname} - {piece.title}</li>)}
              </ul>
            </CardContent>
          </Card>
        </Grid>  
      </Grid>

    </div>
  );
}

export default GigDetail;