import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default class CreateExercise extends Component {
    //in javascript classes, you call super when defining the constructor of a subclass
    constructor(props){
        super(props);

        //binding the correct updated state to the associated function (this)
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //setting initial state (state is how you create variables in react)
        this.state = {
            //creating propreties of the states that correspond with the fields of the mongodb document
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [] //user array is for the dropdown menu to select the users that are already in the database
        }
    }

    //default react life cycle method (this is called before anything is loaded on the page)
    //creating a default user
    componentDidMount(){
        //sending http get request to server to fetch responses from database
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if(response.data.length > 0){ //checking if there is at least one exercise in the database
                this.setState({
                    //only need the username field, thus we specify which field to return so that we don't get back all the data
                    users: response.data.map (user => user.username), //date is an array, and we are going to map through that array (this allows us to return something for every element in the array)
                    username: response.data[0].username //setting the first element of the database/array as the username
                })
            }
        })
    }

    //when someone enters their username, it calls this function to update the current state of the username
    onChangeUsername(e){
        this.setState({
            //this doesn't replace/empty the other elements in the state
            //this will just update the corresponding element (in this case, username)
            username: e.target.value //target represents the textbox where the user will enter the new username
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }

    //importing calendar to enter date
    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    //method to handle form submit
    onSubmit(e){
        e.preventDefault(); //prevents default HTML form submit behaviour from taking place (overwrites normal submit function)
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise)
        .then(res => console.log(res.date)); //gets the data from the newly updated state for exercise

        window.location = '/'; //brings person back to the homepage
    }

    render(){
        return(
            <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {/*inside the select box, we are map through the users array to get the values*/}
                    {
                      this.state.users.map(function(user) { //for each user in the array, it will return an option of a select box (key = user, value = user)
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="pt-4"> 
                <TextField variant="outlined" label="Description" 
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
                
              </div>
              <div className="pt-4">
                <TextField variant="outlined" label="Duration (in minutes)" 
                type="text" 
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
      
              <div className="pt-4">
                <Button variant="contained" type="submit">
                    Create Exercise Log
                </Button>
                
              </div>
            </form>
          </div>
        )
    }
}