import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import DisplayCalendar from './DisplayCalendar';

var activityPeriodCustom;
class CalendarView extends React.Component{
    constructor(props){

        super();
        this.state = {
            data : props.location.data,
            formatedActivity : "",
            count : 0
        }
        this.formatDateTime();
    }
    componentDidMount(){
        this.setState({
            formatedActivity : activityPeriodCustom,
            count :1
        })
    }
    formatDateTime(){
        var activity = this.state.data;
        activityPeriodCustom = [];
        for(var i=0;i<activity.length;i++){
            var startTimeArr = activity[i].start_time.split(" ");
            var endTimeArr = activity[i].end_time.split(" ");
            var monthNumber = this.getMonth(startTimeArr[0]);
            var dateNumber = this.getDateNumber(startTimeArr[1]);
            var time = this.formatTime(startTimeArr[4]);
            var startTimeStr = startTimeArr[2]+"-"+monthNumber+"-"+dateNumber+"T"+time;
            monthNumber = this.getMonth(endTimeArr[0]);
            dateNumber = this.getDateNumber(endTimeArr[1]);
            var time = this.formatTime(endTimeArr[3]);
            var endTimeStr = endTimeArr[2]+"-"+monthNumber+"-"+dateNumber+"T"+time;
            var activityObj = {
                "startDate" : startTimeStr,
                "endDate" : endTimeStr
            }
            activityPeriodCustom[i]= activityObj;
        }
        if(i==activity.length){
            this.setState({
                count : 1
            })
        }
    }
    testFun(activityPeriodCustom){
        this.setState({ formatedActivity: activityPeriodCustom }); 
    }
    
    getMonth(monthName){
        var months = {
            'Jan' : '01',
            'Feb' : '02',
            'Mar' : '03',
            'Apr' : '04',
            'May' : '05',
            'Jun' : '06',
            'Jul' : '07',
            'Aug' : '08',
            'Sep' : '09',
            'Oct' : '10',
            'Nov' : '11',
            'Dec' : '12'
        }
        return (months[monthName]);
    }
    getDateNumber(dateNumber){
        var orignalDate = parseInt(dateNumber);
        if(orignalDate<=9){
            return ("0"+dateNumber);
        }
        else{
            return dateNumber;
        }
    }
    formatTime(time){
        if(time.length==6){
            time = "0"+time;
        }
        var res = time.substring(5, 7);
        if(res=="PM"){
            var hr = parseInt(time.substring(0,2));
            hr = hr+12;
            hr = hr.toString();
            var formatedTime = hr+time.substring(2,5);
            return formatedTime;
        }
        if(res=="AM"){
            return time.substring(0,5);
        }
    }
    render(){
        const d = this.state.formatedActivity;
        return(
            <React.Fragment>
                <Header />
                <div className={"container-fluid"}>
                    <Link to={"/"} className={"custom-font"}>Home</Link>
                    <DisplayCalendar data={this.state.formatedActivity}/>
                </div>
            </React.Fragment>
        )
    }
}
export default CalendarView;