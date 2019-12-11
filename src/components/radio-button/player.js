import React from 'react';
import ReactPlayer from 'react-audio-player';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { Settings } from './settings.js';
import { OfflineHint } from './offline-hint';

const radios = {
  '104.6rtl': {
    'logo': 'logo_1046rtl.png',
    'url': 'https://sec-rtlberlin.hoerradar.de/rtlberlin-live-mp3-192',
  },
  '104.6rtl-christmas': {
    'logo': 'logo_1046rtl.png',
    'url': 'https://sec-rtlberlin.hoerradar.de/rtlberlin-event01-mp3-192',
    'hint': 'Weihnachtsradio'
  },
  'cosmo': {
    'logo': 'logo_cosmo.svg',
    'url': 'http://wdr-edge-200e.dus-lg.cdn.addradio.net/wdr/cosmo/live/mp3/128/stream.mp3?ar-distributor=f0a0',
  },
  'radioeins': {
    'logo': 'logo_radioeins.png',
    'url': 'http://radioeins.de/stream',
  },
};


function Radio({ name, active: activeRadio, onClick }) {
  const config = radios[name];
  // eslint-disable-next-line no-undef
  const imageName = require('./' + config.logo);
  const hint = config["hint"];

  const RadioButton = styled(Button)`
        background-image: url(${imageName});
        background-repeat: no-repeat; 
        background-position: center;
        border-color: aliceblue;
        
        color: #0f0;
        height: 80px;
        padding-bottom: 2px;

        font-size: 20px;
        font-weight: 600;
        text-align: right;
        color: black;
  `;

  const variant = activeRadio === name ? 'primary' : 'secondary';

  return <RadioButton block variant={variant} onClick={() => onClick(name)}>{(hint !== undefined) ? hint : ''}</RadioButton>;
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.settings = new Settings();
    this.state = {
      streamUrl: '',
      // eslint-disable-next-line no-undef
      activeRadio: this.settings.getActiveRadio()
    };
  }

  componentDidMount() {
    this.handleClick(this.state.activeRadio);
  }

  render() {
    const radioElements = this.generateRadioEntries();
    return (
      <div className="container">
        <figure>
          {radioElements}
        </figure>
        <ReactPlayer
          src={this.state.streamUrl}
          ref={(element) => { this.rap = element; }}
          autoPlay
          controls
          onError={(e) => console.debug("error" + e)}
          onPlay={() => console.debug("play")}
          onPause={() => console.debug("paused")}
        />
        <OfflineHint />
      </div>
    );
  }

  generateRadioEntries() {
    return Object.keys(radios).map((name) => {
      return <Radio key={name} name={name} active={this.state.activeRadio} onClick={(i) => this.handleClick(i)} />;
    });
  }

  handleClick(playRadio) {
    // eslint-disable-next-line no-undef
    console.debug("play " + playRadio);
    const url = hasOwnProperty.call(radios, playRadio) ? radios[playRadio].url : '';
    this.setState({
      streamUrl: url,
      activeRadio: playRadio,
    });
    this.settings.saveActiveRadio(playRadio);
  }
}

export default Player;
