import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
         
    }
  }

  render() {
    console.log(this.props.tracks)
    return (
      <div className="TrackList">
        {
          this.props.tracks.map((track) => {
            return (
              <Track key={track.id} track={track}/>
            );
          })
        }
      </div>
    );
  }
}

export default TrackList;
