import React from "react"
import { Link } from "gatsby"
import Login from '../components/Login'

import Layout from "../components/layout"

const LoginPage = ({ location }) => {
  const { state: routeState } = location
  const redirect = !routeState
    ? '/app'
    : routeState.redirect === 'app'
      ? '/app'
      : `/app/${routeState.redirect}`

  return (
    <Layout>
      <h1>Acceso</h1>
      <p>Utilice sus credenciales para acceder</p>
      <div>
        <Login redirect={redirect} />
      </div>
      <Link to="/">Volver al inicio</Link>
    </Layout>
  )
}

export default LoginPage