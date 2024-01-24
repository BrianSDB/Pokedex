import { useState, useEffect, useRef } from "react";
import pokedex from "../assets/Pokédex_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import pokeball from "../assets/Pokemon-Pokeball.png";

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
      <img className="pokedex" src={pokedex} />
      <img id="pokeball" src={pokeball} alt="pokeballImg" />
      <div className="header">
        <input type="text" ref={inputRef} placeholder="Search for pokemon.." />
        <button id="search" onClick={searchPokemon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      {error ? <p>Pokemon does not exist</p> : ""}
      <div className="card-container">
        <div className="poke-content">
          <h2> {pokemon?.name.toUpperCase()}</h2>
          <img
            id="pokemonImg"
            src={
              pokemon?.sprites?.versions["generation-v"]["black-white"].animated
                .front_default
            }
            alt="Pokemon"
          />
        </div>
        <div className="abilities">
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
        </div>
      </div>
      {/* </div> */}{" "}
      <div className="footer">
        <Link className="p-link" to="/Pokemon">
          Discover Pokedex
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};
