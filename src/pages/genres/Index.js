import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GenresTable from "../../components/GenresTable";
import Popup from "../../components/Popup";

/**
 * Component that represents the page to list all genres
 */
class Genres extends React.Component {
  // component's initial state
  state = {
    genres: [],
    loading: true,
    fetchErr: false,
    fetchMsg: "",
  }

  // when the component is mounted, it calls this method.
  // This method is one of many of the react Lifecycle
  async componentDidMount() {
    await this.getGenres();
  }

  // fetches all genres from API
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

    this.setState({ genres: data, loading: false });
  }

  // method to render the component
  render() {
    // deconstructs this.state into multiple constant variables
    const { genres, loading, fetchErr, fetchMsg } = this.state;

    // conditional rendering. This means we can render different components/structure
    // depending on the situation.
    // there's one component that is written like so: <></>.
    // because react JSX only returns one element, we surrounded the code with <> and </>
    // this is the shortest syntax of a React.Fragment
    if (fetchErr) {
      return (
        <>
          <Navbar />
          <div>
            <GenresTable genresDataIN={genres} loading={loading}/>
            <Popup className="absolute bottom-0" type="error" msg={fetchMsg} />
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <GenresTable genresDataIN={genres} loading={loading}/>
          <Footer />
        </>
      );
    }
  }
}

export default Genres;
