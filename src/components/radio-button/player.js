import React from 'react';


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
}

function Radio(props) {
  const config = radios[props.name];
  const imageName = require('./' + config.logo);

  return (<figure>
    <button
      type="button"
      className="btn btn-light btn-lg btn-block"
      onClick={() => props.onClick(config.url)}
    >

      <img src={imageName} alt="" />
    </button>
  </figure>
  );
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radios: Array(2).fill(null),
      streamUrl: ""
    };
  }

  handleClick(streamUrl) {
    console.debug("play " + streamUrl);
    this.setState({
      streamUrl: streamUrl,
    });
  }

  render() {
    return (
      <div className="container">
        <Radio name='radioeins' onClick={i => this.handleClick(i)} />
        <Radio name='104.6rtl' onClick={i => this.handleClick(i)} />
        <audio controls src={this.state.streamUrl} autoPlay/>
      </div>
    );
  }
}

export default Player
