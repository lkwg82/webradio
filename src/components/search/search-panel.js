import Button from 'react-bootstrap/Button';
import React from 'react';
import styled from 'styled-components';
import 'react-simple-keyboard/build/css/index.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Keyboard from 'react-simple-keyboard';
import { StationButton } from '../radio-button/station-button';
import { InformationService } from '../../utils/information-service';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const StyledKeyboard = styled.div`
  position: fixed;
  bottom:0;
  left:0;
  width:100%;
  padding:10px;
`;

const SearchContainer = styled.div`
  background-color: black;
  z-index: 1;

  left:0;
  top:0;
  position: fixed;

  width:100%;
  height: 100%;
`;

const Results = styled.div`
  height: 50vh;
  display: grid;
  grid-template-columns: 40vW 40vW;
  grid-gap: 10px;
  align-items: center;
  justify-content: center;
`;

export class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.informationService = new InformationService();
    this.state = {
      input: '',
    };
  }

  // componentDidMount() {
  //   this.state.input = 'rs';
  //   setTimeout(() => this.onKeyPress('2'), 500);
  // }

  onKeyPress(button) {
    const input = this.state.input;

    switch (button) {
      case 'DEL':
        this.setState({ input: input.substring(0, input.length - 1) });
        break;
      case 'ESC':
        this.setState({ input: '' });
        this.props.toggle();
        break;
      case '___':
        this.setState({ input: input + ' ' });
        break;
      default:
        this.setState({ input: input + button });
    }

    if (this.state.input.length > 2) {
      this.doSearch(this.state.input);
    }
  }

  doSearch(query) {
    console.log("search for " + query);
    this.informationService.stationQuery(query)
      .then(results => {
        console.log(results);

        const setOfFavorites = new Set(this.props.favorites);
        const buttons = results
          .filter(result => !setOfFavorites.has(result.id))
          .slice(0, 6).map(result => {
            const key = 'result_' + result.id;
            const handler = (stationInfo) => {
              this.props.addStation(stationInfo);
              this.props.toggle();
            };

            return <StationButton
              key={key}
              active={false}
              stationId={result.id}
              onClick={handler} />;
          });
        this.setState({ results: buttons });
      });
  }

  render() {
    return (
      <SearchContainer target={document.body}>
        <Results>
          {this.state.results ? this.state.results : 'Tippe mindestens drei Zeichen '}
        </Results>
        <StyledKeyboard>
          <InputGroup className="sm-1">
            <FormControl size="lg" placeholder="Suche" value={this.state.input} readOnly />
          </InputGroup>
          <Keyboard
            useButtonTag={true}
            useMouseEvents={true}
            useTouchEvents={false}
            onKeyPress={button => this.onKeyPress(button)}
            maxLength={10}
            layout={{
              'default': [
                'ESC 0 1 2 3 4 5 6 7 8 9 DEL',
                'q w e r t z u i o p',
                'a s d f g h j k l',
                'y x c v b n m ö ä ü ___',
              ],
            }}
          />
        </StyledKeyboard>
      </SearchContainer>);
  }
}

const SearchButton = styled(Button)`
  border-radius: 50% !important;
  font-size: 50px !important;
  position: fixed;
  bottom: 5%;
  background-color: unset !important;
  border-width: 0 !important;
  width:100px;import { Button } from 'react-bootstrap/Button';

  overflow:hidden;
  left: 90%;
`;

export function SearchPanelToggleButton({ toggle }) {
  return (
    <SearchButton size="lg" onClick={toggle}>
      <FontAwesomeIcon icon={faSearch} />
    </SearchButton>
  );
}
