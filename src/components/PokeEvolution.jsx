import { useState, useEffect, useContext } from "react";
import PokemonThumbnail from "./PokemonThumbnail";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";

const PokeEvolution = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const { pokemons } = useContext(PokemonContext);
  console.log(pokemons);
  const [loading, setLoading] = useState(true);

  const { onInputChange, valueSearch, onResetForm } =
    useContext(PokemonContext);

  const navigate = useNavigate();
  const location = useLocation();

  const onSearchSubmit = (e) => {
    e.preventDefault();

    navigate("/search", {
      state: valueSearch,
    });

    onResetForm();
  };

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);
    setLoading(false);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setAllPokemons((currentList) => [...currentList, data]);
        await allPokemons.sort((a, b) => a.id - b.id);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);
  function Logout() {
    navigate("/login");
    window.localStorage.removeItem("isLoggedIn");
  }

  return (
    <div className="app-contaner">
      <h1>Welcome {location.state?.id} !</h1>
      <button className="logout" onClick={Logout}>
        Log out
      </button>
      <Link className="link" to="/">
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <div className="pokemon-container">
          <form onSubmit={onSearchSubmit}>
            <div className="form-group">
              <input
                type="search"
                name="valueSearch"
                id=""
                value={valueSearch}
                onChange={onInputChange}
                placeholder="Search pokemon"
                required
              />
            </div>

            <button className="btn-search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          <div className="all-container">
            {allPokemons.map((pokemonStats) => (
              <>
                <Link className="link" to={`/Pokemon/${pokemonStats.id}`}>
                  <PokemonThumbnail
                    key={pokemonStats.id}
                    id={pokemonStats.id}
                    image={pokemonStats.sprites.other.dream_world.front_default}
                    name={pokemonStats.name}
                    type={pokemonStats.types.map((type) => {
                      return (
                        <span key={type.type.name} className={type.type.name}>
                          {type.type.name}
                        </span>
                      );
                    })}
                  />
                </Link>
              </>
            ))}
          </div>
          <button className="load-more" onClick={() => getAllPokemons()}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default PokeEvolution;
