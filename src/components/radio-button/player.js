import React from 'react';
import ReactPlayer from 'react-audio-player';
import { Settings } from './settings';
import { OfflineHint } from './offline-hint';
import { Favorites } from './favorites';
import { InformationService } from './information-service';
import { OfflineReconnector } from './offline-reconnector';
import { SearchPanelToggleButton, SearchPanel } from '../search/SearchPanelToggleButton';
import styled from 'styled-components';

const RadioPanel = styled.div``;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.settings = new Settings();
    this.informationService = new InformationService();
    this.offlineReconnector = new OfflineReconnector();

    this.state = {
      showRadioPanel: true,
      streamUrl: ''
    };
  }

  toggle() {
    this.setState({ showRadioPanel: !this.state.showRadioPanel });
  }

  render() {
    const toggle = this.toggle.bind(this);
    const clickHandler = this.handleClick.bind(this);
    return (
      <div className="all-container">
        {
          this.state.showRadioPanel ?
            <RadioPanel>
              <Favorites
                settings={this.settings}
                informationService={this.informationService}
                click={clickHandler} />
              <ReactPlayer
                src={this.state.streamUrl}
                ref={(element) => { this.rap = element; }}
                autoPlay
                controls
                onError={(e) => console.debug("error:" + JSON.stringify(e))}
                onPlay={() => console.debug("playing " + this.state.streamUrl)}
                onPause={() => console.debug("paused")}
              />
              <SearchPanelToggleButton toggle={toggle} />
            </RadioPanel>
            :
            <SearchPanel settings={this.settings} toggle={toggle} />
        }
        <OfflineHint />
      </div>
    );
  }

  handleClick(url) {
    console.debug("play " + url);
    this.setState({ streamUrl: url });
  }
}

export default Player;