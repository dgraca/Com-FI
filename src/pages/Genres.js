import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GenresTable from "../components/GenresTable";

// Genres component
class Genres extends React.Component {
  state = {
    genres: []
  }

  componentDidMount() {
    this.getGenres();
  }

  async getGenres() {
    let data = await fetch("api/genresAPI/")
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(`Could not request musics from API. Error ${err}`);
      });

    this.setState({ genres: data });
  }

  render() {    
    const { genres } = this.state;

    return (
      <>
        <Navbar />
        <GenresTable genresDataIN={genres} />
        <Footer />
      </>
    );
  }
}

export default Genres;
