'use strict'
import React from 'react';
import MyTimeLine from './timeline';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loggerActionCreators from '../actions/loggeractions';
import Navigation from './navigation';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items : [],
      groups : []
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      items : nextProps.items,
      groups : nextProps.groups
    })
  }
  render(){
    console.log("rerendered");
    return (
      <div>
        <Navigation auth={this.props.auth} setCurrentYear={this.props.actions.setCurrentYear} logout={this.props.actions.logout}/>
        {this.props.auth?<MyTimeLine />  : '' }
      </div>
    );
  }
}
//<TimeLine flag={ this.props.flag } currentYear={ this.props.currentYear } items={this.props.items} groups={this.props.users}  setSchedule={this.props.actions.setSchedule}   removeItem={this.props.actions.removeSchedule} />

const mapStateToProps = (state) => {
  console.log("changed");
  return {
    auth : state.auth,
    data: state.data,
    statusText : state.statusText,
    items : state.items,
    users : state.users,
    currentYear : state.currentYear,
    flag : true
  };
};


const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(loggerActionCreators, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(App);