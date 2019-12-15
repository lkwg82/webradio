import React from 'react';
import ReactPlayer from 'react-audio-player';
import styled from 'styled-components';

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
            stationname: 'radio',
        };
    }
    render() {
        return (<div className="audioDeck">
            <div>
                <Status>{this.state.status}</Status>
                <span>{this.props.streamUrl}</span>
            </div>
            <ReactPlayer src={this.props.streamUrl} autoPlay onError={(e) => { console.debug(e); this.setState({ status: 'error' }); }} onCanPlay={() => this.setState({ status: 'connecting' })} onCanPlayThrough={() => this.setState({ status: 'playing' })} onAbort={() => this.setState({ status: 'stopped' })} onSeeked={() => this.setState({ status: 'onSeeked' })} onPause={() => this.setState({ status: 'paused' })} />
        </div>);
    }
}
