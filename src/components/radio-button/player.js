import React from 'react';
import ReactPlayer from 'react-audio-player';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';

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

function AutoplayHint({ show }) {
  if (show) {
    const Hint = styled.div`
      font-size: 20px;
      position: fixed;
      width: 100%;
      background-color: red;
      left: 0;
      bottom: 0;
    `;
    return <Hint>
      can not autoplay, see&nbsp;
    <a href="https://developers.google.com/web/updates/2017/09/autoplay-policy-changes##new-behaviors" target="new-window">explanation</a>
    </Hint >;
  }
  return "";
}

class OfflineHint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'offline': false
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    window.onoffline = () => this.setState({ offline: true });
    // eslint-disable-next-line no-undef
    window.ononline = () => this.setState({ offline: false });
  }

  render() {
    if (this.state.offline) {
      const Hint = styled(Alert)`
      font-size: 20px;
      position: fixed;
      width: 50%;
      left: 25%;
      bottom: 5%;
     `;
      return <Hint variant="info">
        <Spinner animation="border" role="status" />
        &nbsp;currently offline
    </Hint>;
    }
    return "";
  }
}

function Radio({ name, active: activeRadio, onClick }) {
  const config = radios[name];
  // eslint-disable-next-line no-undef
  const imageName = require('./' + config.logo);
  const hint = config["hint"];

  const Button2 = styled(Button)`
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

  return <Button2
    block
    variant={variant}
    onClick={() => onClick(name)}>
    {(hint !== undefined) ? hint : ''}
  </Button2>;
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamUrl: '',
      // eslint-disable-next-line no-undef
      activeRadio: localStorage.getItem("activeRadio"),
      showHintAutoplayPrevented: false,
    };
  }

  componentDidMount() {
    this.handleClick(this.state.activeRadio);

    const audio = this.rap.audioEl;
    const promise = audio.play();
    if (promise !== undefined) {
      promise.then(() => {
        // autoplay started
      }).catch(() => {
        this.setState({ showHintAutoplayPrevented: true });
      });
    }
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
        <AutoplayHint show={this.state.showHintAutoplayPrevented} />
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
    // eslint-disable-next-line no-undef
    localStorage.setItem("activeRadio", playRadio);
  }
}

export default Player;
