import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Popup from "../../components/Popup";
import AlbumMusicDetails from "../../components/AlbumMusicDetails";
import { useParams } from "react-router-dom";

// this is a work-around to use react hooks in ES6 classes
// Hooks cannot be used inside ES6 classes, and we need them
// because of the react-router-dom way of passing props
// this function returns a component with all it's props plus the params (props)
// passed by the react-router-dom components (Link, Router, etc)
// for more info: https://reactjs.org/docs/higher-order-components.html
const withParams = (Component) => {
  return props => <Component {...props} params={useParams()} />;
}

class AlbumsDetails extends React.Component {

  state = {
    album: {
        "title": "",
        "releaseYear": new Date().getFullYear(),
        "albumMusics": [],
    },
    fetchErr: false,
    fetchMsg: "",
  }

  async componentDidMount() {
    const id = this.props.params.id;       
    await this.getAlbum(id);
  }  

  // request the respective album from API
  // and sets that list to the state's musics array
  async getAlbum(id) {
    let data = await fetch(`/api/albumsAPI/${id}`)
      .then(res => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }
        throw res;
      })
      .catch(err => {
        console.log(`Could not request musics from API. Error ${err}`);
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ album: data });
  }
  
  render() {
    const { album, fetchErr, fetchMsg } = this.state;

    // because react JSX only returns one element, we surrounded the code with <> and </>
    // this is the shortest syntax of a React.Fragment
    if (fetchErr) {
      return (
        <>
          <Navbar />
          <div className="flex flex-col justify-between gap-6">
            <div>
              <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
                <div>
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <h4 className="text-gray-700">Título</h4>
                      <label>{album.title}</label>
                    </div>
                    <div>
                      <label className="text-gray-700">Ano de lançamento</label>
                      <label>{album.releaseYear}</label>
                    </div>                                     
                  </div>
                  <div className="w-full mt-4">
                      <label className="text-gray-700">Musicas</label>
                      <AlbumMusicDetails musicsDataIN={album.albumMusics} />                      
                  </div>                  
                </div>
                
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
          <div className="flex flex-col justify-between gap-6">
            <div>
              <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
                <div>
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <h2 className="text-gray-700 font-bold tracking-wide text-xl">Título</h2>
                      <label>{album.title}</label>
                    </div>
                    <div>
                      <h2 className="text-gray-700 font-bold tracking-wide text-xl">Ano de lançamento</h2>
                      <label>{album.releaseYear}</label>
                    </div>                                     
                  </div>
                  <div className="w-full mt-4">
                    <h2 className="text-gray-700 font-bold tracking-wide text-xl">Musicas</h2>
                    <AlbumMusicDetails musicsDataIN={album.albumMusics} />
                  </div>                  
                </div>                
              </section>
            </div>
          </div>
          <Footer />
        </>
      );
    }  
  }

}

export default withParams(AlbumsDetails);