import React, { Fragment } from 'react';
import { OfflineHint } from './offline-hint';
import { Favorites } from './favorites';
import { OfflineReconnector } from './offline-reconnector';
import { AudioDeck } from './AudioDeck';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.offlineReconnector = new OfflineReconnector();
    this.state = {
      streamUrl: '',
      stationInfo: { name: '', id: -1, url: '' }
    };
  }

  render() {
    const playRadioStream = this.playRadioStream.bind(this);

    return (
      <div className="all-container">
        <Fragment>
          <Favorites playRadioStream={playRadioStream} />
          <AudioDeck stationInfo={this.state.stationInfo} />
        </Fragment>
        <OfflineHint />
      </div>
    );
  }

  playRadioStream(stationInfo) {
    console.debug("play " + JSON.stringify(stationInfo));
    this.setState({
      stationInfo: stationInfo
    });
  }
}

export default Player;