import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import PhotoGallery from "./components/PhotoGallery";
import Search from "./components/Search";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="container">
        <Search />
        <Nav />

        <div className="photo-container">
          <h2>Results</h2>
          <Switch>
            <Route exact path="/:search?" component={PhotoGallery} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
