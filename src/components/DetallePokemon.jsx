// Importa el archivo de estilos asociado al componente
import './detalle.css';

// Componente DetallePokemon
function DetallePokemon({ mostrar, pokemon, cerrar }) {
  return (
    // Contenedor modal, se muestra o se oculta según el valor de 'mostrar'
    <div className="modal-container" onClick={cerrar} style={{ display: mostrar ? 'grid' : 'none' }}>
      {/* Cuerpo del modal */}
      <section className="modal-body">
        {/* Contenedor de la imagen */}
        <div className="imagen-container">
          {/* Imagen del Pokémon */}
          <img src={pokemon.imagen} alt={pokemon.nombre} className="imagen-detalle" />
          {/* Sección para mostrar los tipos del Pokémon */}
          <section>
            {pokemon.types?.map(type => <span className='tag'>{type}</span>)}
          </section>
        </div>
        {/* Contenedor de datos del Pokémon */}
        <div className="data">
          {/* Título del Pokémon con su nombre e ID */}
          <h2 className="titulo">{pokemon.nombre} ({pokemon.id})</h2>

          {/* Sección de habilidades del Pokémon */}
          <h3 className="titulo-seccion">Habilidades</h3>
          {pokemon.abilities?.map(ability => <span className='tag'>{ability}</span>)}

          {/* Sección de estadísticas del Pokémon */}
          <h3 className="titulo-seccion">Estadisticas</h3>
          <div className='stats'>
            {pokemon.stats?.map(stat =>
              // Sección para mostrar cada estadística del Pokémon
              <section>
                <span className='puntos'>{stat.base}</span>
                <span>{stat.name}</span>
              </section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// Exporta el componente DetallePokemon para su uso en otras partes de la aplicación
export default DetallePokemon;