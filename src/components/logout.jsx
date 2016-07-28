'use strict'
import React from 'react';
import{ Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
class LogOut extends React.Component{
  onClick(){
    this.props.logout();
  }

  render(){
    return (
      <div className="logout">
        <Button  bsStyle="danger" onClick={this.onClick.bind(this)}>Logout</Button>
      </div>

    );
  }
}

export default LogOut;