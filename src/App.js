import React from "react";
import "./App.css";

import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import Search from "./components/Search";
import Photo from "./components/Photo";

function App() {
  return (
    <div className="container">
      <Search />
      <Nav />

      <div className="photo-container">
        <h2>Results</h2>
        <ul>
          <Photo />
          <NotFound />
        </ul>
      </div>
    </div>
  );
}

export default App;
