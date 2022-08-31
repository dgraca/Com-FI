import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AlbumsTable from "../../components/AlbumsTable";
import Popup from "../../components/Popup";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

// this is a work-around to use react hooks in ES6 classes
// Hooks cannot be used inside ES6 classes, and we need them
// because of the react-router-dom way of passing props
// this function returns a component with all it's props plus the params (props)
// passed by the react-router-dom components (Link, Router, etc)
// for more info: https://reactjs.org/docs/higher-order-components.html
const withHooks = (Component) => {
  return props => <Component {...props} location={useLocation()} />;
}


class AlbumsIndex extends React.Component {
  state = {
    albums: [],
    loading: true,
    fetchErr: false,
    fetchMsg: "",
  }

  // binds "this" into the deleteAlbum function
  deleteAlbum = this.deleteAlbum.bind(this);

  async componentDidMount() {
    await this.getAlbums();
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

    this.setState({ albums: data, loading: false });
  }

  deleteAlbum(id) {
    // album about to be deleted
    const album = this.state.albums.find(album => album.id == id);

    // sweetalert2 to alert user that he is about to delete an album
    Swal.fire({
      icon: 'warning',
      title: 'Tem a certeza que pretende eliminar este álbum?',
      text: `${album.title} - ${album.releaseYear}`,
      footer: "ATENÇÃO: Esta ação é irreversível",
      showCancelButton: true,
      cancelButtonColor: "#9ca3af", // gray-400 from tailwindcss
      confirmButtonColor: "#ef4444", // red-500 from tailwindcss
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async res => {
      // user confirmed action
      if (res.isConfirmed) {
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
    });
  }

  render() {
    const { albums, loading, fetchErr, fetchMsg } = this.state;
    const navigateState = this.props.location.state;

    // because react JSX only returns one element, we surrounded the code with <> and </>
    // this is the shortest syntax of a React.Fragment
    if (fetchErr) {
      return (
        <>
          <Navbar />
          <div>
            <AlbumsTable albumsDataIN={albums} deleteAlbum={this.deleteAlbum} loading={loading}/>
            <Popup type="error" msg={fetchMsg} />
          </div>
          <Footer />
        </>
      );
    } if(navigateState != null && navigateState.success) {
      return (
        <>
          <Navbar />
          <div>
            <div className="mt-8">
              <Popup type="success" msg={navigateState.msg} />
            </div>
            <AlbumsTable albumsDataIN={albums} deleteAlbum={this.deleteAlbum} loading={loading}/>
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <AlbumsTable albumsDataIN={albums} deleteAlbum={this.deleteAlbum} loading={loading}/>
          <Footer />
        </>
      );
    }
  }

}

export default withHooks(AlbumsIndex);
