import React from "react";

const Select = (props) => {
  const { genresIN, genreOUT } = props;
  let options = [];

  genresIN.forEach(genre => {
    options.push(
      <option key={genre.id} value={genre.id}>{genre.title}</option>
    );
  });
  
  // code of component : https://flowbite.com/docs/forms/select/
  // *adjusted to fit our needs
  return <>
    <select onChange={(e) => genreOUT(e)} defaultValue="0" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md">
      <option value="0">Escolha uma opção</option>
      {options}
    </select>
  </>
};

export default Select;
