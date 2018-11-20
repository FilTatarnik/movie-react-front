import React, { Component } from 'react';
import './App.css';
import MovieContainer from './MovieContainer';
import MovieList from './MovieList';
// import Login from './Login';
// import Register from './Register';
import Header from './Header';
import { Route, Switch } from 'react-router-dom';
import LoginRegister from './LoginRegister'

const My404 = () => {
  return (
    <div>
      You're lost, will you even be found?
    </div>
    )
}

class App extends Component {
  constructor(){
    super();
    this.state = {
        loggedIn: false,
        username: ''
      }
  }

  LogIn = (username) => {
    this.setState({
      loggedIn: true,
      username: username
    })
  }
  Logout = (username) => {
    this.setState({
      loggedIn: false,
      username: username
    })
  }
  render() {
    return (
      <div className="App">
        { this.state.loggedIn ? <MovieContainer Logout={this.Logout}/> : <LoginRegister LogIn={this.LogIn}/> }
      </div>
    );
  }
}

export default App;
