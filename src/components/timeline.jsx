'use strict'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import React from 'react'
import ReactDOM from 'react-dom';
import { Modal, ModalBody, ModalFooter ,PageHeader,ModalTitle, ModalHeader,Form, Button,FormGroup,FormControl, ControlLabel} from 'react-bootstrap';
import DatePicker  from 'react-bootstrap-date-picker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loggerActionCreators from '../actions/loggeractions';

class MyTimeLine extends React.Component{
  constructor(props){
    super(props);
      var value = (new Date()).toISOString();
    this.state={
      showModal: false,
      value : value,
      value1 : value,
      remove : false,
      itemId : null,
      items : {},
      groups: {}
  }
    this.createItems=this.createItems.bind(this);
    this.createGroups=this.createGroups.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }
  // componentWillReceiveProps(nextProps){
  //    console.log("coming nextprops");
  //   console.log(nextProps);
  //   this.setState({
  //     items : nextProps.items,
  //     groups : nextProps.groups,
  //     flag : nextProps.flag
  //   })
  // }


  handleChange(value) {
     this.setState({
      value : value
    });
  }
  forceUpdateHandler() {
      this.forceUpdate();
   };
  createItems(items){
    var items=items;
    console.log("call createitems");
    console.log(items);
    var  itemArray=[];
    for(var props in items){
      var obj={};
      obj.id=props;
      obj.group=items[props].group;
      obj.title=items[props].project + " for " + items[props].hours + " hours";
      obj.start_time=moment(items[props].from);
      obj.end_time=moment(items[props].to);
      obj.canResize=true;
      obj.canMove =true;
      obj.canResize=false;
      itemArray.push(obj);
  }
  return itemArray;
  }
  createGroups(groups){
    console.log("rendering creategroups");
    var users=groups;
    var groupsArray=[];
    for(var props in users){
      var obj={};
      obj.id=props;
      obj.title=users[props].name;
      groupsArray.push(obj);
    }
    groupsArray.push({
      id : 4,
      title : ''
    });
    return groupsArray;
  }
  handleChangeforTo(value){
    this.setState({
      value1 : value
    });
  }
  onItemClick(itemId,key){
    var that=this;
    this.setState({
      remove : true,
      itemId : itemId
    },function(){
      that.open();
    });

  }
  close() {
    this.setState({
      showModal: false,
      remove : false
     });
  }
  open() {
    this.setState({ showModal: true });
  }
  onSubmit(event){
    var hours=ReactDOM.findDOMNode(this.refs.Hours).value;
    var projectName=ReactDOM.findDOMNode(this.refs.project).value;
    var fromTimeString=this.refs.from.getValue();
    var fromTime= new Date(fromTimeString);
    var year=fromTime.getFullYear();
    var fromTimeInISO=fromTime.toISOString();
    var toTimeString=this.refs.to.getValue();
    var toTime=new Date(toTimeString);
    var toTimeInISO=toTime.toISOString();
    this.props.actions.setSchedule(year,fromTimeInISO,toTimeInISO,hours,projectName,this.state.groupId);
    this.setState({
      showModal : false
    });
  }
  onRemove(){
    var itemid=this.state.itemId;
    this.props.actions.removeSchedule(itemid);
    this.setState({
      showModal : false
    });
  }

  onCanvasClick(groupId, time, event){
    var that=this;
    this.setState({
      groupId : groupId,
      value : time,
      value1 : time

    },function(){
      that.open();
    });
  }
  render(){
    var minTime = moment().year(this.props.currentYear).month(1).date(1);
    var maxTime = moment().year(this.props.currentYear).month(12).date(31);
    return (
      <div>
        <PageHeader>TimeLogger App</PageHeader>
        <Timeline groups={this.createGroups(this.props.users)}
              items={this.createItems(this.props.items)}
              defaultTimeStart={moment().year(this.props.currentYear).month(1).date(1)}
              defaultTimeEnd={moment().year(this.props.currentYear).month(12).date(31)}
              sidebarWidth={200}
              lineHeight={50}
              minZoom={24*60*60*1000}
              stackItems={true}
              canMove={false}
              canChangeGroup={false}
              onItemClick={this.onItemClick.bind(this)}
              onCanvasClick={this.onCanvasClick.bind(this)}
              visibleTimeStart={moment().year(this.props.currentYear).month(1).date(1)}
              visibleTimeEnd={moment().year(this.props.currentYear).month(12).date(31)}

        />
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <ModalHeader closeButton>
            <ModalTitle>Booking</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form >
                <FormGroup>
                  <ControlLabel>From</ControlLabel>
                  <DatePicker ref="from" value={this.state.value} onChange={this.handleChange.bind(this)} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel> To</ControlLabel>
                  <DatePicker ref="to" value={this.state.value1} onChange={this.handleChangeforTo.bind(this)} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Hours/day</ControlLabel>
                  <FormControl ref="Hours" type="text" placeholder="enter hours/day"/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Project</ControlLabel>
                  <FormControl ref="project" type="text" placeholder="enter project name"/>
                </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {this.state.remove?<Button bsStyle="danger" onClick={this.onRemove.bind(this)}>Remove Booking</Button> : null}
            <Button onClick={this.onSubmit.bind(this)}>Add Booking</Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </ModalFooter>
        </Modal>
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
    users : state.users,
    currentYear : state.currentYear,
    flag : true
  };
};


const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(loggerActionCreators, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(MyTimeLine);