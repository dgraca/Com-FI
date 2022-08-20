import React from "react";

function THead() {
  return (
    <thead>
      <tr>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Título
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Ano de lançamento
        </th>
      </tr>
    </thead>
  );
}

const TBody = (props) => {
  const rows = props.dataIN.map(music => {
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
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Músicas</h2>
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
