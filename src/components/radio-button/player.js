import React from 'react';
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


function Radio({ name, active, onClick }) {
  const config = radios[name];
  // eslint-disable-next-line no-undef
  const imageName = require('./' + config.logo);
  const Button = styled.button`
  background-image: url(${imageName});
  background-repeat: no-repeat; 
  background-position: center;
  background-color: beige;
  border-color: aliceblue;
  
  color: #0f0;
  height: 80px;
  padding-bottom: 2px;
  `;

  let className = 'btn btn-lg btn-block ';
  className += active ? 'btn-primary' : 'btn-secondary';

  return (<figure>
    <Button
      type="button"
      className={className}
      onClick={() => onClick(config.url, name)}
    />
  </figure>
  );
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radios: Object.keys(radios),
      streamUrl: '',
      activeRadio: '',
    };
  }

  render() {
    const radioElements = this.generateRadioEntries();
    return (
      <div className="container">
        {radioElements}
        <audio controls src={this.state.streamUrl} autoPlay />
      </div>
    );
  }

  generateRadioEntries() {
    return this.state.radios.map((name) => {
      return <Radio key={name} name={name} active={this.state.activeRadio} onClick={(i, x) => this.handleClick(i, x)} />;
    });
  }

  handleClick(streamUrl, playRadio) {
    // eslint-disable-next-line no-undef
    console.debug("play " + playRadio + " " + streamUrl);
    this.setState({
      streamUrl: streamUrl,
      activeRadio: playRadio,
    });
  }
}

export default Player;
