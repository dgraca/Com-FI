import React from "react";

// Component that serves the purpose to check musics passed via props
const MusicsCheckBox = (props) => {
  // deconstructs props into const variables
  const { musics, handleAlbumMusics, albumMusics } = props;
  // new options array
  let options = [];

  // for each music passed via props, it populates options
  // array with an input of type checkbox
  musics.forEach(music => {
      options.push(
        <div key={music.id} className="flex items-center p-2 rounded hover:bg-gray-100">
          <input type="checkbox" defaultChecked={albumMusics.find(albumMusic => music.id == albumMusic)} onChange={(e) => handleAlbumMusics(e)} value={music.id} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" />
          <label className="ml-2 w-full text-sm font-medium text-gray-900 rounded">{music.title}</label>
        </div>
      );
  });

  // returns a select component populated with all options
  return <>                                                
      {/* Dropdown menu */}
      <div className="flex flex-row item-start gap-6 flex-wrap">            
          {options}        
      </div>
  </>

};

export default MusicsCheckBox;