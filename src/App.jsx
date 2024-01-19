import "./index.css";
import { Pokedex } from "./components/Pokedex";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import PokeEvolution from "./components/PokeEvolution";
import { PokemonDetails } from "./components/PokemonDetails";
import { PokemonProvider } from "./context/PokemonProvider";

function App() {
  return (
    <>
      <PokemonProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/Pokemon" element={<PokeEvolution />} />
            <Route path="/Pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </BrowserRouter>
      </PokemonProvider>
    </>
  );
}

export default App;
