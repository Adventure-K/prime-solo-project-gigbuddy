import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function RepList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const history = useHistory();
  const dispatch = useDispatch();

  const rep = useSelector((store) => store.rep);
  const [heading, setHeading] = useState('Functional Component');

  const goBack = () => {
    history.push('/gigdetail')
  }
  const goBackAdd = () => {
    history.push('/addgig')
  }

  useEffect(() => {
    dispatch({
      type: 'FETCH_REP'
    })
  }, [])

  const handleRepChange = () => {
    event.preventDefault();
    console.log('updating rep list.')
    dispatch({ type: 'SET_REPLIST', payload: repList })
    console.log(repList);
  }

  let repList = [];

  return (
    <div>
      <Button variant="contained" className={classes.navButton} onClick={goBack}>Back to Gig</Button>
      <Button variant="contained" className={classes.navButton} onClick={goBackAdd}>Back to Add</Button>
      <form onSubmit={handleRepChange}>
      {rep.map (piece => 
      <label> <input 
        key={piece.id} 
        type="checkbox" 
        name="replist" 
        value={piece.id} 
        id={piece.id}
      />
      {piece.firstname} {piece.lastname} - {piece.title} <br /></label>)}
      <input type="submit"/>
      </form>
    </div>
  );
}

export default RepList;