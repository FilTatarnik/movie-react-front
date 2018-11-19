import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import Register from '../Register'
import { withRouter } from 'react-router-dom';
import './style.css';

class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();

    const loginResponse = await fetch('http://localhost:9292/api/users/login', {
      method: 'POST',
      credentials: 'include', // this sends our session cookie with our request
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse = await loginResponse.json();
    console.log(parsedResponse)
    if(parsedResponse.status === 200){
      // change our component
      console.log('succes login')
      console.log(this.props.history)
      // this automatically get passed to your component as a prop
      this.props.history.push('/movies');
    }
  }
  render(){
    return (
      <div>
      <Register username={this.state.username} password={this.state.password}/>
      <br />
      <br />
      <br />
      <h1>Have an account?</h1>
      <h2>Login here</h2>
      <Form onSubmit={this.handleSubmit}>
        <Label> Username</Label>
        <Form.Input type='text' name="username" onChange={this.handleChange} />
        <Label> Password</Label>
        <Form.Input type='password' name="password" onChange={this.handleChange} />
        <Button type="Submit" color="green">Login</Button>
      </Form>
      </div>
      )
  }
}

export default withRouter(Login);
