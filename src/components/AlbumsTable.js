import React from "react";
import { Link } from "react-router-dom";

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
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
      </tr>
    </thead>
  );
}

const TBody = (props) => {
  let rows = props.dataIN;
  const deleteAlbum = props.deleteAlbum;
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5" colSpan="4">
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
            <button onClick={e => deleteAlbum(e.target.value)} value={album.id} className="text-gray-900 whitespace-no-wrap tracking-wider font-bold rounded-md bg-red-300 hover:bg-red-400 px-6 py-2">
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

class AlbumsTable extends React.Component {
  render() {
    const { albumsDataIN, deleteAlbum } = this.props;

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
                <TBody dataIN={albumsDataIN} deleteAlbum={deleteAlbum} />
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AlbumsTable;
