import React, { Fragment } from 'react';
import { OfflineHint } from './offline-hint';
import { Favorites } from './favorites';
import { OfflineReconnector } from './offline-reconnector';
import { AudioDeck } from './AudioDeck';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

import { SpotifyPanel } from './SpotifyPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

export const ModeButton = styled(Button)`
  border-radius: 50% !important;
  font-size: 50px !important;
  position: fixed;
  bottom: 5%;
  background-color: unset !important;
  border-width: 0 !important;
  width:100px;
  overflow:hidden;
`;

const ToggleSpotifyButton = styled(ModeButton)`
  left: 80%;
`;

class SpotifyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRadio: false
    };
  }
  render() {
    const toggle = () => {
      this.props.toggle();
      this.toggle();
    };

    return (
      <ToggleSpotifyButton size="lg" onClick={toggle}>
        {this.state.showRadio ?
          <FontAwesomeIcon icon={faSpotify} /> :
          <FontAwesomeIcon icon={faBroadcastTower} />
        }
      </ToggleSpotifyButton>
    );
  }

  toggle() {
    this.setState({ showRadio: !this.state.showRadio });
  }
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.offlineReconnector = new OfflineReconnector();
    this.state = {
      streamUrl: '',
      stationInfo: { name: '', id: -1, url: '' },
      showSpotify: false,
    };
  }

  render() {
    const playRadioStream = this.playRadioStream.bind(this);
    const toggle = this.toggle.bind(this);

    return (
      <div className="all-container">
        {this.state.showSpotify ?
          <SpotifyPanel />
          :
          <Fragment>
            <Favorites playRadioStream={playRadioStream} />
            <AudioDeck stationInfo={this.state.stationInfo} />
          </Fragment>
        }
        <OfflineHint />
        <SpotifyButton toggle={toggle} />
      </div>
    );
  }

  playRadioStream(stationInfo) {
    console.debug("play " + JSON.stringify(stationInfo));
    this.setState({ stationInfo: stationInfo });
  }

  toggle() {
    this.setState({ showSpotify: !this.state.showSpotify });
  }
}

export default Player;