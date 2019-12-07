import React from 'react';
import ReactPlayer from 'react-audio-player';
import styled from 'styled-components';

const radios = {
  '104.6rtl': {
    'logo': 'logo_1046rtl.png',
    'url': 'https://sec-rtlberlin.hoerradar.de/rtlberlin-live-mp3-192',
  },
  '104.6rtl-christmas': {
    'logo': 'logo_1046rtl.png',
    'url': 'https://sec-rtlberlin.hoerradar.de/rtlberlin-event01-mp3-192',
  },
  'radioeins': {
    'logo': 'logo_radioeins.png',
    'url': 'http://radioeins.de/stream',
  },
};

const Hint = styled.div`
  font-size: 20px;
  position: fixed;
  width: 100%;
  background-color: red;
  left: 0;
  bottom: 0;
`;

function AutoplayHint({ show }) {
  if (show) {
    return <Hint>
      can not autplay, see&nbsp;
    <a href="https://developers.google.com/web/updates/2017/09/autoplay-policy-changes##new-behaviors" target="new-window">explanation</a>
    </Hint >;
  }
  return "";
}

function Radio({ name, active: activeRadio, onClick }) {
  const config = radios[name];
  // eslint-disable-next-line no-undef
  const imageName = require('./' + config.logo);

  const Button = styled.button`
        background-image: url(${imageName});
        background-repeat: no-repeat; 
        background-position: center;
        border-color: aliceblue;
        
        color: #0f0;
        height: 80px;
        padding-bottom: 2px;
  `;

  let className = 'btn btn-lg btn-block ';
  className += activeRadio === name ? 'btn-primary' : 'btn-secondary';

  return (<Button type="button" className={className} onClick={() => onClick(name)} />);
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
