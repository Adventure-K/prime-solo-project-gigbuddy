import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import './MusicLibrary.css';

const useStyles = makeStyles((theme) => ({
  upcomingCard: {
    flexGrow: 1,
    marginTop: '18px',
    maxHeight: '72vh',
    margin: 'auto',
    display: 'inline-block',
  },
  tableCol: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  cell: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '5px',
  },
  navButton: {
    margin: '20px',
  },
  backButton: {
    marginRight: '3vw',
    marginTop: '20px',
    float: 'right',
  },

}));

function MusicLibrary(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const rep = useSelector((store) => store.rep);
  const [heading, setHeading] = useState('Music Library');

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_REP'
    })
    dispatch({
      type: 'UPDATE_PAGE_TITLE',
      payload: heading
    })
  }, [])

  const goDetail = () => {
    history.push(`/repdetail/`)
  }
  const goBack = () => {
    history.push('/dashboard')
  }
  const composers = () => {
    history.push('/composers')
  }
  const newRep = () => {
    history.push('/addrep')
  }

  console.log('rep from store', rep)
  return (
    <>
      <Button variant="contained" className={classes.navButton} onClick={composers}>Composers</Button>
      <Button variant="contained" className={classes.navButton} onClick={newRep}>New Rep</Button>
      <Button variant="contained" className={classes.backButton} onClick={goBack}>Back</Button>
      <Grid container>
        <Grid item container xs={12} style={{ display: 'inline-block' }}>
          <Card className={classes.upcomingCard}>
            <CardContent display="inline-block">
              <table>
                <thead>
                  <tr>
                    <th className={classes.tableCol}>Composer</th>
                    <th className={classes.tableCol}>Title</th>
                    <th className={classes.tableCol}>Collection</th>
                    <th className={classes.tableCol}>Score</th>
                    <th className={classes.tableCol}>Recording</th>
                    <th className={classes.tableCol}>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {rep.map(piece => {
                    return (
                      <tr key={piece.id}>
                        <td className={classes.cell}>{piece.firstname} {piece.lastname}</td>
                        <td className={classes.cell}>{piece.title}</td>
                        <td className={classes.cell}>{piece.collection}</td>
                        <td className={classes.cell}>{piece.scorelink && <a href={piece.scorelink}>Link</a>}</td>
                        <td className={classes.cell}>{piece.scorelink && <a href={piece.reclink}>Link</a>}</td>
                        <td className={classes.cell}>{piece.category}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default MusicLibrary;