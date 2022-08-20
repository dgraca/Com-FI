import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Albums component
class Albums extends React.Component {

  render() {    
    return (
      <>
        <Navbar />
        <div>álbuns</div>
        <Footer />
      </>
    );
  }
}

export default Albums;
