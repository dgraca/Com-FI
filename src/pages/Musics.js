import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MusicsTable from "../components/MusicsTable";

class Musics extends React.Component {
  state = {
    musics: [],
  }

  componentDidMount() {
    this.getMusics();
  }

  async getMusics() {
    let data = await fetch("api/musicsAPI/")
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(`Could not request musics from API. Error ${err}`);
      });

    this.setState({ musics: data });
  }

  render() {
    const { musics } = this.state;

    // because react JSX only returns one element, we surrounded the code with <> and </>
    // this is the shortest syntax of a React.Fragment
    return (
      <>
        <Navbar />
          <MusicsTable musicsDataIN={musics}/>
        <Footer />
      </>
    );
  }

}

export default Musics;
