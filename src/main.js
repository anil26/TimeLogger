import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import AppContainer from './containers/AppContainer'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import Root from './components/Root';
import loggerReducer from './reducers/loggerreducer';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { currentYear , currentMonth } from './helper';
import { getUsers } from './actions/loggeractions';


const MOUNT_NODE = document.getElementById('root')


window.___INITIAL_STATE__={
  currentMonth : currentMonth(),
  currentYear : currentYear(),
  data : [],
  items : [],
  users : [],
  auth : null,
  statusText :'',
  flag : true
}

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = compose(middlewareEnhancer,window.devToolsExtension ? window.devToolsExtension() : f => f );
const store = createStore(loggerReducer, window.__INITIAL_STATE__, enhancers);

ReactDOM.render(<Root store={store}/>,document.getElementById('root'));
