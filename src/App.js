import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import Search from "./components/Search";
import PhotoGallery from "./components/PhotoGallery";

function App() {
  return (
    <Router>
      <div className="container">
        <Search />
        <Nav />

        <div className="photo-container">
          <h2>Results</h2>
          <Switch>
            <Route path="/:search" component={PhotoGallery} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
