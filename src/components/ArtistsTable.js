import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

// receives a date argument
// and parses it to string
// .slice(-2) extracts the last 2 elements of an array
// in this case, we are using it to extract the last 2 characters
// to present the leading zeros in datetime format
const parseData = (date) => {
    date = new Date(date);
    let finalDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
    let finalTime = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2);
    return finalDate + ' ' + finalTime;
}

// Represents the header of the table
const THead = () => {
  return (
    <thead>
      <tr>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Nome
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Email
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Data de inscrição
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" colSpan="2"></th>
      </tr>
    </thead>
  );
}

// Represents the component of the table's body
const TBody = (props) => {
  // rows represent the artists passed via props
  let rows = props.dataIN;
  // loading status passed via props
  const loading = props.loading;
  // represents the function to delete one artist passed via props
  const deleteArtist = props.deleteArtist;

  // if component still loading (still fetching data) it displays spinner
  if (loading) {
    return(
      <tbody>
        <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5" colSpan="6">
            <div className="flex items-center justify-center">
              <Spinner/>
            </div>
          </td>
        </tr>
      </tbody>
    )
  }

  // if there is no data to display, displays this default message
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5" colSpan="5">
            <div>
              <p className="text-gray-900 whitespace-no-wrap">
                Sem dados a apresentar
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  // there is data to display, so it populates the table with the data
  rows = rows.map(artist => {
    return (
      <tr key={artist.id}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
            <p className="text-gray-900 whitespace-no-wrap">
              {artist.name}
            </p>            
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
            <div>
              <p className="text-gray-900 whitespace-no-wrap">
                {artist.email}
              </p>
            </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
            <div>
              <p className="text-gray-900 whitespace-no-wrap">
                {parseData(artist.registrationDate)}
              </p>
            </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
            <Link to={{ pathname: `/artists/${artist.id}/edit`, id: artist.id }} className="text-gray-900 whitespace-no-wrap tracking-wider font-bold rounded-md bg-yellow-300 hover:bg-yellow-400 px-4 py-2">Editar</Link>
          </div>
        </td>       
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
            <div>
              <button onClick={e => deleteArtist(e.target.value)} value={artist.id} className="text-gray-900 whitespace-no-wrap tracking-wider font-bold rounded-md bg-red-300 hover:bg-red-400 px-6 py-2">
                Eliminar
              </button>
            </div>
        </td>            
      </tr>
    );
  });

  // returns the body of the table populated (with data, with default message or with spinner)
  return <tbody>{rows}</tbody>;
};


/**
 * Component that represents the the artists table.
 * That means, there will be a table with all artists
 */
class ArtistsTable extends React.Component {
  render() {
    // deconstructs this.state into multiple constant variables
    const { artistsDataIN, deleteArtist, loading } = this.props;

    return (
      // code of component : https://tailwindcomponents.com/components/tables
      // *adjusted to fit our needs
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-row items-start justify-between">
            <h2 className="text-2xl font-semibold leading-tight">Artistas</h2>
            {/*           
              component by MerakiUI (https://merakiui.com)
              MerakiUI offers Tailwind CSS components with an MIT license
              *adjusted to fit our needs
            */}
            <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              <Link to="/artists/create">Criar Artista</Link>
            </button>
            {/* end of component */}
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <THead />
                <TBody dataIN={artistsDataIN} deleteArtist={deleteArtist} loading={loading}/>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtistsTable;