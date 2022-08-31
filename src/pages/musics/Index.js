import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MusicsTable from "../../components/MusicsTable";
import Popup from "../../components/Popup";
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

class MusicsIndex extends React.Component {
  state = {
    musics: [],
    loading: true,
    fetchErr: false,
    fetchMsg: "",
  }

  async componentDidMount() {
    await this.getMusics();
  }

  async getMusics() {
    let data = await fetch("api/musicsAPI/")
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(`Could not request musics from API. Error ${err}`);
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ musics: data, loading: false });
  }

  render() {
    const { musics, loading, fetchErr, fetchMsg } = this.state;
    const navigateState = this.props.location.state;

    // because react JSX only returns one element, we surrounded the code with <> and </>
    // this is the shortest syntax of a React.Fragment
    if (fetchErr) {
      return (
        <>
          <Navbar />
          <div>
            <MusicsTable musicsDataIN={musics} loading={loading}/>
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
              <Popup type="success" msg={navigateState.msg} loading={loading}/>
            </div>
            <MusicsTable musicsDataIN={musics} />
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <MusicsTable musicsDataIN={musics} loading={loading}/>
          <Footer />
        </>
      );
    }
  }

}

export default withHooks(MusicsIndex);
