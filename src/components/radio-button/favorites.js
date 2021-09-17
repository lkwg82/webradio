import React from 'react';
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
    
    setPreviouslySelectedStation(station){
        this.informationService
                    .stationInfo(station)
                    .then(result => {
                        const stationInfo = {
                            name: result.name,
                            url: result.url,
                            id: station
                        };
                        this.handleClick(stationInfo);
                    });
    }
    
    componentDidMount() {
        const activeRadioId = this.settings.getActiveRadioId();
        if (activeRadioId) {
            setPreviouslySelectedStation(activeRadioId)
        }

        this.setState({
            favorites: this.settings.getFavorites()
        });
    }

    handleClick(stationInfo) {
        console.debug("play " + JSON.stringify(stationInfo));
        this.settings.saveFavorites(this.state.favorites);
        this.settings.saveActiveRadioId(stationInfo.id);
        this.setState({
            activeRadioId: stationInfo.id,
        });
        this.props.playRadioStream(stationInfo);
    }

    addStation(stationInfo) {
        this.handleClick(stationInfo);
        this.settings.addFavorite(stationInfo.id);
        const newFavorites = this.settings.getFavorites();
        this.setState({ favorites: newFavorites });
    }

    render() {
        const handler = this.handleClick.bind(this);
        const toggleSearch = () => this.setState({ showSearch: !this.state.showSearch });
        const addStation = this.addStation.bind(this);

        return (
            <div className="favorites" >
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
            </div>
        );
    }
}
