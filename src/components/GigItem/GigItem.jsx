import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        // width: "10em",
        height: "22em",
    },
    title: {
        fontSize: 18,
        marginBottom: "4px"
    },
    alignCenter: {
        display: "flexbox",
        alignItems: "center",
        justifyContent: "center"
    },
    cardBox: {
        margin: "15px",
    },
    cardPoster: {
        size: "10%",
    },
    li: {

    },
    future: {
        border: '1px solid darkgreen',
        backgroundColor: 'lightgreen'
    },
});

function GigItem({ gig }) {
    const history = useHistory();
    const dispatch = useDispatch();
    // console.log('gig:', gig)

    const goDetail = () => {
        // console.log('gig:', gig)
        history.push(`/gigdetail/${gig.id}`)
        dispatch({
            type: 'ACTIVE_GIG',
            payload: gig
        })
        dispatch({
            type: 'FETCH_REP',
        })
        dispatch({
            type: 'FETCH_ACTIVE_GIG_REP',
            payload: gig.id
        })
    }

    const classes = useStyles();

    const d = gig.date.slice(0, 10)

    const getToday = () => {
        let day0 = new Date();
        let dd = dd = String(day0.getDate()).padStart(2, '0');
        let mm = String(day0.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = day0.getFullYear();

        let today = yyyy + mm + dd;
        return today;
    }

    let thisGigWhen = gig.date.replace(/-|\s/g, "");
    let today = getToday();
    console.log('this gig:', thisGigWhen)
    if (thisGigWhen < today) {
        return (
            <>
                <tr className={classes.li} key={gig.id} onClick={() => { goDetail(gig) }}>
                    <td>{d}</td>
                    <td>{gig.ensemble}</td>
                    <td>{gig.show}</td>
                </tr>
            </>
        )
    } else {
        return (
            <>
                <tr className={classes.future} key={gig.id} onClick={() => { goDetail(gig) }}>
                    <td>{d}</td>
                    <td>{gig.ensemble}</td>
                    <td>{gig.show}</td>
                </tr>
            </>
        )
    }
}

    export default GigItem;