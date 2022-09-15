import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import GigItem from '../GigItem/GigItem.jsx';


const useStyles = makeStyles((theme) => ({
    upcomingCard: {
        marginTop: '18px',
        height: '72vh',
        margin: 'auto',
    },
    dateCol: {
        minWidth: '17vw',
        textAlign: 'left',
    },
    ensCol: {
        minWidth: '20vw',
        textAlign: 'left',
    },
    showCol: {
        minWidth: '30vw',
        textAlign: 'left',
    },
    navButton: {
        float: 'left',
        margin: '20px',
    },
    backButton: {
        marginRight: '3vw',
        marginTop: '2vw',
        float: 'right',
    },
}));

function History(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const gigs = useSelector((store) => store.gigs);
    const [heading, setHeading] = useState('Your Gigs');

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_GIGS'
        })
        dispatch({
            type: 'UPDATE_PAGE_TITLE',
            payload: heading
        })
    }, [])

    const goAddGig = () => {
        history.push('/addgig')
    }
    const goBack = () => {
        history.push('/dashboard')
    }
    // const goDetail = () => {
    //     history.push(`/gigdetail/`)
    // }

    console.log('gigs from store:', gigs);
    return (
        <>
            <Button variant="contained" className={classes.navButton} onClick={goAddGig}>Add Gig</Button>
            <Button variant="contained" className={classes.backButton} onClick={goBack}>Back</Button>
            <Grid container>
                {/* <Grid item xs={1} /> */}
                <Grid item container xs={12}>
                    <div className={classes.upcomingCard}>
                        <div className="wasCardContent">
                            <table>
                                <thead>
                                    <tr>
                                        <th className={classes.dateCol}>Date</th>
                                        <th className={classes.ensCol}>Ensemble</th>
                                        <th className={classes.showCol}>Show</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gigs.map(gig => {
                                        return (
                                            <GigItem key={gig.id} gig={gig} />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Grid>
                {/* <Grid item xs={1} /> */}
            </Grid>
        </>
    );

}

export default History;