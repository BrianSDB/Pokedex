/* eslint-disable react/prop-types */

export const PokemonCard = ({ stats, pokemon }) => {
  console.log(pokemon);
  //   console.log(pokemon?.sprites?.other["official-artwork"].front_default);
  const pokeImage = pokemon?.sprites?.other["official-artwork"].front_default;
  return (
    <div className="pokeCard">
      <div className="pokeCardContainer">
        <h2>{pokemon?.name}</h2>
        <img id="pokeCardImg" src={pokeImage} alt="Pokemon" />

        <h6>{stats}</h6>
      </div>
    </div>
  );
};
