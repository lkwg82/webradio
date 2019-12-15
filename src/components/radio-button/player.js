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
      streamUrl: ''
    };
  }

  render() {
    const playRadioStream = this.playRadioStream.bind(this);

    return (
      <div className="all-container">
        <Fragment>
          <Favorites playRadioStream={playRadioStream} />
          <AudioDeck streamUrl={this.state.streamUrl} />
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