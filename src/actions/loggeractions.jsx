'use strict'
import * as loggerConstants from '../constants/loggerconstants';
import { browserHistory } from 'react-router';

// LOGIN_FAILURE,
//   LOGIN_SUCCESSFULL,
//   REQUEST_LOGIN,
//   SET_CURRENT_MONTH,
//   SET_CURRENT_DATA,
//   SET_CURRENT_YEAR,
//   SET_CURRENT_USER,
//   SET_TOKEN,
//   REMOVE_TOKEN,
//   REMOVE_DATA,
//   LOGOUT,
//   SET_USERS
const loginRequest=()=>{
  return {
    type : loggerConstants.REQUEST_LOGIN
  }

}
const loginSuccessfull=(data)=>{
  return {
    type : loggerConstants.LOGIN_SUCCESSFULL,
    payload : {
      data : data
    }
  }
}
const loginFailure=(error)=>{
  return {
    type : loggerConstants.LOGIN_FAILURE,
    payload : {
      error : error
    }
  }
}

const removeToken=(auth)=>{
  return {
    type : loggerConstants.LOGOUT,
  }
}
const setData=(data)=>{
  return {
    type : loggerConstants.SET_DATA,
    payload : {
      data : data
    }
  }
}

const pushData=(data)=>{
  return {
    type : loggerConstants.PUSH_DATA,
    payload : {
      data : data
    }
  }
}

const setUsers=(data)=>{
  return {
    type : loggerConstants.SET_USERS,
    payload : {
      data : data
    }
  }
}

const RemoveData=(data)=>{
  return {
    type : loggerConstants.REMOVE_DATA,
    payload : {
      data : data
    }
  }
}

const login=(email,password)=>{
 return function(dispatch){
    dispatch(loginRequest());
    firebase.auth().signInWithEmailAndPassword(email,password).then(function(data){
      dispatch(loginSuccessfull(data));
      dispatch(getUsers());
      dispatch(getItems("2016"));
    }).catch(function(error){
       dispatch(loginFailure(error));
    })
  }

}

const setSchedule=(year,fromTimeInISO,toTimeInISO,hours,projectName,groupId)=>{
  return function(dispatch){
    var bookingToBeSet={
      "from" : fromTimeInISO,
      "to" : toTimeInISO,
      "project" : projectName,
      "hours" : hours,
      "group": groupId

    }
    var newBookingKey = firebase.database().ref().child("/years" + "/"+ year).push().key;
    var updates={};
    updates["/" + "year" + "/" + year + "/" +newBookingKey]=bookingToBeSet;
      return firebase.database().ref().update(updates).then(function(){
        var obj={
          key: newBookingKey,
          booking : {
            "from" : fromTimeInISO,
            "to" : toTimeInISO,
            "project" : projectName,
            "hours" : hours,
            "group": groupId
          }
        }
      }).
      catch(function(error){
        console.log(error);
      })
  }
}


const removeSchedule=(itemId)=>{

}

const getItems=(year)=>{
  return function(dispatch){
    firebase.database().ref('/year'+ "/"+year).once('value').then(function(snapshot){
      var items=snapshot.val();
      dispatch(setData(items));
    }).
    catch(function(error){
      console.log("error");
    });
  }
}

const getUsers=()=>{
  return function(dispatch){
    firebase.database().ref('/users').once('value').then(function(snapshot){
      var users=snapshot.val();
      dispatch(setUsers(users));
    }).
    catch(function(error){
      console.log("error");
    });
  }
}

const logout=()=>{
  return function(dispatch){
    firebase.auth().signOut().then(function() {
    dispatch(removeToken());
    browserHistory.push('/login');

  }, function(error) {
    console.log(error)
  });
  }
}

export {
  login,
  logout,
  setSchedule,
  removeSchedule,
  getUsers,
  getItems
}