import { useState, useEffect } from "react";
import { Logo, Luna, Sol } from "./Icons";
import './Navbar.css'

const Navbar = () => {

  // Estado para el tema (claro/oscuro)
  const [tema, setTema] = useState('claro')

  // Manejador de cambio para el interruptor (switch)
  const handleChange = (e) => setTema(e.target.checked ? 'oscuro' : 'claro')

  // Efecto secundario para aplicar el tema al cuerpo del documento
  useEffect(() => {
    document.body.setAttribute('data-tema', tema)
  }, [tema])

  return (
    <nav>
      <Logo /> {/* Componente de logotipo */}
      <div className="switch">
        <Sol /> {/* Icono del sol para tema claro */}
        <label>
          <input type="checkbox" className="check-switch" onChange={handleChange} hidden />
          <span className="slider"></span> {/* Elemento visual del interruptor */}
        </label>
        <Luna /> {/* Icono de la luna para tema oscuro */}
      </div>
    </nav>
  )
}

export default Navbar;