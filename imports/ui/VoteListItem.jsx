import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';


// VoteListItem component - represents a single todo item
export default class VoteListItem extends Component {
  deleteThisVote(event) {
    event.preventDefault();
    Meteor.call('votes.remove', this.props.vote._id);
  }

  startVote(event) {
    event.preventDefault();
    Meteor.call('votes.startVote', this.props.vote._id, !this.props.vote.start);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS

    let startButton, deleteButton;
    if(this.props.currentUser) {
      deleteButton = (
          <button className="delete" onClick={this.deleteThisVote.bind(this)}>
            &times;
          </button>
      );

      if (this.props.vote.start) {
        startButton = (
            <button className="start-vote" onClick={this.startVote.bind(this)}>Stop</button>
        );
      }
      else {
        startButton = (
            <button className="start-vote" onClick={this.startVote.bind(this)}>Start</button>
        );
      }
    }
    else {
      startButton = '';
      deleteButton = ''
    }

    return (
        <div className="vote-list-item">
          <Link className="vote-item-link" to={this.props.vote._id}>
            <span className="text">{this.props.vote.title}</span>

            <div className="vote-item-subwrapper">
              { startButton }
              <span className="created-at">{moment(this.props.vote.createdAt).format('DD/MM, HH:mm')}</span>
              { deleteButton }
            </div>
          </Link>
        </div>
    );
  }
}

VoteListItem.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  vote: PropTypes.object.isRequired,
  currentUser: PropTypes.object
};