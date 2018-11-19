import React, { Component } from 'react';
import CreateMovie from '../CreateMovie';
import MovieList from '../MovieList';
import EditMovie from '../EditMovie';
import { Grid , Form, Button} from 'semantic-ui-react';

class MovieContainer extends Component {
  constructor(){
    super();

    this.state = {
      movies: [],
      movieToAdd: '',
      movieToEdit: {
        title: '',
        description: '',
        _id: ''
      },
      showEditModal: false
    }
  }
  getMovies = async () => {
    const response = await fetch('http://localhost:9292/api/movies', {
      credentials: 'include'
    })
    const parsed = await response.json();
    this.setState({
      movies: parsed.movies
    })

  }
  componentDidMount(){
    // get ALl the movies, on the intial load of the APP

    /// Where you call this.getMovies
  }
  addMovie = async (movie, e) => {
    const response = await fetch('http://localhost:9292/api/movies', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        movies: this.state.movies
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsed = await response.json();
    if (parsed.status === 200) {
      this.setState({
        movieToAdd: ''
      })
      this.getMovies();
    }
  }
  deleteMovie = async (id) => {



      // Then make the delete request, then remove the movie from the state array using filter
  }
  handleEditChange = (e) => {

    this.setState({
      movieToEdit: {
        ...this.state.movieToEdit,
        [e.currentTarget.name]: e.currentTarget.value
      }
    });


    // movieToEdit: {
    //   _id: this.state.movieToEdit._id,
    //   title: this.state.movieToEdit.title,
    //   description: this.state.movieToEdit.description
    // }
  }
  closeAndEdit = async (e) => {
    // Put request,

    // If you feel up to make the modal (EditMovie Component) and show at the appropiate times

  }
  openAndEdit = (movieFromTheList) => {
    console.log(movieFromTheList, ' movieToEdit  ');


    this.setState({
      showEditModal: true,
      movieToEdit: {
        ...movieFromTheList
      }
    })

    // movieToEdit = {
    //   title: movieFromTheList.title,
    //   description: movieFromTheList.description
    // }
  }
  handleLogout = async (e) => {
  e.preventDefault()

  const logoutResponse = await fetch('http://localhost:9292/api/users/logout', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const parsedResponse = await logoutResponse.json()

  if (parsedResponse.status === 200) {
    console.log(parsedResponse.status, 'successfully logged out')
    this.props.history.push('/login')
  }
}
  render(){
    console.log(this.state)
    return (
      <div>
      <Form onSubmit={this.handleLogout}>
        <Button color="red"type="submit">Logout</Button>
      </Form>
      <Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
        <Grid.Row>
          <Grid.Column>
            <CreateMovie addMovie={this.addMovie}/>
          </Grid.Column>

          <Grid.Column>
            <MovieList movies={this.state.movies} deleteMovie={this.deleteMovie} openAndEdit={this.openAndEdit}/>
          </Grid.Column>
          <EditMovie open={this.state.showEditModal} movieToEdit={this.state.movieToEdit} handleEditChange={this.handleEditChange} closeAndEdit={this.closeAndEdit}/>
        </Grid.Row>
      </Grid>
      </div>
      )
  }
}

export default MovieContainer;
