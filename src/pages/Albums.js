import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AlbumsTable from "../components/AlbumsTable";
import Popup from "../components/Popup";

class Musics extends React.Component {
  state = {
    albums: [],
    fetchErr: false,
    fetchMsg: "",
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
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ albums: data });
  }

  render() {
    const { albums, fetchErr, fetchMsg } = this.state;

    // because react JSX only returns one element, we surrounded the code with <> and </>
    // this is the shortest syntax of a React.Fragment
    if (fetchErr) {
      return (
        <>
          <Navbar />
          <div>
            <AlbumsTable albumsDataIN={albums} />
            <Popup className="absolute bottom-0" type="error" msg={fetchMsg} />
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <AlbumsTable albumsDataIN={albums} />
          <Footer />
        </>
      );
    }
  }

}

export default Musics;
