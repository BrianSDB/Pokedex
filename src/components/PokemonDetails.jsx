/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import Loader from "./Loader";
import { capitalFirstLetter } from "../helper/helper";
const evoUrl = "https://pokeapi.co/api/v2/evolution-chain/{id}/";

export const PokemonDetails = () => {
  const { getPokemonByID } = useContext(PokemonContext);
  const [pokemon, setPokemon] = useState({});
  const [evolution, setEvolution] = useState([]);

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const fetchPokemon = async (id) => {
    const data = await getPokemonByID(id);
    setPokemon(data);
    setLoading(false);
    fetch(`${evoUrl}/${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setEvolution(json);
      });
  };

  const style = pokemon?.types?.map((style) => {
    return `pokemon-card ${style.type.name}`;
  });

  console.log(pokemon);
  console.log(style);

  useEffect(() => {
    fetchPokemon(id);
  }, []);
  console.log(evolution);
  return (
    <>
      <main className="container main-pokemon">
        <Link to="/Pokemon" className="link">
          Return to Pokedex
        </Link>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="header-main-pokemon">
              <span className="number-pokemon">#{pokemon.id}</span>

              <div className="container-info-pokemon">
                <h1>{capitalFirstLetter(pokemon.name)}</h1>
                <div className="card-types info-pokemon-type">
                  {pokemon.types.map((type) => (
                    <span key={type.type.name} className={`${type.type.name}`}>
                      {type.type.name}
                    </span>
                  ))}
                </div>
                <div className="info-pokemon">
                  <div className="group-info">
                    <p>Height</p>
                    <span>{pokemon.height}</span>
                  </div>
                  <div className="group-info">
                    <p>Weight</p>
                    <span>{pokemon.weight}KG</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-img-pokemon">
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={`Pokemon ${pokemon?.name}`}
              />
            </div>

            <div className="container-stats">
              <div className="stats">
                <div className="stat-group">
                  <span>Hp</span>
                  <div className="progress-bar"></div>
                  <span className="counter-stat">
                    {pokemon.stats[0].base_stat}
                  </span>
                </div>
                <div className="stat-group">
                  <span>Attack</span>
                  <div className="progress-bar"></div>
                  <span className="counter-stat">
                    {pokemon.stats[1].base_stat}
                  </span>
                </div>
                <div className="stat-group">
                  <span>Defense</span>
                  <div className="progress-bar"></div>
                  <span className="counter-stat">
                    {pokemon.stats[2].base_stat}
                  </span>
                </div>
                <div className="stat-group">
                  <span>Special Attack</span>
                  <div className="progress-bar"></div>
                  <span className="counter-stat">
                    {pokemon.stats[3].base_stat}
                  </span>
                </div>
                <div className="stat-group">
                  <span>Special Defense</span>
                  <div className="progress-bar"></div>
                  <span className="counter-stat">
                    {pokemon.stats[4].base_stat}
                  </span>
                </div>
                <div className="stat-group">
                  <span>Speed</span>
                  <div className="progress-bar"></div>
                  <span className="counter-stat">
                    {pokemon.stats[5].base_stat}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};
