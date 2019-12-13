
import React from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

export class StationButton extends React.Component {
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

        const { active, stationId, onClick } = this.props;
        return <RadioButton
            key={stationId}
            block
            variant={active ? 'primary' : 'secondary'}
            onClick={() => onClick(this.state.url, stationId)}
            size="lg">
            <StationName>{this.state.name}</StationName>
        </RadioButton>;
    }
}