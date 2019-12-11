import React from 'react';
import { StationButton } from './station-button';

export class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.settings = this.props.settings;
        this.informationService = this.props.informationService;
        this.state = {
            favorites: [],
            activeRadioId: -1,
        };
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
        let newFavorites = [stationId];
        this.state.favorites.filter(id => id !== stationId).map(id => newFavorites.push(id));
        this.settings.saveFavorites(newFavorites);
        this.setState({
            favorites: newFavorites,
            activeRadioId: stationId,
        });
        this.props.click(url, stationId);
    }

    render() {
        const radioElements = this.state.favorites.map(id => {
            return <StationButton
                key={id}
                stationId={id}
                active={id === this.state.activeRadioId}
                informationService={this.informationService}
                onClick={(i, j) => this.handleClick(i, j)} />;
        });
        return (<figure>{radioElements}</figure>);
    }
}