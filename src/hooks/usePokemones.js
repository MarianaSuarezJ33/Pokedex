import { useEffect, useState } from 'react';

// Constantes para las URLs de la API PokeAPI
const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0';
const URL_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

/**
 * Hook personalizado para obtener y gestionar datos de Pokémon.
 * @returns {Object} - Objeto con funciones y estados relacionados con los Pokémon.
 */
function usePokemones() {
  // Estados locales para manejar la lista de Pokémon, la URL siguiente y la visibilidad de "Ver Más"
  const [pokemones, setPokemones] = useState([]);
  const [siguienteUrl, setSiguienteUrl] = useState('');
  const [verMas, setVerMas] = useState(true);

  /**
   * Función para obtener información detallada de un Pokémon.
   * @param {string} url - URL del Pokémon.
   * @returns {Promise} - Promesa que resuelve con los detalles del Pokémon.
   */
  const fetchPokemon = async (url) => {
    const response = await fetch(url);
    const poke = await response.json();

    // Extracción de datos relevantes del Pokémon
    const abilities = poke.abilities.map(a => a.ability.name);
    const stats = poke.stats.map(s => ({ name: s.stat.name, base: s.base_stat }));
    const types = poke.types.map(t => t.type.name);

    return {
      id: poke.id,
      nombre: poke.name,
      imagen: poke.sprites.other.dream_world.front_default || poke.sprites.front_default,
      abilities,
      stats,
      types
    };
  };

  /**
   * Función para obtener la lista de Pokémon.
   * @param {string} url - URL de la lista de Pokémon.
   * @returns {Promise} - Promesa que resuelve con la información de la lista de Pokémon.
   */
  const getPokemones = async (url = URL_DEFAULT) => {
    // Obtención de la lista de Pokémon desde la API
    const response = await fetch(url);
    const listaPokemones = await response.json();
    const { next, results } = listaPokemones;

    // Obtención de detalles de cada Pokémon usando Promise.all
    const newPokemones = await Promise.all(results.map((pokemon) => fetchPokemon(pokemon.url)));

    return { next, newPokemones };
  };

  /**
   * Función para inicializar la lista de Pokémon.
   */
  const obtenerPokemones = async () => {
    const { next, newPokemones } = await getPokemones();
    setPokemones(newPokemones);
    setSiguienteUrl(next);
  };

  /**
   * Función para cargar más Pokémon a la lista.
   */
  const masPokemones = async () => {
    const { next, newPokemones } = await getPokemones(siguienteUrl);
    setPokemones(prev => [...prev, ...newPokemones]);
    // Desactivar "Ver Más" si no hay más Pokémon por cargar
    next === null && setVerMas(false);
    setSiguienteUrl(next);
  };

  /**
   * Función para buscar un Pokémon por nombre.
   * @param {string} busqueda - Nombre del Pokémon a buscar.
   * @returns {Promise} - Promesa que resuelve con la información del Pokémon buscado.
   */
  const searchPokemon = async (busqueda) => {
    const url = `${URL_ENDPOINT}${busqueda.toLocaleLowerCase()}`;
    return await fetchPokemon(url);
  };

  // Efecto secundario para cargar la lista de Pokémon al montar el componente
  useEffect(() => {
    obtenerPokemones();
  }, []);

  // Retorno de funciones y estados relevantes
  return { pokemones, masPokemones, verMas, searchPokemon };
}

// Exportación del hook personalizado
export default usePokemones;