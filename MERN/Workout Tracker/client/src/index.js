import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from './components/navbar';

import ExercisesList from './components/exercises-list';
import EditExercise from './components/edit-exercises';
import CreateExercise from './components/create-exercise';
import CreateUser from './components/create-user';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <div className='container'>
      <Navbar/>
      <br/>
      {/*exact indicates that this is the first page that should be displayed*/}
      <Routes>
        <Route path = "/" exact element={<ExercisesList/>}/>
        <Route path = "/edit/:id" element={<EditExercise/>}/>
        <Route path = "/create" element={<CreateExercise/>}/>
        <Route path = "/user" element={<CreateUser/>}/>
      </Routes>
    </div>
  </Router>
);

