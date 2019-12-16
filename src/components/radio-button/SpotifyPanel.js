import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepForward, faPlay, faStepBackward, faPause, faPoo } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import styled from 'styled-components';

const Placeholder = styled.div`
    width:300px;
    min-height:300px;
    border: 1px solid white;

    font-size: 50px !important;
    margin:auto;

    display:flex;
    justify-content: center;
    align-items: center;
`;

export class SpotifyWebsocket extends WebSocket {
    constructor() {
        super("ws://localhost:24879/events");
        this.onopen = () => {
            console.log("opened");
        };
        this.onclose = () => {
            console.log("closed");
        };
        this.onmessage = (msg) => {
            console.log("message received: " + msg);

            const data = msg.data;
            const json = JSON.parse(data);
            switch (json.event) {
                case 'playbackResumed':
                    this.onPlaybackPaused();
                    break;
                case 'playbackPaused':
                    this.onPlaybackPaused();
                    break;
                default:
                    console.log("unmatched event: " + json.event);
            }
            this.onAnyEvent();
        };
        this.onerror = () => {
            console.log("error ");
        };

        this.onPlaybackResumed = () => {
            console.log("playback resumed ");
        };

        this.onPlaybackPaused = () => {
            console.log("playback paused");
        };

        this.onAnyEvent = (event) => {
            console.log("event: " + event);
        };
    }
}

export class SpotifyPanel extends React.Component {
    constructor(props) {
        super(props);
        this.baseImageUrl = 'https://i.scdn.co/image/';
        this.SpotifyApiClient = new SpotifyApiClient();
        this.state = {
            artist: '',
            title: '',
            imageFileId: '',
            isPaused: false,
            operationInProgress: true
        };
    }

    componentDidMount() {
        this.initConnection();
    }

    initConnection() {
        const ws = new SpotifyWebsocket();
        ws.onopen = () => {
            console.log("opened");
            this.play();
            this.updateCurrent();
            this.setState({ operationInProgress: false });
        };

        ws.onAnyEvent = () => {
            this.updateCurrent();
            this.setState({ operationInProgress: false });
        };

        ws.onPlaybackResumed = () => {
            this.setState({ isPaused: false, operationInProgress: false });
        };
        ws.onPlaybackPaused = () => {
            this.setState({ isPaused: true, operationInProgress: false });
        };

        ws.onerror = (e) => {
            console.log(e);
            this.setState({ operationInProgress: true });
            setTimeout(() => this.initConnection(), 1000);
        };

        ws.onclose = () => {
            console.log("closed");
            this.setState({
                operationInProgress: true,
                imageFileId: ''
            });
            setTimeout(() => this.initConnection(), 1000);
        };
    }

    componentWillUnmount() {
        console.log("will pause spotify");
        this.pause();
    }

    updateCurrent() {
        const baseUrl = 'http://localhost:24879';
        fetch(baseUrl + '/player/current', { method: 'POST' })
            .then(response => {
                console.log(response);
                if (response.status === 500) {
                    setTimeout(() => this.updateCurrent(), 1000);
                    return "try again";
                }
                return response.json();
            })
            .then(json => {
                if ("try again" === json) {
                    return;
                }
                console.log(json);
                const fileIdCover = json.album.coverGroup.image[0].fileId;
                const name = json.name;
                const artist = json.artist.map(a => a.name).join(' & ');
                this.setState({
                    imageFileId: fileIdCover.toLowerCase(),
                    title: name,
                    artist: artist
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (<div>
            {this.state.imageFileId === '' ?
                <Placeholder>
                    <FontAwesomeIcon icon={faPoo} />
                </Placeholder>
                :
                <img
                    src={this.baseImageUrl + this.state.imageFileId}
                    alt="placeholder"
                    width={300}
                    height={300}
                />
            }
            <p />
            <span>{this.state.title}</span> - <span>{this.state.artist}</span>
            <p />
            <ButtonGroup>
                <Button size="lg" onClick={() => this.stepBack()} disabled={this.state.operationInProgress}>
                    <FontAwesomeIcon icon={faStepBackward} />
                </Button>
                {
                    this.state.isPaused ?
                        <Button onClick={() => this.play()} disabled={this.state.operationInProgress}>
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                        :
                        <Button onClick={() => this.pause()} disabled={this.state.operationInProgress}>
                            <FontAwesomeIcon icon={faPause} />
                        </Button>
                }
                <Button onClick={() => this.stepForward()} disabled={this.state.operationInProgress}>
                    <FontAwesomeIcon icon={faStepForward} />
                </Button>
            </ButtonGroup>
        </div>);
    }

    stepBack() {
        this.setState({ operationInProgress: true });
        this.SpotifyApiClient.stepBack()
            .then(() => this.updateCurrent());
    }

    stepForward() {
        this.setState({ operationInProgress: true });
        this.SpotifyApiClient.stepForward()
            .then(() => this.updateCurrent());
    }

    play() {
        this.setState({ operationInProgress: true });
        this.SpotifyApiClient.play()
            .then(() => this.updateCurrent());
    }
    pause() {
        this.setState({ operationInProgress: true });
        this.SpotifyApiClient.pause()
            .then(() => this.updateCurrent());
    }
}

class SpotifyApiClient {
    constructor() {
        this.baseUrl = 'http://localhost:24879';
    }

    stepBack() {
        return this.doActionOrRetry('/player/prev');
    }

    stepForward() {
        return this.doActionOrRetry('/player/next');
    }

    play() {
        return this.doActionOrRetry('/player/resume');
    }

    pause() {
        return this.doActionOrRetry('/player/pause');
    }

    doActionOrRetry(path) {
        return this.post(path).then(response => {
            console.log('invoking ' + path);
            if (response.status === 500) {
                console.log(response);
                setTimeout(() => this.doActionOrRetry(path), 300);
            }
            return response;
        });
    }

    post(path) {
        return fetch(this.baseUrl + path, { method: 'POST' });
    }
}
