import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Component that represents the home page
 */
class Home extends React.Component {
  
  // method to render the component
  render() {
    return (
      <>
        <Navbar />
        <div className="w-full flex flex-col items-center py-8">
          {/*           
            component by MerakiUI (https://merakiui.com)
            MerakiUI offers Tailwind CSS components with an MIT license
            *adjusted to fit our needs
          */}
          <h1 className="font-bold tracking-wider text-2xl">Desenvolvedores</h1>
          <div className="flex flex-row items-center justify-between mt-12 gap-24">
            <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
                <img className="object-cover w-full h-56" src="./daniel.jpg" alt="Fotografia do desenvolvedor: Daniel Graça" />
                <div className="py-5 text-center">
                    <p className="block text-2xl font-bold text-gray-800 ">Daniel Graça</p>
                    <span className="text-sm text-gray-700">Aluno n.º 20948</span>
                </div>
            </div>
            <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
                <img className="object-cover w-full h-56" src="./rodrigo.jpg" alt="Fotografia do desenvolvedor: Rodrigo Mendes" />
                <div className="py-5 text-center">
                    <p className="block text-2xl font-bold text-gray-800 ">Rodrigo Mendes</p>
                    <span className="text-sm text-gray-700">Aluno n.º 20946</span>
                </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <h2 className="font-bold tracking-tight text-lg">Licenciatura em Engenharia Informática</h2>
            <h3 className="tracking-normal text">Desenvolvimento Web</h3>
            <p>2021/2022</p>
          </div>
          {/* end of component */}
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;
