import React, { Fragment } from 'react';
import ReactPlayer from 'react-audio-player';
import { OfflineHint } from './offline-hint';
import { Favorites } from './favorites';
import { OfflineReconnector } from './offline-reconnector';
import styled from 'styled-components';

const Status = styled.div`
  width: 100px;
  padding-left: 10px;
  padding-right: 20px;
  display: inline;
`;

class AudioDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'UNKNOWN',
      stationname: 'radio',
    };
  }

  render() {
    return (
      <div className="audioDeck">
        <div>
          <Status>{this.state.status}</Status>
          <span>{this.props.streamUrl}</span>
        </div>
        <ReactPlayer
          src={this.props.streamUrl}
          autoPlay
          onError={(e) => { console.debug(e); this.setState({ status: 'error' }); }}
          onCanPlay={() => this.setState({ status: 'connecting' })}
          onCanPlayThrough={() => this.setState({ status: 'playing' })}
          onAbort={() => this.setState({ status: 'stopped' })}
          onSeeked={() => this.setState({ status: 'onSeeked' })}
          onPause={() => this.setState({ status: 'paused' })}
        />
      </div>
    );
  }
}

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

    // this.audioDeck.playRadioStream(url);
  }
}

export default Player;