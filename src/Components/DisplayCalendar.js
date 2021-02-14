import React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  MonthView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

import {
//   Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
//   Appointments,
  TodayButton,
  ViewSwitcher,

} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2018-11-01';
var schedulerData = [
  { "startDate" : '2020-02-01T09:45', "endDate" : '2020-02-01T11:00' },
  { "startDate": '2018-11-01T12:00', "endDate": '2018-11-01T13:30'},
]

var arr = [];
class DisplayCalendar extends React.Component{
    
    constructor(props){
        super();
        this.state ={
            data1 : props.data,
            count : 0,
            currentDate: "2020-02-01",
            startHour : 6,
            endHour : 18
        }
        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    }

    componentDidMount(){
        this.setState({
            data1 : Array.from(arr)
        }, () => (this.fetchStartEndHour()))

    }
    fetchStartEndHour(){
        var startTimeArr = [];
        var endTimeArr = [];
        var dataArr = this.state.data1;
        for(var i=0;i<dataArr.length;i++){
            var dataObj = dataArr[i];
            var str;
            str = dataObj["startDate"];
            str=str.substring(11,13);
            startTimeArr[i] = parseInt(str);
            str = dataObj["endDate"];
            str=str.substring(11,13);
            endTimeArr[i] = parseInt(str);
        }
        this.setHours(Math.min(...startTimeArr), Math.max(...endTimeArr));
    }
    setHours(start, end){
        this.setState({
            startHour :start -1,
            endHour : end + 1
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.data!==null){
            if(nextProps.data.count!== this.state.count){
                this.setState({
                    data1 : nextProps.data,
                    count : nextProps.data.count
                })
            }
        }
    }
    render(){
        return(
            <React.Fragment>
                <Paper>
                    <Scheduler
                    data={Array.from(this.state.data1)}
                    >
                    <ViewState
                        currentDate={this.state.currentDate}
                        onCurrentDateChange={this.currentDateChange}
                        defaultCurrentViewName="Day"
                    />
                    <MonthView 
                        currentDate={this.state.currentDate}
                        onCurrentDateChange={this.currentDateChange}
                    />
                    <DayView
                        startDayHour={this.state.startHour}
                        endDayHour={this.state.endHour}
                    />
                    <WeekView
                        startDayHour={this.state.startHour}
                        endDayHour={this.state.endHour}
                    />
                    <Toolbar />
                    <ViewSwitcher />
                    <DateNavigator />
                    <Appointments />
                    </Scheduler>
                </Paper>
            </React.Fragment>
        )
    }
}
export default DisplayCalendar;