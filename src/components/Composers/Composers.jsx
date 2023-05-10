import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './Composers.css'

const useStyles = makeStyles((theme) => ({
  upcomingCard: {
    marginTop: '40px',
    marginLeft: '8vw',
    // minWidth: '50vw',
    margin: 'auto',
    height: '62vh',
    // flexGrow: 1,
    textAlign: 'center',
    padding: '25px',
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: '#ecffe5',
    boxShadow: '2px 2px 5px #000',
    display: 'inline-block',
  },
  tableCol: {
    // flexGrow: 1,
    textAlign: 'left',
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  cell: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingBottom: '5px',
  },
  navButton: {
    float: 'left',
    margin: '20px',
    display: 'block',
  },
  backButton: {
    marginRight: '3vw',
    marginTop: '20px',
    float: 'right',
  },
  composerTable: {
    display: 'inline-block',
    alignContent: 'center',
    // width: '55vw',
    textAlign: 'center',
    overflow: 'auto',
    maxHeight: '60vh',
  },
  // tAll: {
  //   display: 'inline-block',
  //   margin: 'auto',
  //   width: '55vw',
  //   maxHeight: '55vh',
  // }
}));

function Composers(props) {
  const composers = useSelector((store) => store.composers);
  const [heading, setHeading] = useState('Composers');
  useEffect(() => {
    dispatch({
      type: 'UPDATE_PAGE_TITLE', // pagetitle.reducer
      payload: heading
    })
  }, [])

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_COMPOSERS' // composer.saga
    })
  }, [])

  const goBack = () => {
    history.push('/musiclibrary')
  }

  const addComposer = () => {
    history.push('/addcomposer')
  }

  console.log('composers from store', composers)
  return (
    <>
      <Button variant="contained" className={classes.backButton} onClick={goBack}>Back</Button>
      <Button variant="contained" className={classes.navButton} onClick={addComposer}>New Composer</Button>
          <div className={classes.upcomingCard}>
              <table className={classes.composerTable}>
                <thead>
                  <tr>
                    <th className={classes.tableCol}>Name</th>
                    <th className={classes.tableCol}>Dates</th>
                    <th className={classes.tableCol}>Period</th>
                    <th className={classes.tableCol}>Nationality</th>
                    <th className={classes.edit}></th>
                  </tr>
                </thead>
                <tbody>
                  {composers.map(composer => {
                    return (
                      <tr key={composer.id}>
                        <td className={classes.cell}>{composer.firstname} {composer.lastname}</td>
                        <td className={classes.cell}>{composer.yob} - {composer.yod}</td>
                        <td className={classes.cell}>{composer.period}</td>
                        <td className={classes.cell}>{composer.nationality}</td>
                        {/* <td><button className="editBtn">Edit</button></td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          </div>
    </>
  );
}

export default Composers;