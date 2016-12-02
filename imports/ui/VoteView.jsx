import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Votes } from '../api/votes.js';

import PieChart from './PieChart.jsx';

// VoteView component - represents a single todo item
class VoteView extends Component {

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
      let allZero = true, dataset = [];
      let total = 0;
      this.props.vote.votes.forEach((el) => {
        if(el != 0) allZero = false;
        total += el;
      });

      if(allZero) dataset = [1, 1];
      else dataset = this.props.vote.votes;

      return (
          <div className="vote-view-wrapper">
            <h3 className="vote-view-title">{this.props.vote.title}</h3>

            <p>{this.props.vote.votes}</p>

            <div className="vote-buttons-wrapper">
              {this.renderOptions()}
            </div>

            <svg className="vote-view-svg" width="250" height="250">
              <PieChart x={125} y={125} outerRadius={125} innerRadius={40}
                        data={dataset.reverse()}/>
            </svg>

            <div className="total-votes">
              <p>Total</p>
              <p>{total}</p>
            </div>

          </div>
      );
    }
    else return (null);
  }
}

VoteView.propTypes = {
  vote: PropTypes.object.isRequired,
};

export default createContainer(({ params }) => {
  Meteor.subscribe('singleVote', params.voteId);

  return {
    vote: Votes.findOne({_id: params.voteId}) || {},
  };
}, VoteView);