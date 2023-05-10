import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './History.css';
import { useSelector, useDispatch } from 'react-redux';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import GigItem from '../GigItem/GigItem.jsx';


const useStyles = makeStyles((theme) => ({
    upcomingCard: {
        // flexGrow: 1,
        // marginTop: '18px',
        maxHeight: '62vh',
        margin: '0 auto',
        display: 'inline-block',
        padding: '25px',
        border: '1px solid black',
        borderRadius: '5px',
        backgroundColor: '#ecffe5',
        boxShadow: '2px 2px 5px #000',
        overflow: 'auto',
        display: 'block',
        maxWidth: '95vw',
        width: '70vw'
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

    // viewMode: false = list view; true = calendar view
    const [viewMode, setViewMode] = useState(false)

    useEffect(() => {
        dispatch({
            type: 'FETCH_GIGS' // gig.saga
        })
        dispatch({
            type: 'UPDATE_PAGE_TITLE', // pagetitle.reducer
            payload: heading
        })
    }, [])

    const goAddGig = () => {
        history.push('/addgig')
    }
    const goBack = () => {
        history.push('/dashboard')
    }
    const switchView = () => {
        event.preventDefault();
        setViewMode(!viewMode)
    }

    console.log('gigs from store:', gigs);
    return (
        <>
            {viewMode ? // Calendar view render
                <>
                    <Button variant="contained" className={classes.navButton} onClick={goAddGig}>Add Gig</Button>
                    <Button variant="contained" className={classes.navButton} onClick={switchView}>List View</Button>
                    <Button variant="contained" className={classes.backButton} onClick={goBack}>Back</Button>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                    />
                </>
                : // List view render
                <>
                    <Button variant="contained" className={classes.navButton} onClick={goAddGig}>Add Gig</Button>
                    {/* <Button variant="contained" className={classes.navButton} onClick={switchView}>Calendar View</Button> */}
                    <Button variant="contained" className={classes.backButton} onClick={goBack}>Back</Button>
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
                </>
            }
        </>
    );

}

export default History;