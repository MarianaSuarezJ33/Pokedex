import React from 'react';
import Navbar from './components/Navbar';
import Pokemones from './components/Pokemones';

/**
 * Componente principal de la aplicación.
 * Este componente renderiza la barra de navegación y la sección de los Pokémon.
 * @returns {JSX.Element} - Elemento JSX que representa la aplicación.
 */
function App() {
  return (
    <>
      {/* Barra de navegación */}
      <Navbar />
      {/* Sección de Pokémon */}
      <Pokemones />
    </>
  );
}

// Exportar el componente principal
export default App;