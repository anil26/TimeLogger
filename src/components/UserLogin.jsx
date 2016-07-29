'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'formsy-react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import MyInput from './input';
import { connect } from 'react-redux';
import * as loggerActionCreators from '../actions/loggeractions';

const UserLogin = React.createClass({
  getInitialState() {
    return { canSubmit: false };
  },
  componentDidMount(){
    if (this.shouldNotRender()) {
      browserHistory.push('/app');
    }
  },
  shouldNotRender(){
    return (this.props.auth);
  },
  componentDidUpdate(){
    if (this.shouldNotRender()){
      browserHistory.push('/app');
    }
  },
  submit(data) {
    this.props.actions.login(data.email,data.password);
  },
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: false });
  },
  render() {
    return (
      <div>
      <h1 className='center'>Login to TimeLogger Website</h1>
      <Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="center">
        <MyInput value="" name="email" title="EmailId:" validations="isEmail" validationError="This is not a valid email" required />
        <MyInput value="" name="password" title="Password:" type="password" required />
        <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
      </Form>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  auth : state.auth,
  statusText : state.statusText
});


const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(loggerActionCreators, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
