import React, {Component}from 'react';
import Header from '../components/Header';

class Home extends Component{
    render(){
        return(
            <div className='Home'> 
                <Header pageTitle='Home'/>
            </div>
        )
    }
}

export default Home;