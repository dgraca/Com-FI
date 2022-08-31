import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

// Represents the header of the table
const THead = () => {
  return (
    <thead>
      <tr>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Título
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Ano de lançamento
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Total de músicas
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" colSpan="3"></th>
      </tr>
    </thead>
  );
}

// Represents the component of the table's body
const TBody = (props) => {
  // rows represent the albums passed via props
  let rows = props.dataIN;
  // loading status passed via props
  const loading = props.loading;
  // represents the function to delete one album passed via props
  const deleteAlbum = props.deleteAlbum;

  // if component still loading (still fetching data)
  // displays spinner
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
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5" colSpan="6">
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
  rows = rows.map(album => {
    return (
      
      <tr key={album.id}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
            <p className="text-gray-900 whitespace-no-wrap">
              {album.title}
            </p>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
            <p className="text-gray-900 whitespace-no-wrap">
              {album.releaseYear}
            </p>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
            <p className="text-gray-900 whitespace-no-wrap">
              {album.albumMusics.length}
            </p>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
          <Link to={{ pathname: `/albums/${album.id}/details`, id: album.id }} className="text-gray-900 whitespace-no-wrap tracking-wider font-bold rounded-md bg-blue-300 hover:bg-blue-400 px-4 py-2">Detalhes</Link>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
            <Link to={{ pathname: `/albums/${album.id}/edit`, id: album.id }} className="text-gray-900 whitespace-no-wrap tracking-wider font-bold rounded-md bg-yellow-300 hover:bg-yellow-400 px-4 py-2">Editar</Link>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
            <button onClick={e => deleteAlbum(e.target.value)} value={album.id} className="text-gray-900 whitespace-no-wrap tracking-wider font-bold rounded-md bg-red-300 hover:bg-red-400 px-6 py-2">
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
 * Component that represents the page that will display all albums
 * That means, on the album index page, there will be a table with all the albums
 */
class AlbumsTable extends React.Component {
  render() {
    // deconstructs this.state into multiple constant variables
    const { albumsDataIN, deleteAlbum, loading } = this.props;

    return (
      // code of component : https://tailwindcomponents.com/components/tables
      // *adjusted to fit our needs
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-row items-start justify-between">
            <h2 className="text-2xl font-semibold leading-tight">Albúns</h2>
            <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              <Link to="/albums/create">Criar Album</Link>
            </button>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <THead />
                <TBody dataIN={albumsDataIN} deleteAlbum={deleteAlbum} loading={loading}/>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AlbumsTable;
