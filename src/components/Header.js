import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: this.props.pageTitle
        }
    }
    componentDidMount(){
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
            </div>
        )
    }
}

export default Header;