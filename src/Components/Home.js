import React from 'react';
import Header from './Header';
import UsersList from './DisplayUsers';

class Home extends React.Component{
    constructor(props){
        super();
    }
    render(){
        return(
            <React.Fragment>
                <Header />
                <UsersList />
            </React.Fragment>
        )
    }
}
export default Home;