import { useState, useEffect, useRef } from "react";
import pokedex from "../assets/Pokédex_logo.png";

import { Link } from "react-router-dom";

const baseUrl = "https://pokeapi.co/api/v2/pokemon/mewtwo";

export const Pokedex = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const pokemonCache = useRef(new Map());

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => {
        if (!response.ok) {
          setError(true);
        }
        return response.json();
      })
      .then((json) => {
        setPokemon(json);
      });
  }, []);

  function searchPokemon() {
    const pokeName = inputRef.current.value;
    if (pokemonCache.current.has(pokeName)) {
      setPokemon(pokemonCache.current.get(pokeName));
      return;
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
        }
        return response.json();
      })
      .then((json) => {
        setPokemon(json);
        pokemonCache.current.set(pokeName, json);
        setError(null);
      });
  }

  return (
    <div className="pokemonContainer">
      <div className="head">
        <img className="pokedex" src={pokedex} />
      </div>
      <div className="header">
        <input type="text" ref={inputRef} placeholder="Search for pokemon.." />

        <button id="search" onClick={searchPokemon}>
          Search Pokedex
        </button>
      </div>
      {error ? <p>Pokemon does not exist</p> : ""}
      <div className="pokemonData">
        <h1>{pokemon?.name.toUpperCase()}</h1>
        <img
          src={
            pokemon?.sprites?.versions["generation-v"]["black-white"].animated
              .front_default
          }
          alt="Pokemon"
        />
        <ul className="pokedex-stats">
          <li>
            {" "}
            Type: <span>{pokemon?.types[0].type.name}</span>
          </li>
          <li>
            {" "}
            Weight: <span>{pokemon?.weight}</span>
          </li>
          <li>
            {" "}
            Abilities: <span>
              {pokemon?.abilities[0].ability.name}
            </span> and {""}
            <span>{pokemon?.abilities[1].ability.name}</span>
          </li>
        </ul>
      </div>
      <div className="footer">
        {" "}
        <Link className="p-link" to="/Pokemon">
          Discover Pokedex
        </Link>
      </div>
    </div>
  );
};
