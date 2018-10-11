import React, {Component} from 'react';
import axios from 'axios';

class ShowImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
  }

  fetchImages = () => {
    fetch('http://localhost:4000/showimage')
    .then(res => res.json())//promesse avec fonction callback
    .then(body => {
      this.setState({
        images: body
      })
    })
    .catch(err => { throw err})
  }

  componentDidMount(){
    this.fetchImages()
  }

  render(){
    console.log(this.state)

    const renderImages =
          <div>
            {this.state.images.map(x =>
              <div>
                <p>{x.titre}</p>
                <p>{x.year}</p>
                <img src={`uploads/${x.img}`} alt='img'/>
              </div>
            )
          }
          </div>

    return (
      <div>
        Voici les images
        {renderImages}
      </div>
    )
  }
}

export default ShowImage;
