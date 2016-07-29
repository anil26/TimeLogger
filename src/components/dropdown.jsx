'use strict';
import React from 'react';
import Select from 'react-select';

var years=[{value:2013,label : "2013"},{value:2014,label : "2014"},{value:2015,label : "2015"},{value:2016,label : "2016"},{value:2017,label : "2017"},{value:2018,label : "2018"},{value:2019,label : "2019"},{value:2020,label : "2020"},{value:2021,label : "2021"}];

class YearDropDown extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectValue : 2016,
      clearable : false,
      disabled : false,
      searchable : false
    }
  }

  updateValue(newValue){
    this.setState({
      selectValue : newValue
    })
    this.props.setCurrentYear(newValue);
  }

  focusStateSelect () {
    this.refs.yearSelect.focus();
  }

  render(){
    var options=years;
    return(
      <Select ref="yearSelect" autofocus options={options} simpleValue clearable={this.state.clearable} name="selected-year" disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue.bind(this)} searchable={this.state.searchable} />
    );
  }

}
export default YearDropDown;
