import React, { useState } from 'react';
import NodeFetch from 'node-fetch' 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//import BOMsvg from '../assets/img/bomlogo'
//<BOMsvg style={{ fontSize: 50 }} className={classes.bomsvg} />
import coreLogo from '../assets/img/logo.svg'

import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuwax: {
   //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: '#000000',
    border: 0,
    borderRadius: 3,
    //color: 'white',
    padding: '0 30px',
  },
  bomsvg: {
    padding: '0 30px',
  },
  imageIcon: { height: '100%' },
  iconRoot: { textAlign: 'center', padding: '0 30px' },
}));


const guildjson = process.env.REACT_APP_GUILD_BP_JSON

export default function ButtonAppBar() {
  const [guildname, setGuildname] = useState([]);
  const classes = useStyles();
  
  //Fetch the Guild Candidate name
  const guild_info = (url) => {
    fetch(url)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
            return response.json();
            } else {
            throw Error(response.statusText);
            }
        })
        .then((jsonRes) => {
             //Assign guildname to Guildname state
             setGuildname(jsonRes['org']['candidate_name'])
          }).catch((error) => {
            // Handle the error
            console.log(error);
        });
    
    }
  guild_info(guildjson)

  return (
    <div className={classes.root}>
      <AppBar  className={classes.menuwax}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Icon style={{ fontSize: 50 }} classes={{root: classes.iconRoot}}>
            <img alt="mainlogo" className={classes.imageIcon} src={coreLogo}/>
          </Icon>
          <Typography fontWeight="fontWeightBold" variant="h4" className={classes.title} color='default'>
            {guildname} - Snapshots
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}