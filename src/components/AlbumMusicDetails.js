import React from "react";
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
          Género
        </th>
      </tr>
    </thead>
  );
}

// Represents the component of the table's body
const TBody = (props) => {
  // rows represent the musics passed via props
  let rows = props.dataIN;
  // loading status passed via props
  const loading = props.loading;
  
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
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5" colSpan="3">
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

  // returns the body of the table populated (with data, with default message or with spinner)
  return <tbody>{rows}</tbody>;
};

/**
 * Component that represents the the albums music details table.
 * That means, on the album details page, there will be a table with all its musics
 */
class AlbumMusicDetails extends React.Component {  
  render() {
    // deconstructs this.state into multiple constant variables
    const { musicsDataIN, loading } = this.props;
    
    return (
      // code of component : https://tailwindcomponents.com/components/tables
      // *adjusted to fit our needs   
      <div className="mt-4 inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <THead />
          <TBody dataIN={musicsDataIN} loading={loading} />
        </table>
      </div>
    );
  }
}

export default AlbumMusicDetails;
