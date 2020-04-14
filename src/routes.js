import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';
import NotFound from './pages/NotFound';

export default (props) => (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/recipe' exact component={RecipePage} />
        {/* <Route path='/pokemon/:name' exact component={Pokemon} /> */}
        <Route component={NotFound} />
    </Switch>
);