'use strict'
import * as loggerConstants from '../constants/loggerconstants';
import { currentYear , currentMonth } from '../helper';
// LOGIN_FAILURE,
//   LOGIN_SUCCESSFULL,
//   REQUEST_LOGIN,
//   SET_CURRENT_MONTH,
//   SET_CURRENT_DATA,
//   SET_CURRENT_YEAR,
//   SET_CURRENT_USER,
//   SET_TOKEN,
//   REMOVE_TOKEN
var initialstate={
  currentMonth : currentMonth(),
  currentYear : currentYear(),
  data : [],
  items : [],
  auth : null,
  users :[]
}

const loggerReducer=(state=initialstate,action)=>{
    switch(action.type){
      case loggerConstants.REQUEST_LOGIN :
        return Object.assign({},state);
      case loggerConstants.LOGIN_SUCCESSFULL:
        var object=Object.assign({},state);
        object.auth=action.payload.data;
        return object;
      case loggerConstants.LOGIN_FAILURE :
        var object=Object.assign({},state);
        object.statusText=action.payload.data;
        return object;
      case loggerConstants.LOGOUT :
        var object=Object.assign({},state);
        object.users=[];
        object.items=[];
        object.auth=null;
        return object;
      case loggerConstants.SET_USERS :
        var object=Object.assign({},state);
        object.users=action.payload.data;
        return object;
      case loggerConstants.SET_DATA :
        var object=Object.assign({},state);
        object.items=action.payload.data;
        return object;
      case loggerConstants.PUSH_DATA :
        var object=Object.assign({},state);
        object.items[action.payload.data.key]=action.payload.data.booking;
        return object;
      default :
      return state;
    }
}


export default loggerReducer;