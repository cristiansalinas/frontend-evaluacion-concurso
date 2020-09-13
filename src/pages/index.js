import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hola</h1>
    <p>Bienvenidos al sitio de la evaluación del concurso.</p>
    <p>Para acceder a las evaluaciones dar click abajo, en 'Acceder'.</p>

    <Link to="/app"><b>ACCEDER</b></Link>
  </Layout>
)

export default IndexPage
