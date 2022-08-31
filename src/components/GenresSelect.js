import React from "react";

// Component that serves the purpose to select genres passed via props
const Select = (props) => {
  // deconstructs props into const variables
  const { genresIN, genreOUT } = props;
  // new options array
  let options = [];

  // for each genre passed via props, it populates options
  // array with an html option tag
  genresIN.forEach(genre => {
    options.push(
      <option key={genre.id} value={genre.id}>{genre.title}</option>
    );
  });
  
  // returns a select component populated with all options
  return <>
    {/* code of component : https://flowbite.com/docs/forms/select/
      *adjusted to fit our needs
      */}
    <select onChange={(e) => genreOUT(e)} defaultValue="0" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md">
      <option value="0">Escolha uma opção</option>
      {options}
    </select>
  </>
};

export default Select;
