import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// AddVote component - represents a single todo item
class AddVote extends Component {

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Meteor.call('votes.insert', text);
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
        <div className="add-vote-wrapper">

          { Meteor.user() ?
              <form className="new-vote" onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    ref="textInput"
                    placeholder="Type to add new tasks"
                />
              </form>
              : ''
          }

        </div>
    );
  }
}

AddVote.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, AddVote);