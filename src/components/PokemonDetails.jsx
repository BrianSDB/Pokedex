/* eslint-disable react/prop-types */
// import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { PokeContext } from "./PokeEvolution";
export const PokemonDetails = () => {
  const { id } = useParams();
  //   const allPokemons = useContext(PokeContext);
  //   console.log(allPokemons);

  //   const [pokemon, setPokemon] = useState([]);
  //   const fetchPokemon = async (id) => {
  //     const data = await allPokemons(id);
  //     setPokemon(data);
  //   };

  //   useEffect(() => {
  //     fetchPokemon(id);
  //   }, []);

  return (
    <div>
      <div className="detail-name">
        {/* <h3>{pokemon?.name}</h3> */}

        <h1>{id}</h1>
      </div>
      <div className="detail-type"></div>
      <div className="detail-stats"></div>
      <img />
    </div>
  );
};
