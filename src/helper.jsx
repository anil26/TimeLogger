'use strict'
var indexToMonthMap=["January","February","March","April","May","June","July","August","September","October","November","December"];

function currentYear(){
  return (new Date()).getFullYear();
}
function currentMonth(){
  return (indexToMonthMap[new Date().getMonth()]);
}
export {
  currentYear,
  currentMonth
}