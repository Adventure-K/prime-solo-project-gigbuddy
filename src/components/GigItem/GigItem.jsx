import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'

// Material-UI
import { makeStyles } from '@material-ui/core/styles';

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
        console.log('gig:', gig)
        history.push(`/gigdetail/${gig.id}`)
        dispatch({
            type: 'ACTIVE_GIG', // To: activeGig.reducer
            payload: gig
        })
        dispatch({
            type: 'FETCH_REP', // rep.saga
        })
        dispatch({
            type: 'FETCH_ACTIVE_GIG_REP', // gig.saga
            payload: gig.id
        })
    }

    const classes = useStyles();

    // Format dates nicely and automated past and future distinction

    // gig.date initial form is ISO String, e.g. "2022-04-10T05:00:00.000Z"
    const displayDate = gig.date.slice(0, 10)
    // Set displayDate to the 10 chars starting at pos 0. e.g. "2022-04-10"

    /*
    const getToday = () => {
        let day0 = new Date(); // current date, e.g. Thu Dec 01 2022 14:57:23 GMT-0500 (Central Daylight Time)
        let dd = dd = String(day0.getDate()).padStart(2, '0'); // get date out of ^. e.g. 01
        let mm = String(day0.getMonth() + 1).padStart(2, '0'); // get month out of ^. e.g. 12. January is 0 hence the + 1
        let yyyy = day0.getFullYear(); // get year out of ^. e.g. 2022

        let today = yyyy + mm + dd; // e.g. 20221201
        return today;
    }*/

    let thisGigWhen = gig.date.replace(/-|\s/g, ""); // This regex removes all hyphens and spaces from date string
    let today = new Date().toISOString().replace(/-|\s|T.*$/g, "") // Converts ISO String into yyyymmdd. Same thing as getToday but in one line...
    if (thisGigWhen < today) { // Alternate styling for gigs in the past and future. Past:
        return (
            <>
                <tr className={classes.li} key={gig.id} onClick={() => { goDetail(gig) }}>
                    <td>{displayDate}</td>
                    <td>{gig.ensemble}</td>
                    <td>{gig.show}</td>
                </tr>
            </>
        )
    } else { // Future:
        return (
            <>
                <tr className={classes.future} key={gig.id} onClick={() => { goDetail(gig) }}>
                    <td>{displayDate}</td>
                    <td>{gig.ensemble}</td>
                    <td>{gig.show}</td>
                </tr>
            </>
        )
    }
}

    export default GigItem;