/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { PokemonContext } from "./PokemonContext";
import { useForm } from "../hooks/useForm";

export const PokemonProvider = ({ children }) => {
  const [pokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [loading, setloading] = useState(true);
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

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
        await pokemons.sort((a, b) => a.id - b.id);
        setloading(false);
      });
    }
    createPokemonObject(data.results);
  };
  const getGlobalPokemons = async () => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);

    setGlobalPokemons(results);
    // setLoading(false);
  };
  const getPokemonByID = async (id) => {
    const baseUrl = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseUrl}pokemon/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    getGlobalPokemons();
  }, []);
  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        getPokemonByID,
        globalPokemons,
        onInputChange,
        onResetForm,
        valueSearch,
        loading,
        setloading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
