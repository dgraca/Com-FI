import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumsIndex from "./pages/albums/Index";
import MusicsIndex from "./pages/musics/Index";
import MusicsCreate from "./pages/musics/Create";
import ArtistsIndex from "./pages/artists/Index";
import ArtistsCreate from "./pages/artists/Create";
import GenresIndex from "./pages/genres/Index";

// App's main react component
class App extends React.Component {

  render() {
    return (
      <div className="font-Sora bg-gray-100 min-h-screen flex flex-col justify-between">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* albums */}
          <Route path="/albums" element={<AlbumsIndex />} />
          {/* musics */}
          <Route path="/musics" element={<MusicsIndex />} />
          <Route path="/musics/create" element={<MusicsCreate />} />
          {/* artists */}
          <Route path="/artists" element={<ArtistsIndex />} />
          <Route path="/artists/create" element={<ArtistsCreate />} />
          {/* genres */}
          <Route path="/genres" element={<GenresIndex />} />
        </Routes>
      </div>
    );
  }
}

export default App;
