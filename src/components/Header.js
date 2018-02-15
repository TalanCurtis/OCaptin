import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../ducks/reducers/users';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: this.props.pageTitle
        }
    }

    componentDidMount() {
        this.props.getUser();
    }
    
    render() {
        return (
            <div className='Header'>
                <div>
                    <NavLink to='/' exact activeClassName="selected" >Auth</NavLink>
                    <NavLink to='/Home' exact activeClassName="selected" >Home</NavLink>
                    <NavLink to='/Classes' exact activeClassName="selected" >Classes</NavLink>
                    <NavLink to='/Class' exact activeClassName="selected" >Class</NavLink>
                    <NavLink to='/Class/Student' exact activeClassName="selected" >Class/Student</NavLink>
                </div>
                <div>
                    <h1>{this.state.pageTitle}</h1>
                </div>
                <a href="http://localhost:3007/logout">
                    <button>Logout</button>
                </a>
            </div>
        )
    }
}

const outputActions = {
    getUser: getUser
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, outputActions)(Header);