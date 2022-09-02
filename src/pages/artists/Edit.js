import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Popup from "../../components/Popup";
import { useParams, useNavigate } from "react-router-dom";

// this is a work-around to use react hooks in ES6 classes
// Hooks cannot be used inside ES6 classes, and we need them
// because of the react-router-dom way of passing props
// this function returns a component with all it's props plus the params (props)
// passed by the react-router-dom components (Link, Router, etc)
// for more info: https://reactjs.org/docs/higher-order-components.html
const withHooks = (Component) => {
  return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
}

/**
 * Component that represents the page to edit one album
 */
class ArtistsEdit extends React.Component {
  // component's initial state
  state = {
    artist: {
      "name": "",
      "email": "",
      "userId": "",
    },
    fetchErr: false,
    fetchMsg: "",
  }

  // when the component is mounted, it calls this method.
  // This method is one of many of the react Lifecycle
  async componentDidMount() {
    // gets id passed as param via <Link>
    const id = this.props.params.id;
    // fecthes artist information (by id)
    await this.getArtist(id);
  }

  // get artist information by id
  getArtist = async (id) => {
    let data = await fetch(`${process.env.REACT_APP_WEB_API}/artistsAPI/${id}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .catch(err => {
        console.log(`Could not request artist from API. Error ${err}`);
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ artist: data });
  }

  /**
   * updates state.artist, keeping all it's information and just changing one value
   * @param {*} type represents the object value to change
   * @param {*} value value to replace previous value
   */
  handleArtist = (type, value) => {
    switch (type) {
      case "name":
        this.setState(previousState => ({
          artist: {
            ...previousState.artist,
            name: value,
          }
        }));
        break;
      case "email":
        this.setState(previousState => ({
          artist: {
            ...previousState.artist,
            email: value,
          }
        }));
        break;
      
      default:
        break;
    }
  }

  // requests to the API to edit one artist
  editArtist = async (event) => {
    // cancels the event (if it's cancellable) without stopping its propagation
    // this means that the request will be done, but the event will be stopped
    event.preventDefault();

    const artist = this.state.artist;

    // regexp by w3resource (https://www.w3resource.com/javascript/form/email-validation.php)
    const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // validate name
    if (artist.name.trim() === "") {
      this.setState({ fetchErr: true, fetchMsg: "Nome inválido" });
      return;
    }

    // validate email
    if (!emailRegexp.test(artist.email)) {
      this.setState({ fetchErr: true, fetchMsg: "Email inválido" });
      return;
    }    

    // creates an object of key/value pairs to be sent to an API
    let formData = new FormData();

    // appends album data to the formData
    formData.append("id", artist.id);
    formData.append("name", artist.name);
    formData.append("email", artist.email);
    formData.append("userId", artist.userId);

    // if the request was successful, this flag will be holding value "true"
    // this means the browser will redirect to another page
    let redirect = false;

    // sends album to API through post request
    await fetch(`${process.env.REACT_APP_WEB_API}/artistsAPI/${artist.id}`, {
      method: "put",
      body: formData,
    })
      .then(res => {
        if (res.ok) {
          redirect = true;
          return;
        }
        // throws an exception with the text response
        throw res.text();
      })
      .catch(async err => {
        // this.setState({ fetchErr: true, fetchMsg: "Erro ao criar album" });
        // waits until the promise fulfilled and attributes it response into state
        this.setState({ fetchErr: true, fetchMsg: await err });
      });

    // redirects to index page if redirect === true
    if (redirect) {
      this.props.navigate("/artists", {state: {success: true, msg: "Artista editado com sucesso"}});
    }
  }

  render() {
    // deconstructs this.state into multiple constant variables
    const { artist, fetchErr, fetchMsg } = this.state;

    // conditional rendering. This means we can render different components/structure
    // depending on the situation.
    // there's one component that is written like so: <></>.
    // because react JSX only returns one element, we surrounded the code with <> and </>
    // this is the shortest syntax of a React.Fragment
    if (fetchErr) {
      return (
        <>
          <Navbar />
          <div className="flex flex-col justify-between gap-6">
            <div>
              <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 capitalize">Editar artista</h2>
                <form onSubmit={this.editArtist}>
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <label className="text-gray-700">Nome</label>
                      <input type="text" value={artist.name} onChange={e => this.handleArtist("name", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                    </div>
                    <div>
                      <label className="text-gray-700">Email</label>
                      <input type="email" value={artist.email} onChange={e => this.handleArtist("email", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                    </div>                                     
                  </div>
                  <div className="flex justify-end mt-6">
                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Guardar</button>
                  </div>
                </form>
                
              </section>
            </div>
            <Popup type="error" msg={fetchMsg} />
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Editar artista</h2>
              <form onSubmit={this.editArtist}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700">Título</label>
                    <input type="text" value={artist.name} onChange={e => this.handleArtist("name", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                  </div>
                  <div>
                    <label className="text-gray-700">Email</label>
                    <input type="email" value={artist.email} onChange={e => this.handleArtist("email", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                  </div>                                     
                </div>
                <div className="flex justify-end mt-6">
                  <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Guardar</button>
                </div>
              </form>
              
            </section>
          </div>
          <Footer />
        </>
      );
    }
  }

}

export default withHooks(ArtistsEdit);
