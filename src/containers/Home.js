import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import axios from 'axios';
import {getTeacherClasses} from '../ducks/reducers/users'

class Home extends Component {
    componentDidMount() {
        // Get all info on teacher sets it on redux store
        let id = this.props.user.id
        this.props.getTeacherClasses(id)
    }

    handleOnClick(){
        console.log('this is current state: ', this.props)
        
    }
    render() {
        return (
            <div className='Home'>
                <Header pageTitle='Home' />
                <div className='greeting'><h1>{`Hello ${this.props.user.first_name}`} </h1></div>
                <button onClick={()=>this.handleOnClick()}>State</button>
            </div>
        )
    }
}

const outputActions={
    getTeacherClasses: getTeacherClasses
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps, outputActions)(Home);