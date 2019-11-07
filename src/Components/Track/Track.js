import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props)

    this.state = {
         
    }
  }

  isRemoval = true;

  renderAction() {
    if (this.isRemoval === true) {
      return '-';
    } else {
      return '+';
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist +  " | " + this.props.track.album}</p>
        </div>
        <button className="Track-action">{this.renderAction()}</button>
      </div>
    )
  }
}

export default Track;
