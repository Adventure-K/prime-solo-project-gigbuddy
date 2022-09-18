import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  aboutUl: {
    marginBottom: '15px',
  },
  container: {
    marginTop: '20vh',
  }
}));

function AboutPage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={2} />
        <Grid item xs={2} justify="center">
          <h3>Technologies</h3>
          <ul className={classes.aboutUl}>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React.js</li>
            <li>Redux</li>
            <li>Redux-Saga</li>
            <li>Material UI</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>PG</li>
            <li>Passport</li>
          </ul>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={2} />
        <Grid item xs={2}>
          <h3>Thank You</h3>
          <ul className={classes.aboutUl}>
            <li>Our Instructors</li>
            <ul className={classes.aboutUl}>
              <li>Dane Smith</li>
              <li>Kris Szafranski</li>
              <li>Matt Black</li>
            </ul>
            <li>Our Mentors</li>
            <ul className={classes.aboutUl}>
              <li>Sarah Doire</li>
              <li>JJ Wittrock-Roske</li>
            </ul>
            <li className={classes.aboutUl}>The Mitchison Cohort</li>
            <li>My friends and family for their support and encouragement</li>
          </ul>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </div>
  );
}

export default AboutPage;
