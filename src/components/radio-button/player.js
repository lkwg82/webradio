import React, { Fragment } from 'react';
import ReactPlayer from 'react-audio-player';
import { OfflineHint } from './offline-hint';
import { Favorites } from './favorites';
import { OfflineReconnector } from './offline-reconnector';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.offlineReconnector = new OfflineReconnector();
    this.state = {
      streamUrl: ''
    };
  }

  render() {
    const playRadioStream = this.playRadioStream.bind(this);
    return (
      <div className="all-container">
        <Fragment>
          <Favorites
            informationService={this.informationService}
            playRadioStream={playRadioStream}>
          </Favorites>
          <ReactPlayer
            src={this.state.streamUrl}
            autoPlay
            controls
            onError={(e) => console.debug("error:" + JSON.stringify(e))}
            onPlay={() => console.debug("playing " + this.state.streamUrl)}
            onPause={() => console.debug("paused")}
          />
        </Fragment>
        <OfflineHint />
      </div>
    );
  }

  playRadioStream(url) {
    console.debug("play " + url);
    this.setState({ streamUrl: url });
  }
}

export default Player;