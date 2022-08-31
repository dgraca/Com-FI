import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ArtistsTable from "../../components/ArtistsTable";
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

/**
 * Component that represents the page to list all artists
 */
class Artists extends React.Component {
  // component's initial state
  state = {
    artists: [],
    loading: true,
    fetchErr: false,
    fetchMsg: "",
  }

  // binds "this" into the deleteArtist function
  deleteArtist = this.deleteArtist.bind(this);

  // when the component is mounted, it calls this method.
  // This method is one of many of the react Lifecycle
  async componentDidMount() {
    await this.getArtists();
  }

  // fetches all artists from API
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

    this.setState({ artists: data, loading: false });
  }

  // requests to the API to delete one artist
  deleteArtist(id) {
    // artist about to be deleted
    const artist = this.state.artists.find(artist => artist.id == id);

    // sweetalert2 to alert user that he is about to delete an artist
    Swal.fire({
      icon: 'warning',
      title: 'Tem a certeza que pretende eliminar este artista?',
      text: `${artist.name} - ${artist.email}`,
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
    });
  }

  // method to render the component
  render() {
    // deconstructs this.state into multiple constant variables
    const { artists, loading, fetchErr, fetchMsg } = this.state;
    
    // navigateState receives "props" from the useLocation() hook,
    // that was passed into the ES6 class from the withHooks() function
    // at the top of the file
    const navigateState = this.props.location.state;

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
            <ArtistsTable artistsDataIN={artists} loading={loading}/>
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
            <ArtistsTable artistsDataIN={artists} loading={loading}/>
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <ArtistsTable artistsDataIN={artists} deleteArtist={this.deleteArtist} loading={loading}/>
          <Footer />
        </>
      );
    }
  }
}

export default withHooks(Artists);
