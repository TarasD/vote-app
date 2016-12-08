import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';

// Login component - represents a single todo item
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: true
    }
  }

  showLoginForm() {
    this.setState({showForm: !this.state.showForm});
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.userPassword).value.trim();
    Meteor.loginWithPassword(username, password);
    ReactDOM.findDOMNode(this.refs.username).value = '';
    ReactDOM.findDOMNode(this.refs.userPassword).value = '';
  }

  logout() {
    Meteor.logout();
    this.showLoginForm();
  }

  render() {
    const classes = classnames({
      'login-wrapper': true,
      'hidden': this.state.showForm
    });

    return (
        <div className="login">
          <span className="fa fa-user-circle user-icon" onClick={this.showLoginForm.bind(this)}></span>
          <div className={classes}>
            { !this.props.currentUser ?
                <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                  <input type="text" ref="username" placeholder="username"/>
                  <input type="password" ref="userPassword"/>
                  <button type="submit">Log In</button>
                </form>
                :
                <button className="logout" onClick={this.logout.bind(this)}>Log out</button>
            }
          </div>
        </div>

    );
  }
}

Login.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {

  return {
    currentUser: Meteor.user(),
  };
}, Login);