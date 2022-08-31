import React from "react";
import Spinner from "./Spinner";

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

const TBody = (props) => {
  let rows = props.dataIN;
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5" align="center">
            <Spinner/>
          </td>
        </tr>
      </tbody>
    );
  }
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


  return <tbody>{rows}</tbody>;
};

class GenresTable extends React.Component {
  render() {
    const { genresDataIN } = this.props;

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
                <TBody dataIN={genresDataIN}/>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GenresTable;
