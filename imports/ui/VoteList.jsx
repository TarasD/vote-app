import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import VoteListItem from './VoteListItem.jsx'

import { Votes } from '../api/votes.js';

// VoteList component - represents a single todo item
class VoteList extends Component {

  renderVotes() {
    return this.props.votes.map((vote) => {
      return (
          <VoteListItem
              key={vote._id}
              vote={vote}
              currentUser={this.props.currentUser}
          />
      );
    });
  }

  render() {
    return (
        <div className="vote-list-wrapper">
          {this.renderVotes()}
        </div>
    );
  }
}

VoteList.propTypes = {
  votes: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};

export default createContainer(() => {
  Meteor.subscribe('votes');

  return {
    votes: Votes.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
}, VoteList);