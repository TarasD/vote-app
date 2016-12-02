import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Votes = new Mongo.Collection('votes');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('votes', function votesPublication() {
    return Votes.find({});
  });
  Meteor.publish('singleVote', function votePublication(id) {
    return Votes.find({_id: id});
  });
}

Meteor.methods({
  'votes.insert'(title) {
    check(title, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Votes.insert({
      title,
      options: ['Yes', 'No'],
      votes: [0, 0],
      voted: [[], []],
      start: false,
      createdAt: new Date(),
    });
  },

  'votes.remove'(voteId) {
    check(voteId, String);

    Votes.remove(voteId);
  },

  'votes.startVote'(voteId, start) {
    check(voteId, String);
    check(start, Boolean);

    Votes.update(voteId, { $set: {start: start} })
  },

  'votes.makeVote'(voteId, optionName) {
    check(voteId, String);
    check(optionName, String);

    let vote = Votes.findOne(voteId);

    let options = vote.options,
        votes = vote.votes,
        voted = vote.voted,
        clientIP;

    let index = options.indexOf(optionName);

    if (Meteor.isServer) {
      clientIP = this.connection.clientAddress;

      if (index != -1) {
        let alreadyVoted = false;
        let found = [];
        for (let i = 0; i < voted.length; i++) {
          if (voted[i].indexOf(clientIP) != -1) {
            alreadyVoted = true;
            found[0] = i;
            found[1] = voted[i].indexOf(clientIP);
            break;
          }
        }

        if (!alreadyVoted) {
          votes[index]++;
          voted[index].push(clientIP);
        }
        else if (index == found[0]) {
          console.log('already voted here');
        }
        else {
          votes[found[0]]--;
          votes[index]++;
          voted[found[0]].splice(found[1], 1);
          voted[index].push(clientIP);
        }
      }
      else {
        throw new Meteor.Error('no such option to vote');
      }

      Votes.update(voteId, {$set: {options: options, votes: votes, voted: voted}});
    }
  }
});