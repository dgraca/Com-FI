import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AlbumsTable from "../components/AlbumsTable";

class Musics extends React.Component {
  state = {
    albums: [],
  }

  componentDidMount() {
    this.getAlbums();
  }

  async getAlbums() {
    let data = await fetch("api/albumsAPI/")
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(`Could not request musics from API. Error ${err}`);
      });

    this.setState({ albums: data });
  }

  render() {
    const { albums } = this.state;

    // because react JSX only returns one element, we surrounded the code with <> and </>
    // this is the shortest syntax of a React.Fragment
    return (
      <>
        <Navbar />
          <AlbumsTable albumsDataIN={albums}/>
        <Footer />
      </>
    );
  }

}

export default Musics;
