import React, { useState } from 'react'
import { auth } from '../firebaseConfig'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [msgError, setMsgError] = useState(null)

    const historial = useHistory()

    const registrarUsuario = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, pass)
            .then(r => {
                historial.push('/')
            }
            )
            .catch(e => {
                if (e.code === 'auth/invalid-email') {
                    setMsgError('formato email incorrecto')
                }
                if (e.code === 'auth/weak-password') {
                    setMsgError('password débil, 6 caracteres min')
                }
                else {
                    setMsgError('ha ocurrido un error: ' + e.code)
                }
            })
    }

    const loginUsuario = () => {
        auth.signInWithEmailAndPassword(email, pass)
            .then(
                (r) => {
                    historial.push('/')
                }
            )
            .catch((err) => {
                if (err.code === 'auth/wrong-password') {
                    setMsgError('password incorrecto')
                }
                else {
                    setMsgError('combinación usuario contraseña incorrecto')
                }
            })
    }

    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={registrarUsuario}>
                    <div className="form-group">
                        <label htmlFor="InputEmail">Email address</label>
                        <input
                            onChange={
                                (e) => {
                                    setEmail(e.target.value)
                                }}
                            className="form-control"
                            aria-describedby="emailHelp" placeholder="Enter email"
                            type="email"
                            id="InputEmail"
                        />
                    </div>
                    <div className="form-group">
                        <small id="emailHelp" className="form-text text-muted mb-2">We'll never share your email with anyone else.</small>
                        <div className="form-group mb-3">
                            <label htmlFor="InputPassword">Password</label>
                            <input
                                onChange={
                                    (e) => {
                                        setPass(e.target.value)
                                    }}
                                className="form-control mb-3"
                                type="password"
                                id="InputPassword"
                                placeholder="Password"
                            />
                            <input
                                className="btn btn-outline-info my-2 my-sm-0 btn-block"
                                value="Registrar Usuario"
                                type="submit"
                            />
                        </div>
                    </div>
                </form>
                <button
                    onClick={loginUsuario}
                    className="btn btn-block btn-success">Iniciar Sesión
                </button>
                {
                    msgError !== null ? (
                        <div className='mt-2 alert alert-danger'>{msgError}</div>
                    ) : (
                        <span></span>
                    )
                }
            </div>
            <div className="col"></div>

        </div>
    )
}

export default Login
