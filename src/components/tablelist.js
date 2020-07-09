import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


import formatBytes from '../functions/formatBytes'

import WAXsvg from "../assets/img/logo-wax";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.text.primary,
    marginBottom: 10 
  },
  table: {
    minWidth: 400,
  },
  textcolour: {
    color: 'white'
  }
}));


export default function SnapTables({ snapshots, chain }) {
  const classes = useStyles();
  // Create new function called bytes, takes in value and passes back to imported formatBytes function
  const bytes = (v) => formatBytes(v);
  return (
    <>
    <Paper className={classes.paper} elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={3} md={1}>
          <Box position="left" align="left">
            <WAXsvg style={{ fontSize: 70 }}/>
          </Box>
        </Grid>
        <Grid item xs={3} md={1}>
          <Typography component="div">
            <Box className={classes.textcolour} align="left" fontSize="h4.fontSize" fontWeight="fontWeightBold"  m={1} color="text.disabled">
            {chain}
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
   
    <TableContainer component={Paper} className={classes.tableroot}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Filename</StyledTableCell>
            <StyledTableCell align="right">Size</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {snapshots.map((snapshot) => (
            <StyledTableRow key={snapshot.Key}>
              <StyledTableCell component="th" scope="row">
              <a href={snapshot.url}>{snapshot.Key}</a>
              </StyledTableCell>
              <StyledTableCell align="right">{bytes(snapshot.Size)}</StyledTableCell>
              <StyledTableCell align="right">{snapshot.LastModified.toUTCString()}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}