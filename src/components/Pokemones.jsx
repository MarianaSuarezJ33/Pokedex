// Importación de estilos y dependencias necesarias
import './pokemones.css';
import usePokemones from '../hooks/usePokemones';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cargando from './Cargando';
import DetallePokemon from './DetallePokemon';
import Buscador from './Buscador';
import { useState } from 'react';

// Componente funcional para representar una tarjeta de Pokémon individual
function Pokemon({ id, nombre, imagen, verPokemon }) {
  return (
    <div className='pokemon-card' onClick={verPokemon}>
      <img src={imagen} alt={nombre} className='pokemon-imagen' />
      <p className='pokemon-titulo'>
        <span>#{id}</span>
        <span>{nombre}</span>
      </p>
    </div>
  );
}

// Componente principal que renderiza la lista de Pokémon
function Pokemones() {
  // Utilización del hook personalizado para obtener datos de Pokémon
  const { pokemones, masPokemones, verMas, searchPokemon } = usePokemones();
  // Estado local para controlar la visualización del detalle de un Pokémon y su información
  const [mostrar, setMostrar] = useState({ mostrar: false, pokemon: {} });
  // Estado local para gestionar la búsqueda de Pokémon por nombre
  const [busqueda, setBusqueda] = useState('');

  // Función para mostrar la información detallada de un Pokémon
  const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon });

  // Función para cerrar la visualización detallada de un Pokémon
  const noVerPokemon = () => {
    setMostrar({ mostrar: false, pokemon: {} });
    setBusqueda('');
  };

  // Función para buscar un Pokémon por nombre
  const buscarPokemon = async (e) => {
    e.preventDefault();

    if (!busqueda) return;

    const pokemon = await searchPokemon(busqueda);
    console.log(pokemon);
    setMostrar({ mostrar: true, pokemon });
  };

  return (
    <>
      {/* Componente para mostrar el detalle de un Pokémon */}
      <DetallePokemon {...mostrar} cerrar={noVerPokemon} />
      {/* Componente de búsqueda de Pokémon */}
      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} buscarPokemon={buscarPokemon} />
      {/* Componente que implementa un scroll infinito y muestra la lista de Pokémon */}
      <InfiniteScroll
        dataLength={pokemones.length}
        next={masPokemones}
        hasMore={verMas}
        loader={<Cargando />}
        endMessage={
          <h3 className='titulo' style={{ gridColumn: '1/6' }}>Lo siento, no hay más pokemones por mostrar</h3>
        }
        className='pokemon-container'
      >
        {/* Mapeo de la lista de Pokémon para representar cada uno con el componente Pokemon */}
        {pokemones.map(pokemon => <Pokemon {...pokemon} key={pokemon.id} verPokemon={() => verPokemon(pokemon)} />)}
      </InfiniteScroll>
    </>
  );
}

// Exportación del componente principal
export default Pokemones;