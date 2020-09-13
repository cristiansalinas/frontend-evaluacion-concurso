import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Button, Modal } from 'react-bootstrap';
import MarkDownViewer from '../MarkDownViewer';
import ReactAudioPlayer from 'react-audio-player';
import StarRatingComponent from 'react-star-rating-component';



const RenderModalBody = ({post}) => {
  const [ratingLiterature, setRatingLiterature] = useState(0);
  const [ratingMusic, setRatingMusic] = useState({
    rateMusic1: 0,
    rateMusic2: 0,
    rateMusic3: 0,
    rateMusic4: 0,
    rateMusic5: 0,
    rateMusic6: 0,
    rateMusic7: 0,
    rateMusic8: 0,
  });


  const onLiteratureStarClick = (nextValue, prevValue, name)  => {
    setRatingLiterature(nextValue);
  }
  const onMusicStarClick = (nextValue, prevValue, name)  => {
    const rating = ratingMusic;
    rating[name] = nextValue;
    setRatingMusic({...rating});
  }

  if('musica' === post.node.category){
    const file = process.env.GATSBY_API_URL+post.node.Song[0].url;

    return(
      <div>
      <ReactAudioPlayer
        src={file}
        autoPlay
        controls
      />
      <h2>Califique Este Trabajo</h2>
        <table>
          <thead>
          <tr>
            <th>Criterio</th>
            <th>Evaluación</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Técnica Vocal</td>
            <td>
              <StarRatingComponent
                name="rateMusic1"
                starCount={5}
                value={ratingMusic.rateMusic1}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          <tr>
            <td>Técnica Instrumental</td>
            <td>
              <StarRatingComponent
                name="rateMusic2"
                starCount={5}
                value={ratingMusic.rateMusic2}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          <tr>
            <td>Producción</td>
            <td>
              <StarRatingComponent
                name="rateMusic3"
                starCount={5}
                value={ratingMusic.rateMusic3}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          <tr>
            <td>Arreglo</td>
            <td>
              <StarRatingComponent
                name="rateMusic4"
                starCount={5}
                value={ratingMusic.rateMusic4}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          <tr>
            <td>Letra</td>
            <td>
              <StarRatingComponent
                name="rateMusic5"
                starCount={5}
                value={ratingMusic.rateMusic5}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          <tr>
            <td>Interpretación</td>
            <td>
              <StarRatingComponent
                name="rateMusic6"
                starCount={5}
                value={ratingMusic.rateMusic6}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          <tr>
            <td>Estructura</td>
            <td>
              <StarRatingComponent
                name="rateMusic7"
                starCount={5}
                value={ratingMusic.rateMusic7}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          <tr>
            <td>Originalidad</td>
            <td>
              <StarRatingComponent
                name="rateMusic8"
                starCount={5}
                value={ratingMusic.rateMusic8}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }else {
    return (
      <div>
        <MarkDownViewer content={post.node.content} />
        <h2>Califique Este Trabajo</h2>
        <StarRatingComponent
          name="rateLiterature"
          starCount={4}
          value={ratingLiterature}
          onStarClick={onLiteratureStarClick}
        />
      </div>
    );
  }

};

const PostRow = ({post }) =>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <tr>
        <td>{post.node.title}</td>
        <td>NO</td>
        <td>
          <Button variant="primary" onClick={handleShow}>
            Evaluar
          </Button>
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{post.node.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <RenderModalBody post={post} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>
        </td>
      </tr>
    );

}

class PostTable extends React.Component {
  render() {
    const rows = [];

    this.props.posts.forEach((post) => {
      rows.push(
        <PostRow
          key={post.node.strapiId}
          post={post} />
      );
    });

    return (
      <table>
        <thead>
        <tr>
          <th>Título</th>
          <th>Evaluado</th>
          <th></th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Buscar..." />
      </form>
    );
  }
}

class FilterablePostTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <PostTable posts={this.props.posts} />
      </div>
    );
  }
}



const Dashboard = ({ children }) => {

  return (
    <>
      <h1>Listado</h1>
      <p>Listado de trabajos en competencia</p>
      <StaticQuery
        query={graphql`
         query AllStrapiPost {
          allStrapiPost {
            edges {
              node {
                category
                content
                strapiId
                title
              }
            }
          }
        }

      `}
        render={data => (
          <div className="uk-section">
            <div className="uk-container uk-container-large">
              <FilterablePostTable posts={data.allStrapiPost.edges}/>
            </div>
          </div>
        )}
      />
    </>
  )
}

export default Dashboard