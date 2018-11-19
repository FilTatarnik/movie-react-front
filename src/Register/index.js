import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Register extends Component {
	constructor(){
	    super();
	    this.state = {
	        username: '',
	        password: ''
	    }
	}
  handleSubmit = async (e) => {
  	e.preventDefault();

  	const registerResponse = await fetch('http://localhost:9292/api/users/register', {
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

	  const parsedResponse = await registerResponse.json();
	  if(parsedResponse.status === 200){
	    // change our component
	    console.log('success login')
	    // this automatically get passed to your component as a prop
	    this.props.history.push('/movies');
	  }
	}
handleChange = (e) => {
  this.setState({
    [e.currentTarget.name]: e.currentTarget.value
  })
}
    render(){
        return(
        	<div>
          <h1>Don't have an account?</h1>
          <h2>Register here</h2>
          <Form onSubmit={this.handleSubmit}>
	        <Label> Username</Label>
	        <Form.Input type='text' name="username" onChange={this.handleChange} />
	        <Label> Password</Label>
	        <Form.Input type='password' name="password" onChange={this.handleChange} />
	        <Button type="Submit" color="green">Register</Button>
	      </Form>
	      </div>
        )
    }
}
export default withRouter(Register);
