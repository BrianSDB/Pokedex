/* eslint-disable react/prop-types */

const PokemonThumbnail = ({ id, image, name, type }) => {
  const style = type + " thumb-container";

  return (
    <div className={style}>
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h3>{name}</h3>
      </div>
      <div className="card-types">
        <small> {type}</small>
      </div>
    </div>
  );
};

export default PokemonThumbnail;
// {/* <div className="card-types">
//   {pokemon.types.map((type) => (
//     <span key={type.type.name} className={type.type.name}>
//       {type.type.name}
//     </span>
//   ))}
// </div>; */}
