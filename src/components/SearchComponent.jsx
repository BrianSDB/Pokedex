import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CardPokemon } from "./CardComponent";
import { PokemonContext } from "../context/PokemonContext";
import { Link } from "react-router-dom";
export const SearchComponent = () => {
  const location = useLocation();

  const { globalPokemons } = useContext(PokemonContext);
  console.log(globalPokemons);

  const filteredPokemons = globalPokemons.filter((pokemon) =>
    pokemon.name.includes(location.state.toLowerCase())
  );
  console.log(filteredPokemons);

  return (
    <>
      <div className="return">
        <Link to="/Pokemon" className="link">
          Return to Pokedex
        </Link>
      </div>
      <div className="container">
        <p className="p-search">
          We found <span>{filteredPokemons.length}</span> results:
        </p>
        <div className="card-list-pokemon container">
          {filteredPokemons.map((pokemon) => (
            <CardPokemon pokemon={pokemon} key={pokemon.id} />
          ))}
        </div>
      </div>
    </>
  );
};
