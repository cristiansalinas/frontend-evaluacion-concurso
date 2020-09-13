import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Button, Modal } from 'react-bootstrap';
import MarkDownViewer from '../MarkDownViewer';
import ReactAudioPlayer from 'react-audio-player'


const RenderModalBody = ({post}) => {
  if('Music' === post.node.Category){
    const file = process.env.GATSBY_API_URL+post.node.Song[0].url;

    return(
      <ReactAudioPlayer
        src={file}
        autoPlay
        controls
      />
    );
  }else {
    return (
      <MarkDownViewer content={post.node.Story} />
    );
  }

};

const PostRow = ({post }) =>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <tr>
        <td>{post.node.Title}</td>
        <td>NO</td>
        <td>
          <Button variant="primary" onClick={handleShow}>
            Evaluar
          </Button>
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{post.node.Title}</Modal.Title>
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
         {
           allStrapiContest {
            edges {
              node {
                Category
                Song {
                  url
                }
                Story
                Title
                strapiId
              }
            }
          }
         }
      `}
        render={data => (
          <div className="uk-section">
            <div className="uk-container uk-container-large">
              <FilterablePostTable posts={data.allStrapiContest.edges}/>
            </div>
          </div>
        )}
      />
    </>
  )
}

export default Dashboard