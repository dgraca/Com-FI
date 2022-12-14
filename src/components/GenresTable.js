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
  rows = rows.map(genre => {
    return (
      <tr key={genre.id}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
          <div>
            <p className="text-gray-900 whitespace-no-wrap">
              {genre.title}
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
 * Component that represents the the genres table.
 * That means, on the genres index page, there will be a table with all genres
 */
class GenresTable extends React.Component {
  render() {
    // deconstructs this.state into multiple constant variables
    const { genresDataIN, loading } = this.props;

    return (
      // code of component : https://tailwindcomponents.com/components/tables
      // *adjusted to fit our needs
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Géneros</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <THead />
                <TBody dataIN={genresDataIN} loading={loading}/>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GenresTable;
