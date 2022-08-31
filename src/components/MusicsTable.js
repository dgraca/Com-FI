import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

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
          Género
        </th>
      </tr>
    </thead>
  );
}

const TBody = (props) => {
  let rows = props.dataIN;
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5" align="center" colSpan="3">
            <Spinner/>            
          </td>
        </tr>
      </tbody>
    );
  }
  rows = rows.map(music => {
    return (
      <tr key={music.id}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
            <p className="text-gray-900 whitespace-no-wrap">
              {music.title}
            </p>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
            <p className="text-gray-900 whitespace-no-wrap">
              {music.releaseYear}
            </p>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
            <p className="text-gray-900 whitespace-no-wrap">
              {music.genre.title}
            </p>
          </div>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

class MusicsTable extends React.Component {  
  render() {
    const { musicsDataIN } = this.props;   
    return (
      // code of component : https://tailwindcomponents.com/components/tables
      // *adjusted to fit our needs
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-row items-start justify-between">
            <h2 className="text-2xl font-semibold leading-tight">Músicas</h2>
            {/*           
              component by MerakiUI (https://merakiui.com)
              MerakiUI offers Tailwind CSS components with an MIT license
              *adjusted to fit our needs
            */}
            <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              <Link to="/musics/create">Criar Música</Link>
            </button>
            {/* end of component */}
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <THead />
                <TBody dataIN={musicsDataIN}/>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicsTable;
