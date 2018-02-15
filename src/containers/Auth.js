import React, { Component } from 'react';
<<<<<<< HEAD

class Auth extends Component {
    render() {
        return (
            <div className='Auth'>
                <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a>
=======
import axios from 'axios';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: false
        }
    }
    handleOnChange(title, value) {
        this.setState({
            [title]: value
        })
    }

    handleLogin() {
        let body = this.state;
        axios.post('/api/login', body).then(res=>{
            this.setState({error:false})
            this.props.history.push('/Home')
        }).catch(err=>{
            this.setState({error:true})
        })

    }
    handleRegister() {
        console.log('handleRegister')
    }
    render() {
        return (
            <div className='Auth'>
                <div>
                    {this.state.error?<h2 style={{color:'red'}}>User name or password is incorrect.</h2>:null}
                </div>
                <div>
                    <h2>User Name</h2>
                    <input
                        title='username'
                        onChange={(e) => this.handleOnChange(e.target.title, e.target.value)}
                        placeholder='User Name'
                        type='text' />
                </div>
                <div>
                    <h2>Password</h2>
                    <input
                        title='password'
                        onChange={(e) => this.handleOnChange(e.target.title, e.target.value)}
                        placeholder='Password'
                        type='password' />
                </div>
                <div>
                    <button onClick={() => this.handleLogin()}>Login</button>
                    <button onClick={() => this.handleRegister()}>Register</button>
                </div>
>>>>>>> 888188e2cac2819545d5afd70db5cafbf7cdf340
            </div>
        )
    }
}

export default Auth;