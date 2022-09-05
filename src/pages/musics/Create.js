import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Popup from "../../components/Popup";
import GenresSelect from "../../components/GenresSelect";
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
 * Component that represents the page to create a music
 */
class MusicsCreate extends React.Component {
  // component's initial state
  state = {
    music: {
        "title": "",
        "releaseYear": new Date().getFullYear(),
        "genre": 0,
    },
    genres: [],
    fetchErr: false,
    fetchMsg: "",
  }

  // when the component is mounted, it calls this method.
  // This method is one of many of the react Lifecycle
  async componentDidMount() {
    await this.getGenres();
  }

  // request the list of genres from API
  // and sets that list to the state's genres array
  async getGenres() {
    let data = await fetch(`${process.env.REACT_APP_WEB_API}/genresAPI/`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .catch(err => {
        console.log(`Could not request genres from API. Error ${err}`);
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ genres: data });
  }

  /**
   * updates state.music, keeping all it's information and just changing one value
   * @param {*} type represents the object value to change
   * @param {*} value value to replace previous value
   */
  handleMusic = (type, value) => {
    switch (type) {
      case "title":
        this.setState(previousState => ({
          music: {
            ...previousState.music,
            title: value,
          }
        }));
        break;
      case "releaseYear":
        this.setState(previousState => ({
          music: {
            ...previousState.music,
            releaseYear: value,
          }
        }));
        break;
      case "genre":
        this.setState(previousState => ({
          music: {
            ...previousState.music,
            genre: value,
          }
        }));
        break;
    
      default:
        break;
    }
  }

  // requests to the API to create one music
  createMusic = async (event) => {
    // cancels the event (if it's cancellable) without stopping its propagation
    // this means that the request will be done, but the event will be stopped
    event.preventDefault();

    const music = this.state.music;

    // validates title
    if (music.title.trim() === "") {
      this.setState({ fetchErr: true, fetchMsg: "Título inválido" });
      return;
    }

    // validates release year
    if (music.releaseYear === "") {
      this.setState({ fetchErr: true, fetchMsg: "Ano de lançamento inválido" });
      return;
    }
    
    // validates genre foreign key
    if (music.genreFK == 0) {
      this.setState({ fetchErr: true, fetchMsg: "Género inválido" });
      return;
    }

    // creates an object of key/value pairs to be sent to an API
    let formData = new FormData();

    // append data to formData
    formData.append("title", music.title);
    formData.append("releaseYear", music.releaseYear);
    formData.append("genreFK", music.genre);

    // if the request was successful, this flag will be holding value "true"
    // this means the browser will redirect to another page
    let redirect = false;

    // sends music to API through post request
    await fetch(`${process.env.REACT_APP_WEB_API}/musicsAPI/`, {
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
        // this.setState({ fetchErr: true, fetchMsg: "Erro ao criar música" });
        // waits until the promise fulfilled and attributes it response into state
        this.setState({ fetchErr: true, fetchMsg: await err });
      });

    // redirects to index page if redirect === true
    if (redirect) {
      this.props.navigate("/musics", {state: {success: true, msg: "Música criada com sucesso"}});
    }
  }

  // method to render the component
  render() {
    // deconstructs this.state into multiple constant variables
    const { music, genres, fetchErr, fetchMsg } = this.state;

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
                <h2 className="text-lg font-semibold text-gray-700 capitalize">Criar nova música</h2>
                <form onSubmit={this.createMusic}>
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <label className="text-gray-700">Título</label>
                      <input type="text" value={music.title} onChange={e => this.handleMusic("title", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                    </div>
                    <div>
                      <label className="text-gray-700">Ano de lançamento</label>
                      <input type="number" value={music.releaseYear} onChange={e => this.handleMusic("releaseYear", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                    </div>
                    <div>
                      <label className="text-gray-700">Género musical</label>
                      <GenresSelect className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" genresIN={genres} genreOUT={e => this.handleMusic("genre", e.target.value)} />
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
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Criar nova música</h2>
              <form onSubmit={this.createMusic}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700">Título</label>
                    <input type="text" value={music.title} onChange={e => this.handleMusic("title", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                  </div>
                  <div>
                    <label className="text-gray-700">Ano de lançamento</label>
                    <input type="number" value={music.releaseYear} onChange={e => this.handleMusic("releaseYear", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                  </div>
                  <div>
                    <label className="text-gray-700">Género musical</label>
                    <GenresSelect className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" genresIN={genres} genreOUT={e => this.handleMusic("genre", e.target.value)} />
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

export default withHooks(MusicsCreate);
