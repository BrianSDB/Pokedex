/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import PokemonThumbnail from "./PokemonThumbnail";
import { Link } from "react-router-dom";
import { PokemonDetails } from "./PokemonDetails";

const PokeContext = createContext();
const PokeEvolution = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        // console.log(data);
        setAllPokemons((currentList) => [...currentList, data]);
        await allPokemons.sort((a, b) => a.id - b.id);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <PokeContext.Provider value={allPokemons}>
      <div className="app-contaner">
        <h1>Pokemon Evolution</h1>
        <Link to="/">Back</Link>
        <div className="pokemon-container">
          <div className="all-container">
            {allPokemons.map((pokemonStats, index) => (
              <>
                <Link to={`/Pokemon/${pokemonStats.id}`}>
                  <PokemonThumbnail
                    key={index}
                    id={pokemonStats.id}
                    image={pokemonStats.sprites.other.dream_world.front_default}
                    name={pokemonStats.name}
                    type={pokemonStats.types[0].type.name}
                  />
                  <PokemonDetails />
                </Link>
                {/* <PokemonDetails
                image={pokemonStats.sprites.other.dream_world.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types[0].type.name}
                stats={pokemonStats.stats.map((stat) => {
                  return (
                    <div key={stat.name}>
                      <p>{stat.stat.name}</p>
                      <p>{stat.base_stat}</p>
                    </div>
                  );
                })}
              /> */}
              </>
            ))}
          </div>
          <button className="load-more" onClick={() => getAllPokemons()}>
            Load more
          </button>
        </div>
      </div>
    </PokeContext.Provider>
  );
};

export default PokeEvolution;
export { PokeContext };
