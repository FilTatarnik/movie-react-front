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
      movieToAdd: [],
      movieToEdit: {
        title: '',
        description: '',
        id: ''
      },
      showEditModal: false
    }
  }
  async getMovies() {
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
    this.getMovies()
    /// Where you call this.getMovies
  }
  addMovie = async (movie, e) => {
    try {
      e.preventDefault();
      const createdMovie = await fetch('http://localhost:9292/api/movies', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const parsedResponse = await createdMovie.json();
      console.log(parsedResponse, ' this is response')
      this.setState({movies: [...this.state.movies, parsedResponse.movie]})

    } catch(err) {
      console.log('error')
      console.log(err)
    }
    
  }
  deleteMovie = async (id) => {

    const response = await fetch('http://localhost:9292/api/movies/' + id, 
    {
      method: "DELETE",
      credentials: 'include'
    })
    // console.log(response, "<<------ this is the movie id i want to delete");
    const parsedDeletedItem = await response.json();
    console.log(parsedDeletedItem, 'This is the deleted parsed item');
    this.getMovies();
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
    e.preventDefault();
    // If you feel up to make the modal (EditMovie Component) and show at the appropiate times
    try {

      const editResponse = await fetch('http://localhost:9292/api/movies/' + this.state.movieToEdit.id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({
          title: this.state.movieToEdit.title,
          description: this.state.movieToEdit.description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const parsed = await editResponse.json();
      if (parsed.status === 200) {
        this.setState({
          showEditModal: false,
          movieToEdit: this.state.movieToEdit
        })
        this.getMovies();
      }
    } catch (err){
      console.log(err)
    }
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
    this.props.Logout(parsedResponse)
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
            <MovieList movieToAdd={this.state.movieToAdd}movies={this.state.movies} deleteMovie={this.deleteMovie} openAndEdit={this.openAndEdit}/>
          </Grid.Column>
          <EditMovie open={this.state.showEditModal} movieToEdit={this.state.movieToEdit} handleEditChange={this.handleEditChange} closeAndEdit={this.closeAndEdit}/>
        </Grid.Row>
      </Grid>
      </div>
    )
  }
}

export default MovieContainer;