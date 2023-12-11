import React from 'react';
import './buscador.css';
import { Buscar } from './Icons';

// Componente Buscador
function Buscador({ busqueda, setBusqueda, buscarPokemon }) {
  return (
    // Contenedor principal del buscador
    <div className='buscador-container'>
      {/* Título del buscador */}
      <h3 className='titulo'>Busca y Elige tu Pokémon Favorito</h3>

      {/* Formulario de búsqueda con manejo de eventos onSubmit */}
      <form className='buscador-form' onSubmit={buscarPokemon}>
        {/* Campo de entrada para la búsqueda */}
        <input
          type="text"
          placeholder='Encuentra tu Pokémon'
          className='buscador-input'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)} // Manejo del cambio en la entrada
        />

        {/* Botón de búsqueda */}
        <button className='buscador-btn' type='submit'>
          <Buscar /> {/* Ícono de búsqueda importado */}
          Buscar Pokémon
        </button>
      </form>
    </div>
  );
}

export default Buscador;