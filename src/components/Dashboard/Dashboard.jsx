import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    dashGrid: {
        height: '68vh',
    },
    dashCard: {
        border: '1px solid black',
        borderRadius: '25px',
        backgroundColor: '#c2c2ad',
        boxShadow: '2px 4px 5px',
    },
    list: {
        listStyleType: 'none',
        padding: '1px',
        margin: '5px'
    },
    li: {
        margin: '5px',
        padding: '5px',
        paddingLeft: '10px',
        background: 'beige',
        borderRadius: '9px'
    },
    navButton: {
        float: 'left',
        margin: '20px',
    },
    buttonGrid: {
        align: 'center',
        justify: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    cardName: {
        fontFamily: 'tangerine',
        fontSize: '38px',
        fontWeight: 'bold',
        marginLeft: '10px',
    }
}));

function Dashboard(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const gigs = useSelector((store) => store.gigs);
    const rep = useSelector((store) => store.rep);
    const [heading, setHeading] = useState('Dashboard');

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (route) => {
        history.push(route);
    }
    const goNewRep = () => {
        history.push('/addrep')
    }
    const goAddGig = () => {
        history.push('/addgig')
    }

    useEffect(() => {
        dispatch({
            type: 'FETCH_GIGS'
        })
        dispatch({
            type: 'UPDATE_PAGE_TITLE',
            payload: heading
        })
    }, [])

    useEffect(() => {
        dispatch({
            type: 'FETCH_REP_FOR_DASH'
        })
    }, [])

    return (
        <>
            <Button variant="contained" className={classes.navButton} align="right" onClick={goAddGig}>Add Gig</Button>
            <Button variant="contained" className={classes.navButton} align="right" onClick={goNewRep}>New Rep</Button>
            <Grid item container>
                <Grid item xs={1} /> {/* left gutter */}
                <Grid item container spacing={3} xs={10} > {/* body */}
                    <Grid className={classes.dashGrid} item xs>
                        <Card className={classes.dashCard} onClick={() => handleClick('/history')}>
                            <CardContent>
                                <Typography variant="h6" className={classes.cardName}>
                                    Your Gigs
                                </Typography>
                                <ul className={classes.list}>
                                    {gigs.slice(0, 9).map(gig => {
                                        return (
                                            <li className={classes.li}>{gig.date.slice(0, 10)}: {gig.ensemble}. {gig.show}</li>
                                        )
                                    })}
                                </ul>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid className={classes.dashGrid} item xs>
                        <Card className={classes.dashCard} onClick={() => handleClick('/musiclibrary')}>
                            <CardContent>
                                <Typography variant="h6" className={classes.cardName}>
                                    Music Library: Newest
                                </Typography>
                                <ul className={classes.list}>
                                    {rep.slice(0, 9).map(piece => {
                                        return (
                                            <li className={classes.li}>{piece.lastname}: {piece.title}</li>
                                        )
                                    })}
                                </ul>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={1} /> {/* right gutter */}
            </Grid>
        </>
    );
}

export default Dashboard;