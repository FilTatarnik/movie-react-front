import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';

class Register extends Component {
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
export default Register;
