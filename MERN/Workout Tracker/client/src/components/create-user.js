import React, { Component } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    //connecting frontend to backend using axios library
    //frontend will send http requests to the backend
    //sending user data to backend after clicking on the submit button
    axios.post('http://localhost:5000/users/add', user) //passing a json object to endpoint in the second argument
    //promise(after it is posted, we will log to console with the user's inputted data)
      .then(res => console.log(res.data));

    //keep user on current page, allowing them to enter multiple usernames
    //resets the username to blank so that they can add another username
    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
              <TextField variant="outlined" label="Username" 
                required
                type="text" 
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
          </div>
          <div className="pt-4">
            <Button variant="contained" type="submit">
                Create User
            </Button>
          </div>
        </form>
      </div>
    )
  }
}