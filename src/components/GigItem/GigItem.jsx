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
    }
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

    return (
        <>
            <tr key={gig.id} onClick={() => { goDetail(gig) }}>
                <td>{d}</td>
                <td>{gig.ensemble}</td>
                <td>{gig.show}</td>
            </tr>
        </>
    )
}

export default GigItem;