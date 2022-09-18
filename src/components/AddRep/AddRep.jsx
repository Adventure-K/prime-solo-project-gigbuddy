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
    width: '20vw',
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
    // marginLeft: '5px',
    marginTop: '3px',
    marginBottom: '10px',
    marginLeft: '5px'
  },
  submitBtn: {
    marginTop: '15px'
  }
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
    dispatch({
      type: 'UPDATE_PAGE_TITLE',
      payload: heading
    })
  }, [])

  const [newRep, setNewRep] = useState({ title: '', composer_id: '', collection: '', scorelink: '', reclink: '', category: '' })
  const composers = useSelector((store) => store.composers);

  const handleAddRep = () => {
    event.preventDefault();
    if (!newRep.category) {
      alert('Context required.')
      return;
    } else if (!newRep.composer_id) {
      alert('Composer required.')
      return;
    } else if (!newRep.title) {
      alert('Title required.')
      return;
    }
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
    history.goBack()
    // history.push('/dashboard')
  }
  const goComposers = () => {
    history.push('/composers')
  }


  return (
    <>
      <Button variant="contained" className={classes.navButton} onClick={goComposers}>Composers</Button>
      <Button variant="contained" className={classes.backButton} onClick={goBack}>Cancel</Button>
      <Grid container>
        <Grid item container xs={12}>
          <div className={classes.upcomingCard}>
            <div className="wasCardContent">
              <form onSubmit={handleAddRep}>
                <input
                  className={classes.inputLine}
                  type="text"
                  placeholder="Title"
                  value={newRep.title}
                  onChange={(event) => handleNameChange(event, 'title')} /> <br />
                <select
                  name="composerSelect"
                  className={classes.select}
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
                  <option value='0'>Context</option>
                  <option value='solo'>Solo piece</option>
                  <option value='chamber'>Chamber piece</option>
                  <option value='large work'>Large work</option>
                </select> <br />
                <Button variant="contained" type="submit" className={classes.submitBtn}>Submit</Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default AddRep;