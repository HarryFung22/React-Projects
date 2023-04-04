import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //allows us to link to different routes

export default class Navbar extends Component {

  render() {
    return (
        //this nav component is from the bootstrap navbar component
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Workout Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}