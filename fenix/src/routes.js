import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
import Home from '././components/Home/Home';
import UserContext from './contexts/UserContext'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
}));

function Routes(){
  const classes = useStyles();
  
//

  return(
    <div className={classes.container}>
    <UserContext>    
      <BrowserRouter >
          <Switch>   
              <Route exact path="/"><Home/></Route>
              <Route exact path="/Home"><Home/></Route>
          </Switch>
      </BrowserRouter>
    </UserContext>
    </div>
);

}

export default Routes;