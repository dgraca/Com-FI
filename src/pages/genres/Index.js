import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GenresTable from "../../components/GenresTable";
import Popup from "../../components/Popup";

// Genres component
class Genres extends React.Component {
  state = {
    genres: [],
    fetchErr: false,
    fetchMsg: "",
  }

  async componentDidMount() {
    await this.getGenres();
  }

  async getGenres() {
    let data = await fetch("api/genresAPI/")
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(`Could not request genres from API. Error ${err}`);
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ genres: data });
  }

  render() {    
    const { genres, fetchErr, fetchMsg } = this.state;

    if (fetchErr) {
      return (
        <>
          <Navbar />
          <div>
            <GenresTable genresDataIN={genres} />
            <Popup className="absolute bottom-0" type="error" msg={fetchMsg} />
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <GenresTable genresDataIN={genres} />
          <Footer />
        </>
      );
    }
  }
}

export default Genres;
