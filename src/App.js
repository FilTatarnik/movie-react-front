import React, { Component } from 'react';
import './App.css';
import MovieContainer from './MovieContainer';
import MovieList from './MovieList';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import { Route, Switch } from 'react-router-dom';

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
  Login = (username) => {
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
        <Header />
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/movies" component={MovieContainer}/>
          <Route component={My404}/>
        </Switch>
      </div>
    );
  }
}

export default App;
