import React from 'react';
import styleClasses from './AppBar.css';
import { Typography, Toolbar } from 'material-ui'

const appBar = () => {

  return(
    <div className={styleClasses.root}>
    <Toolbar position='fixed' className={styleClasses.appBar}>
    <Typography type='headline' color='inherit'>
      Pictsy
    </Typography>
    </Toolbar>
    </div>
  );
}

export default appBar;
