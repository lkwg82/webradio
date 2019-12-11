import React from 'react';
import ReactPlayer from 'react-audio-player';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { Settings } from './settings.js';
import { OfflineHint } from './offline-hint';

const radios = {
  '104.6rtl': {
    'id': 9013
  },
  '104.6rtl-christmas': {
    'id': 9437
  },
  'cosmo': {
    'id': 2459
  },
  'radioeins': {
    'id': 2261
  },
};

class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'logo': '',
      'name': '',
      'url': ''
    };
  }

  componentDidMount() {
    const { stationId, informationService } = this.props;
    informationService.stationInfo(stationId)
      .then(result => {
        console.debug(result);
        this.setState({
          'logo': result.logo,
          'name': result.name,
          'url': result.url,
        });
      });
  }

  render() {
    const RadioButton = styled(Button)`
      background-image: url(${this.state.logo});
      background-size: contain;
      background-repeat: no-repeat; 
      border-color: aliceblue;
      
      color: #0f0;
      height: 80px;
      padding-bottom: 2px;
      
      font-size: 20px;
      font-weight: 600;
      text-align: right;
      color: black;
    `;

    const { active, stationId, onClick } = this.props;

    return <RadioButton
      block
      variant={active ? 'primary' : 'secondary'}
      onClick={() => onClick(this.state.url, stationId)}>
      {this.state.name}
    </RadioButton>;
  }
}

class InformationService {
  constructor() {
    this.baseUrl = 'https://api-webradio.lgohlke.de/';
  }

  stationInfo(stationId) {
    const url = this.baseUrl + 'stationInfo?stationId=' + stationId;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        return {
          'logo': json['logo300x300'],
          'name': json.name,
          'url': json.streamUrls.slice(0, 1)[0].streamUrl
        };
      });
  }
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.settings = new Settings();
    this.informationService = new InformationService();
    this.state = {
      streamUrl: '',
      activeRadioId: this.settings.getActiveRadioId(),
    };
  }

  componentDidMount() {
    const stationId = this.state.activeRadioId;
    this.informationService.stationInfo(stationId)
      .then(result => this.handleClick(result.url, stationId));
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
          onError={(e) => console.debug("error:" + JSON.stringify(e))}
          onPlay={() => console.debug("play")}
          onPause={() => console.debug("paused")}
        />
        <OfflineHint />
      </div>
    );
  }

  generateRadioEntries() {
    console.debug(this.state);
    const ids = Object.values(radios).map(v => v.id);
    this.settings.saveFavorites(ids);

    return this.settings.getFavorites().map(id => {
      return <Radio
        key={id}
        stationId={id}
        active={id === Number.parseInt(this.state.activeRadioId)}
        informationService={this.informationService}
        onClick={(i, j) => this.handleClick(i, j)} />;
    });
  }

  handleClick(url, playRadioId) {
    console.debug("play " + url);
    console.debug("play " + playRadioId);
    this.setState({
      streamUrl: url,
      activeRadioId: playRadioId,
    });
    this.settings.saveActiveRadioId(playRadioId);
  }
}

export default Player;
