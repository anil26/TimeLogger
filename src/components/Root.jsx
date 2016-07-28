'use strict'

import React from 'react';
import { Provider } from 'react-redux';
import Routes from '../routes/routes';

class Root extends React.Component{
   render() {
    return (
      <Provider store={this.props.store}>
      <Routes />
      </Provider>
    );
  }
}
export default Root;
