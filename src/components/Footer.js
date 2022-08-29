import React from "react";

// there are two ways of rendering components in react
// 1. the simplier way: just a function returning elements (render and all other stuff automatically applied)
// 2. With the ES6 classes. This way allows to override componentDidMount, among other methods
// in this specific case, we only care about returning a simple navbar, so we chose the 1. way
const Footer = () => {
  return (
    /*
      component by MerakiUI (https://merakiui.com)
      MerakiUI offers Tailwind CSS components with an MIT license
      *adjusted to fit our needs
    */
      <footer className="bg-gray-800 bottom-0">
        <div className="container px-2 py-4 mx-auto">
          <h2 className="text-xl font-bold text-white text-center">Stack usada</h2>
          <div className="mt-4 flex flex-row items-center justify-center text-center gap-8">
            <p><a href="https://reactjs.org" target="_blank" className="max-w-md mx-auto mt-2 text-gray-400 hover:text-gray-200">React</a></p>
            <p><a href="https://reactrouter.com/" target="_blank" className="max-w-md mx-auto mt-2 text-gray-400 hover:text-gray-200">React router</a></p>
            <p><a href="https://tailwindcss.com/" target="_blank" className="max-w-md mx-auto mt-2 text-gray-400 hover:text-gray-200">TailwindCSS</a></p>
            <p><a href="https://merakiui.com/" target="_blank" className="max-w-md mx-auto mt-2 text-gray-400 hover:text-gray-200">MerakiUI</a></p>
            <p><a href="https://sweetalert2.github.io/" target="_blank" className="max-w-md mx-auto mt-2 text-gray-400 hover:text-gray-200">Sweetalert2</a></p>
          </div>
        </div>
      </footer>
    // end of component
  );
}

export default Footer;
