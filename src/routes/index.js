import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const AppRouter = () => (
  <Router basename={process.env.BASE_URL}>
    <Route path="/" exact />
  </Router>
);

export default AppRouter;
