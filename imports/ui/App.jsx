import React, { Component } from 'react';
import { Link } from 'react-router';

import Login from './Login.jsx';


// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { addVote, main } = this.props;
    return (
        <div className="container">
          <header>
            <h1>Votes App</h1>
            <Link className="app-link" to="/">Home</Link>

            <Login />

            {addVote}
          </header>

          {main}
        </div>
    );
  }
}