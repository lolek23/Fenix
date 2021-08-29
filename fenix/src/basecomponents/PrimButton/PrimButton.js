import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import customConfig from '../../customConfig.json'

const styles = {
  root: {
    background:  'linear-gradient(45deg, '+customConfig.Colors.btnPrimaryColor1+' 30%, '+customConfig.Colors.btnPrimaryColor2+' 90%)',
    borderRadius: 5,
    border: 0,
    color: customConfig.Colors.TextColor,
    height: '35px',
    fontSize:'16px',
    fontWeight:'600',
    padding: '5px',
    boxShadow: '0 3px 5px 2px rgba('+customConfig.Colors.btnPrimaryShadow1+')',
  },
};

const PrimButton = withStyles(styles)(({ classes, ...other }) => (
  <Button className={classes.root} {...other} />
));

export default PrimButton