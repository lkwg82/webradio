import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepForward, faPlay, faStepBackward, faPause } from '@fortawesome/free-solid-svg-icons';
export class SpotifyPanel extends React.Component {
    constructor(props) {
        super(props);
        this.baseImageUrl = 'https://i.scdn.co/image/';
        this.state = {
            artist: '',
            title: '',
            imageFileId: '',
        };
    }
    componentDidMount() {
        const ws = new WebSocket("ws://localhost:24879/events");
        ws.onopen = () => {
            console.log("opened");
        };
        ws.onmessage = (msg) => {
            const data = msg.data;
            console.log(data);
            this.updateCurrent();
        };
        this.updateCurrent();
        // setInterval(() => this.updateCurrent(), 1000);
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
                const artist = json.artist.map(a => a.name).join(',');
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
            <img src={this.baseImageUrl + this.state.imageFileId} alt="album art" />
            <p />
            <span>{this.state.title}</span> - <span>{this.state.artist}</span>
            <div>
                <FontAwesomeIcon icon={faStepBackward} />
                <FontAwesomeIcon icon={faPlay} />
                <FontAwesomeIcon icon={faPause} />
                <FontAwesomeIcon icon={faStepForward} />
            </div>
        </div>);
    }
}
