import "./index.css";
import { Pokedex } from "./components/Pokedex";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import PokeEvolution from "./components/PokeEvolution";
import { PokemonDetails } from "./components/PokemonDetails";
import { PokemonProvider } from "./context/PokemonProvider";
import { WelcomePage } from "./components/WelcomePage";
import { SearchComponent } from "./components/SearchComponent";

function App() {
  return (
    <>
      <PokemonProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/welcome" element={<Pokedex />} />
            <Route path="/Pokemon" element={<PokeEvolution />} />
            <Route path="/Pokemon/:id" element={<PokemonDetails />} />
            <Route path="/search" element={<SearchComponent />} />
          </Routes>
        </BrowserRouter>
      </PokemonProvider>
    </>
  );
}

export default App;
