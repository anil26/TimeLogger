'use strict';

import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import YearDropDown from './dropdown';
import LogOut from './logout';
class Navigation extends React.Component{

  render(){
      if(this.props.auth!=null){
        return (
          <div className="navclass">
            <YearDropDown setCurrentYear={this.props.setCurrentYear}/>
            <LogOut logout={this.props.logout}/>
          </div>
        );
      }
      else {
        return null;
      }
  }

}

export default Navigation;
