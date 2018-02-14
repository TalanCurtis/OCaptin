import React, {Component}from 'react';
import Header from '../components/Header';

class ClassStudent extends Component{
    render(){
        return(
            <div className='ClassStudent'> 
                ClassStudent Container
                <Header pageTitle='Class'/>
            </div>
        )
    }
}

export default ClassStudent;