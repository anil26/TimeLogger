'use strict'
import React from 'react';
import { render } from 'react-dom';
import TimeLine from '../components/timeline';
import UserLogin from '../components/UserLogin';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from '../components/App';
class Routes extends React.Component{
  render(){
    return (
    <Router history={browserHistory}>
      <Route path="/login" component={UserLogin}/>
      <Route path="/app" component={App}/>
    </Router>
    );
  }
}

export default Routes;
