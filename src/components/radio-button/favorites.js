import React, { Fragment } from 'react';
import { StationButton } from './station-button';
import styled from 'styled-components';
import { SearchPanelToggleButton, SearchPanel } from '../search/search-panel';
import { Settings } from './settings';
import { InformationService } from '../../utils/information-service';

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
        this.settings = new Settings();
        this.informationService = new InformationService();

        this.state = {
            favorites: [],
            activeRadioId: -1,
            showSearch: false,
        };
    }

    componentDidMount() {
        const activeRadioId = this.settings.getActiveRadioId();
        if (activeRadioId > 0) {
            this.informationService
                .stationInfo(activeRadioId)
                .then(result => this.handleClick(result.url, activeRadioId));
        }

        this.setState({
            favorites: this.settings.getFavorites()
        });
    }

    handleClick(url, stationId) {
        console.debug("play " + url + " / stationId: " + stationId);
        this.settings.saveFavorites(this.state.favorites);
        this.settings.saveActiveRadioId(stationId);
        this.setState({
            activeRadioId: stationId,
        });
        this.props.playRadioStream(url);
    }

    addStation(url, stationId) {
        this.handleClick(url, stationId);
        this.settings.addFavorite(stationId);
        const newFavorites = this.settings.getFavorites();
        this.setState({ favorites: newFavorites });
    }

    render() {
        const handler = this.handleClick.bind(this);
        const toggleSearch = () => this.setState({ showSearch: !this.state.showSearch });
        const addStation = this.addStation.bind(this);

        return (
            <Fragment>
                <Grid>
                    {this.state.favorites.map(id => (
                        <StationButton
                            key={id}
                            stationId={id}
                            active={id === this.state.activeRadioId}
                            onClick={handler} />
                    ))}
                </Grid>
                {
                    this.state.showSearch &&
                    <SearchPanel
                        addStation={addStation}
                        favorites={this.state.favorites}
                        toggle={toggleSearch}
                    />
                }
                <SearchPanelToggleButton toggle={toggleSearch} />
            </Fragment>
        );
    }
}