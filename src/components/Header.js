import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {testAction} from '../ducks/reducers/test';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: this.props.pageTitle
        }
    }
    componentDidMount(){
        // check here to see if user has a session
    }
    handleLogout(){
        console.log('logout')
    }
    render() {
        return (
            <div className='Header'>
                <div>
                    <NavLink to='/' exact activeClassName="selected" >Auth</NavLink>
                    <NavLink to='/Home' exact activeClassName="selected" >Home</NavLink>
                    <NavLink to='/Classes'exact activeClassName="selected" >Classes</NavLink>
                    <NavLink to='/Class' exact activeClassName="selected" >Class</NavLink>
                    <NavLink to='/Class/Student' exact activeClassName="selected" >Class/Student</NavLink>
                </div>
                <div>
                    <h1>{this.state.pageTitle}</h1>
                </div>
                <div>
                    <button onClick={this.props.testAction}>test store</button>
                    {JSON.stringify(this.props)}
                    {JSON.stringify(this.props.testState)}
                </div>
                <button onClick={()=>this.handleLogout()}>Logout</button>
            </div>
        )
    }
}
const outputActions = {
    testAction: testAction
}

function mapStateToProps(state){
    const{testState} = state
    return {
        testState
    }
}

export default connect(mapStateToProps, outputActions)(Header);