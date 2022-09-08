import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
        background: 'beige',
        borderRadius: '9px'
    }
}));

function Dashboard(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Dashboard');

    const classes = useStyles();
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

    return (
        <Grid item container>
            <Button variant="contained" className={classes.navButton} onClick={goNewRep}>New Rep</Button>
            <Button variant="contained" className={classes.navButton} onClick={goAddGig}>Add Gig</Button>
            <Grid item xs={1} /> {/* left gutter */}
            <Grid item container spacing={3} xs={10} > {/* body */}
                <Grid className={classes.dashGrid} item xs>
                    <Card className={classes.dashCard} onClick={() => handleClick('/upcoming')}>
                        <CardContent>
                            <Typography variant="h6">
                                Upcoming
                            </Typography>
                            <ul className={classes.list}>
                                <li className={classes.li}>11/04/22: Incantare. 30 Years' War</li>
                                <li className={classes.li}>11/14/22: Mirandola. Flemish Giants</li>
                                <li className={classes.li}>12/15/22: Mirandola. 22 Christmas Bash</li>
                                <li className={classes.li}>2/12/23: St. Mark's Music Series. Dichterliebe</li>
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid className={classes.dashGrid} item xs>
                    <Card className={classes.dashCard} onClick={() => handleClick('/history')}>
                        <CardContent>
                            <Typography variant="h6">
                                History
                            </Typography>
                            <ul className={classes.list}>
                                <li className={classes.li}>08/01/22: Augsburg Fortress. Recording Session</li>
                                <li className={classes.li}>06/15/22: Mirandola. Class Notes</li>
                                <li className={classes.li}>03/15/22: St. Michael's Stillwater</li>
                                <li className={classes.li}>12/01/21: Oratorio Society. Eternal Light</li>
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid className={classes.dashGrid} item xs>
                    <Card className={classes.dashCard} onClick={() => handleClick('/musiclibrary')}>
                        <CardContent>
                            <Typography variant="h6">
                                Music Library: Newest
                            </Typography>
                            <ul className={classes.list}>
                                <li className={classes.li}>Willaert: Ave virgo sponsa Dei</li>
                                <li className={classes.li}>Dowland: Go, Crystal Tears</li>
                                <li className={classes.li}>Lasso: Sibyllarum Prophetiae</li>
                                <li className={classes.li}>Du Fay: Mille regretz</li>
                                <li className={classes.li}>Bach: Coffee Cantata</li>
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={1} /> {/* right gutter */}
        </Grid>
    );
}

export default Dashboard;

{/* <Grid item xs align='right' className={classes.buttonGrid} >
<Link className={classes.navLink} to="/addrep">
  Add Rep
</Link>
</Grid>
<Grid item xs align='right' className={classes.buttonGrid} >
<Link className={classes.navLink} to="/addgig">
  Add Gig
</Link>
</Grid> */}