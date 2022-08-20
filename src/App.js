import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import Musics from "./pages/Musics";
import Artists from "./pages/Artists";
import Genres from "./pages/Genres";

// App's main react component
class App extends React.Component {

  render() {
    return (
      <div className="font-Sora bg-gray-100 min-h-screen flex flex-col justify-between">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/musics" element={<Musics />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/genres" element={<Genres />} />
        </Routes>
      </div>
    );
  }
}

export default App;
