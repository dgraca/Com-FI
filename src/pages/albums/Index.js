import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AlbumsTable from "../../components/AlbumsTable";
import Popup from "../../components/Popup";

class AlbumsIndex extends React.Component {
  state = {
    albums: [],
    fetchErr: false,
    fetchMsg: "",
  }

  // binds "this" into the deleteAlbum function
  deleteAlbum = this.deleteAlbum.bind(this);

  componentDidMount() {
    this.getAlbums();
  }

  async getAlbums() {
    let data = await fetch("api/albumsAPI/")
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(`Could not request albums from API. Error ${err}`);
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ albums: data });
  }

  async deleteAlbum(id) {
    let formData = new FormData();
    formData.append("id", id);
    await fetch(`api/albumsApi/${id}`, {
      method: "delete", 
      body: formData,     
    }).then(async res => {
      if(res.ok) {
        await this.getAlbums();
        return;
      };
      throw res.text();
    }).catch(async err => {
      this.setState({ fetchErr: true, fetchMsg: await err });
    });
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
            <AlbumsTable albumsDataIN={albums} deleteAlbum={this.deleteAlbum} />
            <Popup className="absolute bottom-0" type="error" msg={fetchMsg} />
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <AlbumsTable albumsDataIN={albums} deleteAlbum={this.deleteAlbum} />
          <Footer />
        </>
      );
    }
  }

}

export default AlbumsIndex;
