import './App.css';
import {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  //creating states to hold information that the user typed/wants to insert into the database
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  //first thing inside the useEffect function will be the first thing that runs when the program is started
  useEffect(() => { //fetching an API request to the server to get the data
    //catching the data from the res.json from the backend
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      //accessing the data
      setListOfUsers(response.data)
    })
  }, []);

  //create a function that will be called when the button is clicked (send the data to the database)
  const createUser = () => {
    //passing in an object that will represent the object passed in from the body (from the backend)
    //since the name of the key and state are the same, you can just pass write the name once
    Axios.post("http://localhost:3001/createUser", {name, age, username}).then((response) => {
      //updates the list after the new user is created, passes in the name, age, username that was just inputed into the array of users
      setListOfUsers([...listOfUsers, {name, age, username}])
    })
  }

  return (
    <div className="App">
      <div className='usersDisplay'>
        {listOfUsers.map((user) => {
          return(
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
              <button>Delete</button>
            </div>
          )
        })}
      </div>

      <div>
        <input type='text' placeHolder='Name' onChange={(event) => {
          setName(event.target.value);
        }}/> 
        <input type='number' placeHolder='Age' onChange={(event) => {
          setAge(event.target.value);
        }}/>
        <input type='text' placeHolder='Username' onChange={(event) => {
          setUsername(event.target.value);
        }}/>
        <button onClick={createUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;
