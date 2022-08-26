import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MusicsTable from "../../components/MusicsTable";
import Popup from "../../components/Popup";

class MusicsIndex extends React.Component {
  state = {
    musics: [],
    fetchErr: false,
    fetchMsg: "",
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
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ musics: data });
  }

  render() {
    const { musics, fetchErr, fetchMsg } = this.state;

    // because react JSX only returns one element, we surrounded the code with <> and </>
    // this is the shortest syntax of a React.Fragment
    if (fetchErr) {
      return (
        <>
          <Navbar />
          <div>
            <MusicsTable musicsDataIN={musics} />
            <Popup className="absolute bottom-0" type="error" msg={fetchMsg} />
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <MusicsTable musicsDataIN={musics} />
          <Footer />
        </>
      );
    }
  }

}

export default MusicsIndex;
