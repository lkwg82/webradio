import React, {Fragment} from 'react';
import {OfflineHint} from './offline-hint';
import {Favorites} from './favorites';
import {OfflineReconnector} from './offline-reconnector';
import {AudioDeck} from './AudioDeck';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

import {SpotifyPanel} from './SpotifyPanel';
import {GoogleAnalytics} from '../../utils/google-analytics';
import {SpotifyWebsocket} from './SpotifyWebsocket';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBroadcastTower} from '@fortawesome/free-solid-svg-icons';
import {faSpotify} from '@fortawesome/free-brands-svg-icons';

export const ModeButton = styled(Button)`
  border-radius: 50% !important;
  font-size: 50px !important;
  position: fixed;
  bottom: 5%;
  background-color: unset !important;
  border-width: 0 !important;
  width:100px;
  overflow:hidden;
  left: 80%;
`;

class SpotifyPlayDetector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            websocket: null
        }
    }

    componentDidMount() {
        const timer = setInterval(() => this.initConnection(), 1000)
        this.setState({timer: timer})
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    render() {
        return "";
    }

    initConnection() {
        if (this.state.websocket !== null) {
            console.debug("websocket connected")
            return
        }
        const ws = new SpotifyWebsocket();
        this.setState({websocket: ws})
        ws.onclose = () => {
            console.debug("ws closed")
            this.setState({websocket: null})
        };
        ws.onerror = () => {
            console.debug("ws errored")
            this.setState({websocket: null})
        };
        ws.onPlaybackResumed = () => {
            console.log("need to switch");
            this.props.showSpotify();
        };
    }
}

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.offlineReconnector = new OfflineReconnector();
        this.analytics = new GoogleAnalytics();
        this.state = {
            streamUrl: '',
            stationInfo: {name: '', id: -1, url: ''},
            showSpotify: false,
        };

    }

    render() {
        const playRadioStream = this.playRadioStream.bind(this);
        const toggle = this.toggle.bind(this);

        return (
            <div className="all-container">
                {this.state.showSpotify ?
                    <SpotifyPanel/>
                    :
                    <Fragment>
                        <Favorites playRadioStream={playRadioStream}/>
                        <AudioDeck stationInfo={this.state.stationInfo}/>
                    </Fragment>
                }
                <OfflineHint/>
                <SpotifyPlayDetector showSpotify={() => {
                    this.setState({showSpotify: true});
                }}/>
                {
                    this.state.showSpotify ?
                        <ModeButton size="lg" onClick={toggle}>
                            <FontAwesomeIcon icon={faBroadcastTower}/>
                        </ModeButton>
                        :
                        <ModeButton size="lg" onClick={toggle}>
                            <FontAwesomeIcon icon={faSpotify}/>
                        </ModeButton>
                }
            </div>
        );
    }

    playRadioStream(stationInfo) {
        console.debug("play " + JSON.stringify(stationInfo));
        this.analytics.eventStationSelection(stationInfo.name);
        this.setState({stationInfo: stationInfo});
    }

    toggle() {
        this.setState({showSpotify: !this.state.showSpotify});
    }
}

export default Player;