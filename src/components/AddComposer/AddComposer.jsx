import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './AddComposer.css';

const useStyles = makeStyles((theme) => ({
  upcomingCard: {
    flexGrow: 1,
    marginTop: '18px',
    maxWidth: '22vw',
    maxHeight: '72vh',
    margin: '0 auto',
    display: 'inline-block',
    padding: '25px',
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
    float: 'left',
    margin: '20px',
  },
  backButton: {
    marginRight: '3vw',
    marginTop: '20px',
    float: 'right',
  },
  select: {
    marginLeft: '5px',
    marginTop: '5px',
    marginBottom: '20px',
  }
}));

function AddComposer(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const composers = useSelector((store) => store.composers);
  const [newComposer, setNewComposer] = useState({ firstname: '', lastname: '', period: '', nationality: '', yob: '', yod: null })

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_COMPOSERS'
  //   })
  // }, [])

  const [heading, setHeading] = useState('Add Composer');
  useEffect(() => {
    dispatch({
      type: 'UPDATE_PAGE_TITLE', // pagetitle.reducer
      payload: heading
    })
  }, [])

  const handleAddComposer = () => {
    event.preventDefault();
    dispatch({ type: 'ADD_COMPOSER', payload: newComposer }) // composer.saga
    console.log(newComposer);
    alert('Success!');
    history.push('/composers')
  }

  const handleNameChange = (event, key) => {
    // console.log(event)
    setNewComposer({
      ...newComposer,
      [key]: event.target.value
    })
  }

  const goBack = () => {
    history.goBack()
  }

  return (
    <>
      <Button variant="contained" className={classes.backButton} onClick={goBack}>Cancel</Button>
      <Grid container>
        <Grid item container xs={12}>
          <div className={classes.upcomingCard}>
            <div className="wasCardContent" align="center">
              <form onSubmit={handleAddComposer}>
                <input
                  className={classes.inputLine}
                  type="text"
                  placeholder="First Name"
                  value={newComposer.firstname}
                  onChange={(event) => handleNameChange(event, 'firstname')} /> <br />
                <input
                  className={classes.inputLine}
                  type="text"
                  placeholder="Last Name"
                  value={newComposer.lastname}
                  onChange={(event) => handleNameChange(event, 'lastname')} /> <br />
                <input
                  className={classes.yearLine}
                  type="text"
                  placeholder="Year Born"
                  value={newComposer.yob}
                  onChange={(event) => handleNameChange(event, 'yob')} />
                <input
                  className={classes.yearLine}
                  type="text"
                  placeholder="Year Died"
                  value={newComposer.yod}
                  onChange={(event) => handleNameChange(event, 'yod')} /> <br />
                <input
                  className={classes.inputLine}
                  type="text"
                  placeholder="Nationality"
                  value={newComposer.nationality}
                  onChange={(event) => handleNameChange(event, 'nationality')} /> <br />
                <select
                  name="periodSelect"
                  className={classes.select}
                  onChange={(event) => handleNameChange(event, 'period')} >
                  <option value=''>Period</option>
                  <option value="Medieval">Medieval</option>
                  <option value="Renaissance">Renaissance</option>
                  <option value="Baroque">Baroque</option>
                  <option value="Classical">Classical</option>
                  <option value="Romantic">Romantic</option>
                  <option value="20th Century">20th Century</option>
                  <option value="21st Century">21st Century</option>
                  <option value="Other">Other</option>
                </select> <br />
                <Button variant="contained" type="submit">Submit</Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default AddComposer;