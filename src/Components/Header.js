import React from 'react';
import logo from '../resources/logo.png'
class Header extends React.Component{
    constructor(props){
        super();
        this.state ={
        }
    }
    render(){
        return(
            <React.Fragment>
                <div className={"shadow p-3 mb-5 bg-white rounded"}>
                    <img src={logo}></img>
                </div>
            </React.Fragment>
        )
    }
}
export default Header;