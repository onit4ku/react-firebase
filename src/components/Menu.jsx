import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { useHistory } from 'react-router-dom'

const Menu = () => {
    const [usuario, setUsuario] = useState(null)

    const historial = useHistory()


    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
                console.log("login de: " + user.email);
            }
        })
    }, [])


    const cerrarSesion = () => {
        auth.signOut()
        setUsuario(null)
        historial.push('/')
    }

    return (
        <ul className="nav justify-content-center">
            <li className="nav-item" >
                <Link className="nav-link" to="/" >Inicio</Link>
            </li>
            {
                !usuario ? (
                    <li className="nav-item" >
                        <Link className="nav-link" to="/login" >Login</Link>
                    </li>
                ) : (
                    <span></span>
                )
            }


            {
                usuario ? (

                    <li className="nav-item" >
                        <Link className="nav-link" to="/admin" >Mi perfil</Link>
                    </li>

                ) : (
                    <span></span>
                )
            }

            {
                usuario ? (
                    <button onClick={cerrarSesion} className="btn btn-danger">Cerrar Sesión</button>
                ) : (
                    <span></span>
                )
            }
        </ul>
    )
}

export default Menu
