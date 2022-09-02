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

/**
 * Component that represents one Album details page.
 * That means, this components list all the information of one album
 */
class AlbumsDetails extends React.Component {

  // component's initial state
  state = {
    album: {
        "title": "",
        "releaseYear": new Date().getFullYear(),
        "albumMusics": [],
    },
    loading: true,
    fetchErr: false,
    fetchMsg: "",
  }

  // when the component is mounted, it calls this method.
  // This method is one of many of the react Lifecycle
  async componentDidMount() {
    const id = this.props.params.id;       
    await this.getAlbum(id);
  }  

  // request the respective album from API
  // and sets it to component's state
  async getAlbum(id) {
    // the request itself
    // if the request was successful, executes the .then() callback
    // if it wasn't, executes the .catch() callback
    let data = await fetch(`${process.env.REACT_APP_WEB_API}/albumsAPI/${id}`)
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

    this.setState({ album: data, loading: false });
  }
  
  //method to render the component
  render() {
    // deconstructs this.state into multiple constant variables
    const { album, loading, fetchErr, fetchMsg } = this.state;

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
                      <AlbumMusicDetails musicsDataIN={album.albumMusics} loading={loading} />                      
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
                    <AlbumMusicDetails musicsDataIN={album.albumMusics} loading={loading} />
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