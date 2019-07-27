import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Components tied to paths
import Choosy from './Choosy';
import Sample from './SampleRoute';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        { /* Component will be shown when URL is path */}
        { /* Must use exact path or else its kinda like a .includes */}
        <Route exact path='/' component={ Choosy } />
        <Route exact path='/sample' component={ Sample } />
      </BrowserRouter>
    );
  }
}

export default Router;
