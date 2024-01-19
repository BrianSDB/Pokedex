/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";

export const PokemonDetails = () => {
  const { getPokemonByID } = useContext(PokemonContext);

  const [pokemon, setPokemon] = useState({});

  const { id } = useParams();

  const fetchPokemon = async (id) => {
    const data = await getPokemonByID(id);
    setPokemon(data);
  };

  const style = pokemon?.types?.map((style) => {
    return `pokemon-card ${style.type.name}`;
  });

  console.log(pokemon);
  console.log(style);

  useEffect(() => {
    fetchPokemon(id);
  }, []);

  console.log(pokemon);
  //   console.log(pokemon?.types[0].type.name);
  const stats = pokemon?.stats?.map((pokeStat) => {
    console.log(pokeStat.base_stat);
    console.log(pokeStat.stat.name);
    return (
      <div className="stats" key={pokeStat.stat.name}>
        <p>{pokeStat.stat.name}</p>
        <progress
          value={pokeStat.base_stat}
          max={255}
          aria-label={pokeStat.base_stat}
        >
          <small>{pokeStat.base_stat}</small>
        </progress>
      </div>
    );
  });

  return (
    <div className="detail-container">
      <div className={style}>
        <h1>{pokemon?.name?.toUpperCase()}</h1>

        <div className="detail-header">
          <img
            id="detail-img"
            src={pokemon?.sprites?.other["official-artwork"].front_default}
          />
        </div>
        <div className="statistics">
          <div className="poke-stats">
            <p className="poke-details">Weight: {pokemon.weight}</p>
            <p className="poke-details">Height: {pokemon.height}</p>
            {pokemon?.types?.map((type) => {
              return (
                <p key={type.type.name} className="poke-details">
                  Type: {type.type.name}
                </p>
              );
            })}
          </div>
          <div className="stat">
            <h6>{stats}</h6>
          </div>
        </div>
      </div>
      <Link to="/Pokemon" className="link">
        Return to Pokedex
      </Link>
    </div>
  );
};
