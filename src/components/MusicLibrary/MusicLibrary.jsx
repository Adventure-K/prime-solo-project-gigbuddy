import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
 
import './MusicLibrary.css';

const useStyles = makeStyles((theme) => ({
  upcomingCard: {
    flexGrow: 1,
    marginTop: '18px',
    maxHeight: '62vh',
    margin: '0 auto',
    display: 'inline-block',
    padding: '5px',
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: '#ecffe5',
    boxShadow: '2px 2px 5px #000',
    overflow: 'auto',
    display: 'block',
    width: '95vw',
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
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '2vw',
    float: 'left',
  },
  backButton: {
    marginRight: '2vw',
    marginTop: '20px',
    float: 'right',
  },
  unsortable: {
    color: '#888888',
  },
  musicLibraryTable: {
    overflow: 'auto',
    maxHeight: '55vh',
    display: 'block',
  }
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
      type: 'FETCH_REP' // rep.saga
    })
    dispatch({
      type: 'UPDATE_PAGE_TITLE', //pagetitle.reducer
      payload: heading
    })
  }, [])

  const goDetail = () => {
    history.push(`/repdetail/`)
  }
  const goBack = () => {
    history.goBack();
  }
  const composers = () => {
    history.push('/composers')
  }
  const newRep = () => {
    history.push('/addrep')
  }

  const sortTable = (n) => {  // Function to make clickable table headers to sort by column. n: index of clicked column  
                              // Compares td content of every row in that column to the one after it. Starts over every time two rows are swapped
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("musicLibraryTable")
    switching = true;     // Enable the loop below to start
    dir = "asc";          // Function can do ascending and descending sort. Set ascending by default here
    while (switching) {   // Loop to let the other loop run for every pair of items that need to swap order
      switching = false;  // Enable the loop to stop by setting this; only overridden below when more iterations are needed 
      rows = table.rows;  // HTMLCollection object
      for (i = 1; i < (rows.length - 1); i++) {         // Loop to find the next pair of items that need to swap
        shouldSwitch = false;                           // Don't change row order by default, this toggles below if mismatch found
        x = rows[i].getElementsByTagName("td")[n];      // table data at a row and column n
        y = rows[i + 1].getElementsByTagName("td")[n];  // table data at the row after it and column n
          
          if (dir == "asc") { // An if statement for each sorting order
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) { // Compares both td strings to find mismatch, i.e. how alphabetizing works
              shouldSwitch = true; // if mismatch then toggle this
              break; // If we find two rows that need switching, exit the for loop and take care of it - proceed to if(shouldSwitch)
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
      } // End of for loop
      if (shouldSwitch) { // i.e. mismatch found
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); // order switch happens here. insertBefore is the method used to change the order of rows. It has to be called on the parent node of the rows, <tbody>
        switching = true; // this is toggled to enable while loop to continue, to check the rest of the rows
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") { // If already sorted by clicked column, swap direction and sort again
          dir = "desc";
          switching = true;
        }
      }
    } // End of while loop
  };

  console.log('rep from store', rep)
  return (
    <>
      <Button variant="contained" className={classes.navButton} onClick={composers}>Composers</Button>
      <Button variant="contained" className={classes.navButton} onClick={newRep}>New Rep</Button>
      <Button variant="contained" className={classes.backButton} onClick={goBack}>Back</Button>
      <Grid container>
        <Grid item container xs={12} style={{ display: 'inline-block' }}>
          <div className={classes.upcomingCard}>
            {/* <div className="wasCardContent" display="inline-block"> */}
            <table id="musicLibraryTable">
              <thead>
                <tr>
                  <th className={classes.tableCol} onClick={() => sortTable(0)}>Composer</th>
                  <th className={classes.tableCol} onClick={() => sortTable(0)}></th>
                  <th className={classes.tableCol} onClick={() => sortTable(2)}>Title</th>
                  <th className={classes.tableCol} onClick={() => sortTable(3)}>Work / Collection</th>
                  <th className={[classes.unsortable, classes.tableCol].join(' ')}>Score</th>
                  <th className={[classes.unsortable, classes.tableCol].join(' ')}>Recording</th>
                  <th className={classes.tableCol} onClick={() => sortTable(6)}>Context</th>
                </tr>
              </thead>
              <tbody>
                {rep.map(piece => {
                  return (
                    <tr className="mlRow" key={piece.id}>
                      <td className={classes.cell}>{piece.lastname}</td>
                      <td className={classes.cell}>{piece.firstname}</td>
                      <td className={classes.cell}>{piece.title}</td>
                      <td className={classes.cell}>{piece.collection}</td>
                      <td className={classes.cell}>{piece.scorelink && <a href={piece.scorelink}>Link</a>}</td>
                      <td className={classes.cell}>{piece.reclink && <a href={piece.reclink}>Link</a>}</td>
                      <td className={classes.cell}>{piece.category}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* </div> */}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default MusicLibrary;