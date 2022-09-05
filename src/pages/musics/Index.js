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

/**
 * Component that represents the page to list all musics
 */
class MusicsIndex extends React.Component {
  // component's initial state
  state = {
    musics: [],
    loading: true,
    fetchErr: false,
    fetchMsg: "",
  }

  // when the component is mounted, it calls this method.
  // This method is one of many of the react Lifecycle
  async componentDidMount() {
    await this.getMusics();
  }

  // fetches all musics from API
  async getMusics() {
    let data = await fetch(`${process.env.REACT_APP_WEB_API}/musicsAPI/`)
      .then(res => {
        if(res.ok) {
          return res.json();
        };
      })
      .catch(err => {
        console.log(`Could not request musics from API. Error ${err}`);
        this.setState({ fetchErr: true, fetchMsg: "Erro ao carregar dados da API" });
        return [];
      });

    this.setState({ musics: data, loading: false });
  }

  // method to render the component
  render() {
    // deconstructs this.state into multiple constant variables
    const { musics, loading, fetchErr, fetchMsg } = this.state;
    
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
            <MusicsTable musicsDataIN={musics} loading={loading} />
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
            <MusicsTable musicsDataIN={musics} loading={loading} />
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
