'use strict'
import React from 'react';
import TimeLine from './timeline';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loggerActionCreators from '../actions/loggeractions';
import Navigation from './navigation';

class App extends React.Component{
  removeItem(itemId){
    this.props.actions.removeSchedule(itemId);
  }
  render(){
    console.log("rerendered");
    return (
      <div>
        <Navigation auth={this.props.auth} logout={this.props.actions.logout}/>
        {this.props.auth? <TimeLine  items={this.props.items} groups={this.props.users}  setSchedule={this.props.actions.setSchedule}   removeItem={this.removeItem.bind(this)} /> : '' }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  auth : state.auth,
  data: state.data,
  statusText : state.statusText,
  items : state.items,
  users : state.users
  };
};


const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(loggerActionCreators, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(App);