import React from 'react';
import ReactPlayer from 'react-audio-player';
import styled from 'styled-components';
import { InformationService } from "../../utils/information-service";

export const Status = styled.div`
  width: 100px;
  padding-left: 10px;
  padding-right: 20px;
  display: inline;
`;

export class AudioDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'UNKNOWN',
        };
    }

    render() {
        const { name, url, id } = this.props.stationInfo;

        return (<div className="audioDeck">
            <div>
                <NowPlaying stationId={id} />
                <div>
                    <Status>{this.state.status}</Status>
                    <span>{name}</span>
                </div>
            </div>
            <ReactPlayer
                src={url}
                autoPlay
                onError={(e) => {
                    console.debug(e);
                    this.setState({ status: 'error' });
                }}
                onCanPlay={() => this.setState({ status: 'connecting' })}
                onCanPlayThrough={() => this.setState({ status: 'playing' })}
                onAbort={() => this.setState({ status: 'stopped' })}
                onSeeked={() => this.setState({ status: 'onSeeked' })}
                onPause={() => this.setState({ status: 'paused' })} />
        </div>);
    }
}


class NowPlaying extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "retrieving"
        };
        this.informationService = new InformationService();
    }

    componentDidMount() {
        this.updateTitle(this.props.stationId);
        this.setState({
            timer: setInterval(() => {
                this.updateTitle(this.props.stationId);
            }, 3000)
        });
    }
    updateTitle(stationId) {
        this.informationService
            .nowplaying(stationId)
            .then(result => {
                const title = result.title === "<emptyTitle>" ? '' : result.title;
                this.setState({ title: title });
            });
    }

    componentWillUnmount() {
        console.log("clear timer");
        clearInterval(this.state.timer);
    }

    render() {
        return (<div className="song">{this.state.title}</div>);
    }
}
