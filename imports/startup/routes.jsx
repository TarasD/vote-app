import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

// route components
import App from '../ui/App.jsx';
import AddVote from '../ui/AddVote.jsx';
import VoteList from '../ui/VoteList.jsx';
import VoteView from '../ui/VoteView.jsx';


export const renderRoutes = () => (
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" components={{addVote: AddVote, main: VoteList}} />
        <Route path="/:voteId" components={{addVote: null, main: VoteView}} />
      </Route>
    </Router>
);