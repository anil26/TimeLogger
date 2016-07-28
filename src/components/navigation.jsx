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
        <YearDropDown/>

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




// <Nav bsStyle="pills" activeKey={1}>
//           <NavItem eventKey={1} >Jan</NavItem>
//           <NavItem eventKey={2} >Feb</NavItem>
//           <NavItem eventKey={3} >Mar</NavItem>
//           <NavItem eventKey={4} >Apr</NavItem>
//           <NavItem eventKey={5} >May</NavItem>
//           <NavItem eventKey={6} >Jun</NavItem>
//           <NavItem eventKey={7} >Jul</NavItem>
//           <NavItem eventKey={8} >Aug</NavItem>
//           <NavItem eventKey={9} >Sep</NavItem>
//           <NavItem eventKey={10} >Oct</NavItem>
//           <NavItem eventKey={11} >Nov</NavItem>
//           <NavItem eventKey={12} >Dec</NavItem>
//         </Nav>