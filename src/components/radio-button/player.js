import React from 'react';
import ReactPlayer from 'react-audio-player';
import { Settings } from './settings';
import { OfflineHint } from './offline-hint';
import { Favorites } from './favorites';


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
      streamUrl: ''
    };
  }

  render() {
    return (
      <div className="container">
        <Favorites
          settings={this.settings}
          informationService={this.informationService}
          click={(i, j) => this.handleClick(i, j)} />
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
