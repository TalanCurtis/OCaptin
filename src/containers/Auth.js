import React, { Component } from 'react';
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
        console.log('handleLogin')
        let body = this.state;
        axios.post('/api/login', body).then(res=>{
            console.log(res)
            this.setState({error:false})
            this.props.history.push('/Home')
        }).catch(err=>{
            console.log(err)
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
            </div>
        )
    }
}

export default Auth;