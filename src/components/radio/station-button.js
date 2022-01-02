
import React from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { InformationService } from '../../utils/information-service';

const RadioButton = styled(Button)`
    background-image: url(${props => props.logo});
    background-size: contain;
    background-repeat: no-repeat;
    border-color: aliceblue;
    color: #0f0;
    height: 80px;
    padding-bottom: 2px;

    border-radius: 0 !important;
    font-size: 20px !important;
    font-weight: 400 !important;
    text-align: right;
    color: white !important;
    margin-top: 0 !important;
`;
const StationName = styled.div`
    padding-left: 80px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export class StationButton extends React.Component {
    constructor(props) {
        super(props);
        this.informationService = new InformationService();
        this.state = {
            'logo': '',
            'name': '',
            'url': ''
        };
    }

    componentDidMount() {
        const { stationId } = this.props;
        this.informationService.stationInfo(stationId)
            .then(result => {
                this.setState({
                    logo: result.logo,
                    name: result.name,
                    url: result.url,
                });
            });
    }

    handleTouchStart(e) {
        console.log("touch started");
        console.log(e);
    }

    render() {
        const { active, stationId, onClick } = this.props;
        const stationInfo = {
            id: stationId,
            name: this.state.name,
            url: this.state.url
        };
        const handleTouchStart = this.handleTouchStart.bind(this);

        return (
            <RadioButton
                onTouchStart={handleTouchStart}
                logo={this.state.logo}
                key={stationId}
                variant={active ? 'primary' : 'secondary'}
                onClick={() => onClick(stationInfo)}>
                <StationName>{this.state.name}</StationName>
            </RadioButton>
        );
    }
}