import React from 'react';
import { StationButton } from './station-button';
import styled from 'styled-components';

const width = 30;
const Grid = styled.div`
    display: grid;
    grid-template-columns: ${width}vW ${width}vW ${width}vW;
    grid-gap: 10px;
    margin:10px;
    align-items: center;
    justify-content: center;
`;

export class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.settings = this.props.settings;
        this.informationService = this.props.informationService;
        this.state = {
            favorites: [],
            activeRadioId: -1,
        };
        this.isNew = true;
    }

    componentDidMount() {
        const activeRadioId = this.settings.getActiveRadioId();
        const ids = this.settings.getFavorites();

        if (activeRadioId > 0) {
            this.informationService.stationInfo(activeRadioId)
                .then(result => this.handleClick(result.url, activeRadioId));
        }
        this.setState({
            favorites: ids,
            activeRadioId: activeRadioId
        });
    }

    handleClick(url, stationId) {
        // let newFavorites = [stationId];
        // this.state.favorites
        //     .filter(id => id !== stationId)
        //     .map(id => newFavorites.push(id));
        this.settings.saveFavorites(this.state.favorites);

        this.settings.saveActiveRadioId(stationId);
        this.setState({
            //     // favorites: newFavorites,
            activeRadioId: stationId,
        });
        this.props.click(url);
    }

    render() {
        const handler = this.handleClick.bind(this);

        return (
            <Grid>
                {this.state.favorites.map((id, index) => (
                    <StationButton
                        key={index}
                        stationId={id}
                        activeId={this.state.activeRadioId}
                        informationService={this.informationService}
                        onClick={handler} />
                ))}
            </Grid>
        );
    }
}