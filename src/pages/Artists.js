import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArtistsTable from "../components/ArtistsTable";

// Artists component
class Artists extends React.Component {

  state = {
    artists: []
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
      });

    this.setState({ artists: data });
  }

  render() {    
    const { artists } = this.state;

    return (
      <>
        <Navbar />
        <ArtistsTable artistsDataIN={artists} />
        <Footer />
      </>
    );
  }
}

export default Artists;
