import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//functional react component (difers from a class component due to the lack of state and lifecyle methods)
//if you only need to accept props and return jsx, use functional react components instead of class components
const Exercise = props => ( //takes in props as parameter
//returns a table row
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td> 
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

//implemented as a class component
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    //for delete method
    this.deleteExercise = this.deleteExercise.bind(this)

    //initializing state to an empty array of exercises
    this.state = {exercises: []};
  }

  //fetching existing exercises from database (lifecycle method)
  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data }) //since we want all the fields from a response, just enter in the selected exercise.data to get all its elements
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //creating an http delete request, takes in an object id and deletes it from the database
  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});
    //after deleting the response from the database, we also need to delete it from the screen
    //we can do this by setting the state of exercises, we filter through the array of exercises (we will only return certain elements back to the array) 
    //(react will automatically update the page with the new state)  
    this.setState({ //id from database is _id, thus we will refer to that
      exercises: this.state.exercises.filter(el => el._id !== id) //we return the elements that don't have the deleted id (returns everything but the element that was just deleted to the array)
    })
  }

  //method/function that returns the rows of the table so that it can be called later in the body of the jsx
  exerciseList() {
    // the .map will return something for every element in the array
    return this.state.exercises.map(currentexercise => { //returns an exercise component (3 props/variables that are passed in)
      //first prop: current exercise, 2nd prop: delete exercise method, 3rd prop: key/id
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() } 
          </tbody>
        </table>
      </div>
    )
  }
}