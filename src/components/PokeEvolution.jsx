/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import PokemonThumbnail from "./PokemonThumbnail";
import { Link } from "react-router-dom";

import { PokemonContext } from "../context/PokemonContext";

const PokeEvolution = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const { pokemons } = useContext(PokemonContext);
  console.log(pokemons);

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
    <div className="app-contaner">
      <h1>Pokemon Evolution</h1>
      <Link className="link" to="/">
        Back
      </Link>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemonStats, index) => (
            <>
              <Link className="link" to={`/Pokemon/${pokemonStats.id}`}>
                <PokemonThumbnail
                  key={index}
                  id={pokemonStats.id}
                  image={pokemonStats.sprites.other.dream_world.front_default}
                  name={pokemonStats.name}
                  type={pokemonStats.types[0].type.name}
                />
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
  );
};

export default PokeEvolution;
