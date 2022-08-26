import React from "react";
import { Link } from "react-router-dom";

// there are two ways of rendering components in react
// 1. the simplier way: just a function returning elements (render and all other stuff automatically applied)
// 2. With the ES6 classes. This way allows to override componentDidMount, among other methods
// in this specific case, we only care about returning a simple navbar, so we chose the 1. way
const Navbar = () => {
  return (
    <nav className="flex flex-row items-center justify-between flex-wrap bg-gray-800 p-8 text-gray-100">
      <Link to="/" className="font-bold tracking-wider text-2xl">Com-FI</Link>
      
      <div className="flex flex-row justify-between items-center gap-4 text-lg">
        <Link to="/albums" className="hover:text-gray-400">Álbuns</Link>
        <Link to="/musics" className="hover:text-gray-400">Músicas</Link>
        <Link to="/artists" className="hover:text-gray-400">Artistas</Link>
        <Link to="/genres" className="hover:text-gray-400">Géneros</Link>
      </div>
    </nav>
  );
}

export default Navbar;
