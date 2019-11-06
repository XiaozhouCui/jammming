import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props)

    this.state = {
         
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{/* <!-- track name will go here --> */}</h3>
          <p>{/* <!-- track artist will go here--> | <!-- track album will go here --> */}</p>
        </div>
        <button className="Track-action">{/*<!-- + or - will go here -->*/}</button>
      </div>
    )
  }
}

export default Track;
