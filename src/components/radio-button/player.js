import React from 'react';
import ReactPlayer from 'react-audio-player';
import { Settings } from './settings';
import { OfflineHint } from './offline-hint';
import { Favorites } from './favorites';
import { InformationService } from './information-service';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.settings = new Settings();
    this.informationService = new InformationService();
    this.state = {
      streamUrl: ''
    };
  }

  render() {
    return (
      <div className="container">
        <Favorites
          settings={this.settings}
          informationService={this.informationService}
          click={(i) => this.handleClick(i)} />
        <ReactPlayer
          src={this.state.streamUrl}
          ref={(element) => { this.rap = element; }}
          autoPlay
          controls
          onError={(e) => console.debug("error:" + JSON.stringify(e))}
          onPlay={() => console.debug("play")}
          onPause={() => console.debug("paused")}
        />
        <OfflineHint />
      </div>
    );
  }

  handleClick(url) {
    console.debug("play " + url);
    this.setState({
      streamUrl: url,
    });
  }
}

export default Player;