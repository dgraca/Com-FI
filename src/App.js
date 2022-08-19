import React from "react";

// function to fetch genres from API
async function getGenres() {
  let dados = await fetch("api/genresAPI/");

  if (!dados.ok) {
    console.error(dados);
    throw new Error("Não foi possível aceder à API e ler os dados dos géneros. Código: ", dados.status);
  }

  // exportar os dados recebido
  return await dados.json();
}

// App's main react component
class App extends React.Component {
  state = {
    genres: [],
  };

  // when component is mounted, code is executed
  componentDidMount() {
    this.LoadGenres();
  }

  async LoadGenres() {
    try {
      // reads data from API
      let genresData = await getGenres();
      console.log(genresData);
      // sets that data into State
      this.setState({ genres: genresData });
    } catch (erro) {
      console.error("Aconteceu um erro no acesso aos dados dos animais. ", erro);
    }
  }

  render() {
    // reads data from State
    const { genres } = this.state;

    // console.log(genres);
    
    return (
      <div class="font-Sora h-screen bg-gray-100">
        <nav class="flex items-center justify-between flex-wrap bg-black p-8">
          <h1 class="text-gray-100 font-bold tracking-wider text-2xl">Com-FI</h1>
        </nav>
        <div class="m-4">
          
        </div>
      </div>
    );
  }
}

export default App;
