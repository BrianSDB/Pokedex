import "./index.css";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import PokeEvolution from "./components/PokeEvolution";
import { PokemonDetails } from "./components/PokemonDetails";
import { PokemonProvider } from "./context/PokemonProvider";
import { WelcomePage } from "./components/WelcomePage";
import { SearchComponent } from "./components/SearchComponent";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const login = window.localStorage.getItem("isLoggedIn");
  return (
    <>
      <PokemonProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/login"
              element={login ? <PokeEvolution /> : <Login />}
            />
            <Route path="Pokemon" element={<PokeEvolution />} />
            <Route path="Pokemon/:id" element={<PokemonDetails />} />
            <Route path="search" element={<SearchComponent />} />
          </Routes>
        </BrowserRouter>
      </PokemonProvider>
    </>
  );
}

export default App;
