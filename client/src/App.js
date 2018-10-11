import React, { Component } from 'react';
import './App.css';
import ShowImage from './Components/ShowImage';
import { Link, Route } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div className="App">

        <div>
          <form method="POST" action="http://167.99.215.18:4000/addimage" encType="multipart/form-data">
            <input type="test" name="titre" placeholder="titre"></input>
            <input type="number" name="year" placeholder="year"></input>
            <input type="file" name="img" placeholder="télécharger img"></input>
            <button type="submit">Ajouter</button>
          </form>
        </div>

        <div>
          <Link to='/images'>
                <span>
                Voir les images
                </span>
          </Link>
          <Route path='/images' component={ ShowImage }/>
        </div>
      </div>
    )
  }
}

export default App;
