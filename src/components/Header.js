import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { getUser } from '../ducks/reducers/users';

=======
import {testAction} from '../ducks/reducers/test';
>>>>>>> 888188e2cac2819545d5afd70db5cafbf7cdf340

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: this.props.pageTitle
        }
    }
    componentDidMount(){
<<<<<<< HEAD
        this.props.getUser();
        console.log(this.props)        
=======
        // check here to see if user has a session
    }
    handleLogout(){
        console.log('logout')
>>>>>>> 888188e2cac2819545d5afd70db5cafbf7cdf340
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
                {JSON.stringify(this.props)}
                <div>
                    <h1>{this.state.pageTitle}</h1>
                </div>
<<<<<<< HEAD
                <a href="http://localhost:3007/logout">
                    <button>Logout</button>
                </a>
=======
                <div>
                    <button onClick={this.props.testAction}>test store</button>
                    {JSON.stringify(this.props)}
                    {JSON.stringify(this.props.testState)}
                </div>
                <button onClick={()=>this.handleLogout()}>Logout</button>
>>>>>>> 888188e2cac2819545d5afd70db5cafbf7cdf340
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

<<<<<<< HEAD
const outputActions= {
    getUser: getUser
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

=======
>>>>>>> 888188e2cac2819545d5afd70db5cafbf7cdf340
export default connect(mapStateToProps, outputActions)(Header);