import React from 'react'
import { StaticQuery, graphql } from "gatsby"

class PostRow extends React.Component {
  render() {
    const post = this.props.post;

    return (
      <tr>
        <td>{post.node.Title}</td>
        <td>NO</td>
        <td>Evaluar</td>
      </tr>
    );
  }
}

class PostTable extends React.Component {
  render() {
    const rows = [];

    this.props.posts.forEach((post) => {
      rows.push(
        <PostRow
          post={post}
          key={post.strapiID} />
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