import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div className='Home'>
                <Header pageTitle='Home' />
                <div className='greeting'><h1>{`Hello ${this.props.user.first_name}`} </h1></div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}
export default connect(mapStateToProps)(Home);