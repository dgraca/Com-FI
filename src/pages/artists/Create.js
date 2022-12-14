import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Popup from "../../components/Popup";
import { useNavigate } from "react-router-dom";

// this is a work-around to use react hooks in ES6 classes
// Hooks cannot be used inside ES6 classes, and we need them
// because of the react-router-dom way of passing props
// this function returns a component with all it's props plus the params (props)
// passed by the react-router-dom components (Link, Router, etc)
// for more info: https://reactjs.org/docs/higher-order-components.html
const withHooks = (Component) => {
  return props => <Component {...props} navigate={useNavigate()} />;
}

/**
 * Component that represents the page to create one artist
 */
class ArtistsCreate extends React.Component {
  // component's initial state
  state = {
    artist: {
        "name": "",
        "email": "",
        "password": "",
    },
    fetchErr: false,
    fetchMsg: "",
  }

  /**
   * updates state.music, keeping all it's information and just changing one value
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
      case "password":
        this.setState(previousState => ({
          artist: {
            ...previousState.artist,
            password: value,
          }
        }));
        break;
    
      default:
        break;
    }
  }

  // requests to the API to create one artist
  createArtist = async (event) => {
    // cancels the event (if it's cancellable) without stopping its propagation
    // this means that the request will be done, but the event will be stopped
    event.preventDefault();

    const artist = this.state.artist;

    // regexp by w3resource (https://www.w3resource.com/javascript/form/email-validation.php)
    const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // validates name
    if (artist.name.trim() === "") {
      this.setState({ fetchErr: true, fetchMsg: "Nome inv??lido" });
      return;
    }

    // validates email
    if (!emailRegexp.test(artist.email)) {
      this.setState({ fetchErr: true, fetchMsg: "Email inv??lido" });
      return;
    }
    
    // validates password
    if (artist.password.trim() === "") {
      this.setState({ fetchErr: true, fetchMsg: "Palavra-chave inv??lida" });
      return;
    }

    // creates an object of key/value pairs to be sent to an API
    let formData = new FormData();

    // appends album data to the formData
    formData.append("name", artist.name);
    formData.append("email", artist.email);
    formData.append("password", artist.password);

    // if the request was successful, this flag will be holding value "true"
    // this means the browser will redirect to another page
    let redirect = false;

    // sends music to API through post request
    await fetch(`${process.env.REACT_APP_WEB_API}/artistsAPI/`, {
      method: "post",
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
        // this.setState({ fetchErr: true, fetchMsg: "Erro ao criar m??sica" });
        // waits until the promise fulfilled and attributes it response into state
        this.setState({ fetchErr: true, fetchMsg: await err });
      });
    
    // redirects to index page if redirect === true
    if (redirect) {
      this.props.navigate("/artists", {state: {success: true, msg: "Artista criado com sucesso"}});
    }
  }

  // method to render the component
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
                <h2 className="text-lg font-semibold text-gray-700 capitalize">Criar novo artista</h2>
                <form onSubmit={this.createArtist}>
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <label className="text-gray-700">Nome</label>
                      <input type="text" value={artist.name} onChange={e => this.handleArtist("name", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                    </div>
                    <div>
                      <label className="text-gray-700">Email</label>
                      <input type="email" value={artist.email} onChange={e => this.handleArtist("email", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                    </div>
                    <div>
                      <label className="text-gray-700">Palavra-chave</label>
                      <input type="password" value={artist.password} onChange={e => this.handleArtist("password", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Criar</button>
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
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Criar novo artista</h2>
              <form onSubmit={this.createArtist}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700">Nome</label>
                    <input type="text" value={artist.name} onChange={e => this.handleArtist("name", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                  </div>
                  <div>
                    <label className="text-gray-700">Email</label>
                    <input type="email" value={artist.email} onChange={e => this.handleArtist("email", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                  </div>
                  <div>
                    <label className="text-gray-700">Palavra-chave</label>
                    <input type="password" value={artist.password} onChange={e => this.handleArtist("password", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Criar</button>
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

export default withHooks(ArtistsCreate);
