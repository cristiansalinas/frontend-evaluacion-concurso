import React, { useEffect, useState } from "react"
import { Button, Modal } from 'react-bootstrap';
import MarkDownViewer from '../MarkDownViewer';
import ReactAudioPlayer from 'react-audio-player';
import StarRatingComponent from 'react-star-rating-component';
import useAuth from "../../hooks/useAuth"


const getLiteraryReview = (id, post) => {
  for(let i = 0; i < post.literaryReviews.length; i++){
    if(post.literaryReviews[i].user.id === id) return post.literaryReviews[i];
  }
  return {};
}
const getMusicalReview = (id, post) => {
  for(let i = 0; i < post.musicalReviews.length; i++){
    if(post.musicalReviews[i].user.id === id) return post.musicalReviews[i];
  }
  return {};
}
const RenderModalBody = ({post, review, refresh}) => {
  console.log(review);
  const [ratingLiterature, setRatingLiterature] = useState(review.rating || 0);
  const [ratingMusic, setRatingMusic] = useState({
    rating1: review.rating1 || 0,
    rating2: review.rating2 || 0,
    rating3: review.rating3 || 0,
    rating4: review.rating4 || 0,
    rating5: review.rating5 || 0,
    rating6: review.rating6 || 0,
    rating7: review.rating7 || 0,
  });
  const { state } = useAuth();

  const onLiteratureStarClick = (nextValue, prevValue, name)  => {

    let path = process.env.GATSBY_API_URL + "/literary-reviews"
    let action = 'POST';
    let payload = {};
    if(Object.getOwnPropertyNames(review).length > 0){
      path = process.env.GATSBY_API_URL + "/literary-reviews/"+review.id;
      payload['rating'] = nextValue;
      action = 'PUT';
    }else{
      payload['user'] = state.user.id;
      payload['post'] = post.id;
      payload['rating'] = nextValue;
    }
    fetch(path, {
      method: action,
      body: JSON.stringify(payload), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => setRatingLiterature(nextValue));

  }
  const onMusicStarClick = (nextValue, prevValue, name)  => {
    const rating = ratingMusic;
    rating[name] = nextValue;

    let path = process.env.GATSBY_API_URL + "/musical-reviews"
    let action = 'POST';
    let payload = {};
    if(Object.getOwnPropertyNames(review).length > 0){
      path = process.env.GATSBY_API_URL + "/musical-reviews/"+review.id;
      payload[name] = nextValue;
      action = 'PUT';
    }else{
      payload['user'] = state.user.id;
      payload['post'] = post.id;
      payload[name] = nextValue;
    }
    fetch(path, {
      method: action,
      body: JSON.stringify(payload), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        refresh();
        setRatingMusic({...rating})
      });
  }


  if('musica' === post.category){
    const file = process.env.GATSBY_API_URL+post.music_url;

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
            <td>Técnica Vocal e Instrumental</td>
            <td>
              <StarRatingComponent
                name="rating1"
                starCount={5}
                value={ratingMusic.rating1}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          <tr>
            <td>Originalidad</td>
            <td>
              <StarRatingComponent
                name="rating2"
                starCount={5}
                value={ratingMusic.rating2}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          <tr>
            <td>Producción</td>
            <td>
              <StarRatingComponent
                name="rating3"
                starCount={5}
                value={ratingMusic.rating3}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          <tr>
            <td>Arreglo</td>
            <td>
              <StarRatingComponent
                name="rating4"
                starCount={5}
                value={ratingMusic.rating4}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>


          {post.instrumental == null &&
          <tr>
            <td>Letra</td>
            <td>
              <StarRatingComponent
                name="rating5"
                starCount={5}
                value={ratingMusic.rating5}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          }
          <tr>
            <td>Interpretación</td>
            <td>
              <StarRatingComponent
                name="rating6"
                starCount={5}
                value={ratingMusic.rating6}
                onStarClick={onMusicStarClick}
              />
            </td>
          </tr>
          <tr>
            <td>Estructura</td>
            <td>
              <StarRatingComponent
                name="rating7"
                starCount={5}
                value={ratingMusic.rating7}
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

        <MarkDownViewer content={post.content} />
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

const PostRow = ({post , refresh}) =>{

    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      refresh();
    }
    const handleShow = () => setShow(true);

    let review  = {};
    const { state } = useAuth()
    if(post.category === 'literatura') review = getLiteraryReview(state.user.id, post);
    else review = getMusicalReview(state.user.id, post);
    return (
      <tr>
        <td>{post.title}</td>
        <td>{Object.getOwnPropertyNames(review).length > 0?'SI': 'NO'}</td>
        <td>
          <Button variant="primary" onClick={handleShow}>
            Evaluar
          </Button>
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{post.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <RenderModalBody post={post} review={review} refresh={refresh} />
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
          refresh={this.props.refresh}
          key={post.id}
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


class FilterablePostTable extends React.Component {
  render() {
    return (
      <div>

        <PostTable posts={this.props.posts} refresh={this.props.refresh} />
      </div>
    );
  }
}



const Dashboard = ({ children }) => {

  const [posts, setPosts] = useState([]);
  const { state } = useAuth();
  let path = process.env.GATSBY_API_URL + "/posts"
  if(state && state.user.category === 'literatura') path = path + '?category=literatura';
  if(state && state.user.category === 'musica') path = path + '?category=musica';
  const fetchData = () => {
      fetch(path)
        .then(response => response.json()) // parse JSON from request
        .then(resultData => {
          setPosts(resultData);
        })
  }
  useEffect(() => fetchData() , []);

  return (
    <>
      <h1>Listado</h1>
      <p>Listado de trabajos en competencia</p>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <FilterablePostTable posts={posts} refresh={fetchData}/>
        </div>
      </div>
    </>
  )
}

export default Dashboard