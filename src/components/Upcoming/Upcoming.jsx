import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


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
}));

function Upcoming(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const gigs = useSelector((store) => store.gigs);
    const [heading, setHeading] = useState('Upcoming Gigs');

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_GIGS'
        })
    }, [])

    console.log('gigs from store:', gigs);
    return (
        <Grid container>
            {/* <Grid item xs={1} /> */}
            <Grid item container xs={12}>
                <Card className={classes.upcomingCard}>
                    <CardContent>
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
                                    <tr key={gig.id}>
                                    <td>{gig.date}</td>
                                    <td>{gig.ensemble}</td>
                                    <td>{gig.show}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </Grid>
            {/* <Grid item xs={1} /> */}
        </Grid>
    );

}

export default Upcoming;