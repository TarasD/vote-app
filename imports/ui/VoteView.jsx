import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Votes } from '../api/votes.js';

import PieChart from './PieChart.jsx';

// VoteView component - represents a single todo item
class VoteView extends Component {

  startVote() {
    Meteor.call('votes.startVote', this.props.vote._id, !this.props.vote.start);
  }

  makeVote(value, event) {
    Meteor.call('votes.makeVote', this.props.vote._id, value);
  }

  renderOptions() {
    return this.props.vote.options.map((option) => {

      return (
          <button className="vote-button" key={option} onClick={this.makeVote.bind(this, option)}>
            {option}
          </button>
      );

    });
  }

  render() {
    if(!(Object.keys(this.props.vote).length === 0 && this.props.vote.constructor === Object)) {
      let allZero = true,
          dataset = [],
          total = 0;
      this.props.vote.votes.forEach((el) => {
        if(el != 0) allZero = false;
        total += el;
      });

      if(allZero) dataset = [1, 1];
      else dataset = this.props.vote.votes;

      // Display start/stop button if user exists
      let startButton;
      if(this.props.currentUser) {
        if(this.props.vote.start) startButton = (<button className="vote-view-start" onClick={this.startVote.bind(this)}>Stop</button>);
        else startButton = (<button className="vote-view-start" onClick={this.startVote.bind(this)}>Start</button>);
      }
      else {
        startButton = ('');
      }

      return (
          <div className="vote-view-wrapper">
            {startButton}
            <h3 className="vote-view-title">{this.props.vote.title}</h3>

            {this.props.vote.start ?
                <div className="vote-buttons-wrapper">
                  {this.renderOptions()}
                </div>
                : ''
            }

            <svg className="vote-view-svg" width="250" height="250">
              <PieChart x={125} y={125} outerRadius={125} innerRadius={40}
                        data={dataset}/>
            </svg>

            <div className="total-votes">
              <p>Total</p>
              <p>{total}</p>
            </div>
            {/*<div className="votes-numbers">*/}
              {/*<span className="yes-votes">{this.props.vote.votes[0]}</span>*/}
              {/*<span className="no-votes">{this.props.vote.votes[1]}</span>*/}
            {/*</div>*/}

          </div>
      );
    }
    else return (null);
  }
}

VoteView.propTypes = {
  vote: PropTypes.object.isRequired,
  currentUser: PropTypes.object
};

export default createContainer(({ params }) => {
  Meteor.subscribe('singleVote', params.voteId);

  return {
    vote: Votes.findOne({_id: params.voteId}) || {},
    currentUser: Meteor.user()
  };
}, VoteView);