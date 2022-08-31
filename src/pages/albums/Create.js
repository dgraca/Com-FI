import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Popup from "../../components/Popup";
import MusicsCheckBox from "../../components/MusicsCheckBox";
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
 * Component that represents the page to create one album
 */
class AlbumsCreate extends React.Component {
  // component's initial state
  state = {
    album: {
        "title": "",
        "releaseYear": new Date().getFullYear(),
        "albumMusics": [],     
    },
    musics: [],
    fetchErr: false,
    fetchMsg: "",
  }

  // when the component is mounted, it calls this method.
  // This method is one of many of the react Lifecycle
  async componentDidMount() {
    await this.getMusics();
  }

  // request the list of musics from API
  // and sets that list to the state's musics array
  getMusics = async () => {
    let data = await fetch("/api/musicsAPI/")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .catch(err => {
        console.log(`Could not request musics from API. Error ${err}`);
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ musics: data });
  }

  // checks if one music was selected or deselected by the user
  checkMusics = (id) => {
    let musics = this.state.album.albumMusics;
    return musics.includes(id) ? musics.filter(m => m !== id) : [id, ...musics];
  }

  /**
   * updates state.album, keeping all it's information and just changing one value
   * @param {*} type represents the object value to change
   * @param {*} value value to replace previous value
   */
  handleAlbum = (type, value) => {
    switch (type) {
      case "title":
        this.setState(previousState => ({
          album: {
            ...previousState.album,
            title: value,
          }
        }));
        break;
      case "releaseYear":
        this.setState(previousState => ({
          album: {
            ...previousState.album,
            releaseYear: value,
          }
        }));
        break;
        case "albumMusics":
          value = this.checkMusics(value);
          this.setState(previousState => ({
            album: {
              ...previousState.album,
              albumMusics: value,
            }
          }));
          break;          
      default:
        break;
    }
  }

  // request from API all musics that belongs to an album
  getAlbumMusics = () => {
    const albumMusics = this.state.album.albumMusics;
    return albumMusics.map(albumMusic => {
      return this.state.musics.find(music => music.id == albumMusic);
    });
  }

  // requests to the API to create one album
  createAlbum = async (event) => {
    // cancels the event (if it's cancellable) without stopping its propagation
    // this means that the request will be done, but the event will be stopped
    event.preventDefault();

    const album = this.state.album;

    // validates title
    if (album.title.trim() === "") {
      this.setState({ fetchErr: true, fetchMsg: "Título inválido" });
      return;
    }

    // validates release year
    if (album.releaseYear === "") {
      this.setState({ fetchErr: true, fetchMsg: "Ano de lançamento inválido" });
      return;
    }    

    // validates album musics list
    if (album.albumMusics.length === 0) {
      this.setState({ fetchErr: true, fetchMsg: "É obrigatório ter pelo menos uma música" });
      return;
    }
    
    // requests album musics
    album.albumMusics = this.getAlbumMusics();
    
    // creates an object of key/value pairs to be sent to an API
    let formData = new FormData();

    // appends album data to the formData
    formData.append("title", album.title);
    formData.append("releaseYear", album.releaseYear);
    album.albumMusics.forEach((music, i) => {
      formData.append(`albumMusics[${i}].Id`, music.id);
      formData.append(`albumMusics[${i}].Title`, music.title);
      formData.append(`albumMusics[${i}].ReleaseYear`, music.releaseYear);
      formData.append(`albumMusics[${i}].GenreFK`, music.genre.id);
    });

    // if the request was successful, this flag will be holding value "true"
    // this means the browser will redirect to another page
    let redirect = false;

    // sends album to API through post request
    await fetch("/api/albumsAPI/", {
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
        // this.setState({ fetchErr: true, fetchMsg: "Erro ao criar album" });
        // waits until the promise fulfilled and attributes it response into state
        this.setState({ fetchErr: true, fetchMsg: await err });
      });

    // redirects to index page if redirect === true
    if (redirect) {
      this.props.navigate("/albums", {state: {success: true, msg: "Álbum criado com sucesso"}});
    }
  }

  // method to render the component
  render() {
    // deconstructs this.state into multiple constant variables
    const { album, musics, fetchErr, fetchMsg } = this.state;

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
                <h2 className="text-lg font-semibold text-gray-700 capitalize">Criar novo álbum</h2>
                <form onSubmit={this.createAlbum}>
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <label className="text-gray-700">Título</label>
                      <input type="text" value={album.title} onChange={e => this.handleAlbum("title", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                    </div>
                    <div>
                      <label className="text-gray-700">Ano de lançamento</label>
                      <input type="number" value={album.releaseYear} onChange={e => this.handleAlbum("releaseYear", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                    </div>                                     
                  </div>
                  <div className="w-full mt-4">
                      <label className="text-gray-700">Musicas</label>
                      <MusicsCheckBox musics={musics} handleAlbumMusics={e => this.handleAlbum("albumMusics", e.target.value)} albumMusics={album.albumMusics} />
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
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Criar novo álbum</h2>
              <form onSubmit={this.createAlbum}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700">Título</label>
                    <input type="text" value={album.title} onChange={e => this.handleAlbum("title", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                  </div>
                  <div>
                    <label className="text-gray-700">Ano de lançamento</label>
                    <input type="number" value={album.releaseYear} onChange={e => this.handleAlbum("releaseYear", e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                  </div>                                     
                </div>
                <div className="w-full mt-4">
                    <label className="text-gray-700">Musicas</label>
                    <MusicsCheckBox musics={musics} handleAlbumMusics={e => this.handleAlbum("albumMusics", e.target.value)} albumMusics={album.albumMusics} />
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

export default withHooks(AlbumsCreate);
