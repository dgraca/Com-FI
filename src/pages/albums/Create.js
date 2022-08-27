import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Popup from "../../components/Popup";
import MusicsCheckBox from "../../components/MusicsCheckBox";

class AlbumsCreate extends React.Component {
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

  componentDidMount() {
    this.getMusics();
  }

  // request the list of musics from API
  // and sets that list to the state's musics array
  async getMusics() {
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

  getAlbumMusics = () => {
    const albumMusics = this.state.album.albumMusics;
    return albumMusics.map(albumMusic => {
      return this.state.musics.find(music => music.id == albumMusic);
    });
  }

  createAlbum = async (event) => {
    // cancels the event (if it's cancellable) without stopping its propagation
    // this means that the request will be done, but the event will be stopped
    event.preventDefault();

    const album = this.state.album;

    if (album.title.trim() === "") {
      this.setState({ fetchErr: true, fetchMsg: "Título inválido" });
      return;
    }
    if (album.releaseYear === "") {
      this.setState({ fetchErr: true, fetchMsg: "Ano de lançamento inválido" });
      return;
    }    

    if (album.albumMusics.length === 0) {
      this.setState({ fetchErr: true, fetchMsg: "É obrigatório ter pelo menos uma música" });
      return;
    }
    album.albumMusics = this.getAlbumMusics();
    // creates an object of key/value pairs to be sent to an API
    let formData = new FormData();
    formData.append("title", album.title);
    formData.append("releaseYear", album.releaseYear);
    //formData.append("albumMusics", JSON.stringify(album.albumMusics));
    album.albumMusics.forEach((music, i) => {
      formData.append(`albumMusics[${i}].Id`, music.id);
      formData.append(`albumMusics[${i}].Title`, music.title);
      formData.append(`albumMusics[${i}].ReleaseYear`, music.releaseYear);
      formData.append(`albumMusics[${i}].GenreFK`, music.genre.id);
    });

    // sends album to API through post request
    await fetch("/api/albumsAPI/", {
      method: "post",
      body: formData,
    })
      .then(res => {
        if (res.ok) {
          console.log(res);
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
  }

  render() {
    const { album, musics, fetchErr, fetchMsg } = this.state;

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
                    <div>
                      <label className="text-gray-700">Musicas</label>
                      {/* meter um select para as musicas */}
                      <MusicsCheckBox musics={musics} albumMusics={e => this.handleAlbum("albumMusics", e.target.value)} />
                      {/* <GenresSelect className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" genresIN={genres} genreOUT={e => this.handleMusic("genre", e.target.value)} /> */}
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
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Criar novo album</h2>
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
                    <MusicsCheckBox musics={musics} albumMusics={e => this.handleAlbum("albumMusics", e.target.value)} />
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

export default AlbumsCreate;
