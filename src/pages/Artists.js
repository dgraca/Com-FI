import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArtistsTable from "../components/ArtistsTable";
import Popup from "../components/Popup";

// Artists component
class Artists extends React.Component {

  state = {
    artists: [],
    fetchErr: false,
    fetchMsg: "",
  }

  componentDidMount() {
    this.getArtists();
  }

  async getArtists() {
    let data = await fetch("api/artistsAPI/")
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(`Could not request musics from API. Error ${err}`);
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ artists: data });
  }

  render() {    
    const { artists, fetchErr, fetchMsg } = this.state;

    if (fetchErr) {
      return (
        <>
          <Navbar />
          <div>
            <ArtistsTable artistsDataIN={artists} />
            <Popup className="absolute bottom-0" type="error" msg={fetchMsg} />
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <ArtistsTable artistsDataIN={artists} />
          <Footer />
        </>
      );
    }
  }
}

export default Artists;
