import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ArtistsTable from "../../components/ArtistsTable";
import Popup from "../../components/Popup";

// Artists component
class Artists extends React.Component {

  state = {
    artists: [],
    fetchErr: false,
    fetchMsg: "",
  }

  // binds "this" into the deleteArtist function
  deleteArtist = this.deleteArtist.bind(this);

  componentDidMount() {
    this.getArtists();
  }

  async getArtists() {
    let data = await fetch("api/artistsAPI/")
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(`Could not request artists from API. Error ${err}`);
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ artists: data });
  }

  async deleteArtist(id) {
    let formData = new FormData();
    formData.append("id", id);
    await fetch(`api/artistsAPI/${id}`, {
      method: "delete", 
      body: formData,     
    }).then(async res => {
      if(res.ok) {
        await this.getArtists();
        return;
      };
      throw res.text();
    }).catch(async err => {
      this.setState({ fetchErr: true, fetchMsg: await err });
    });
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
          <ArtistsTable artistsDataIN={artists} deleteArtist={this.deleteArtist} />
          <Footer />
        </>
      );
    }
  }
}

export default Artists;
