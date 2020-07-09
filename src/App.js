import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import 'fontsource-roboto';
import ButtonAppBar from './components/appbar'
import SnapShots from './components/snapshots'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <ButtonAppBar />
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <SnapShots />
        </Paper>
      </Grid>
    </Grid>
    </div>
  );
}

export default App;
