import Button from 'react-bootstrap/Button';
import React from 'react';
import styled from 'styled-components';
import 'react-simple-keyboard/build/css/index.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Keyboard from 'react-simple-keyboard';
import { StationButton } from '../radio-button/station-button';
import { InformationService } from '../radio-button/information-service';

const StyledKeyboard = styled.div`
  position: fixed;
  bottom:0;
  left:0;
  width:100%;
  padding:10px;
`;

const SearchContainer = styled.div``;

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
    this.settings = props.settings;
    this.state = {
      input: '',
    };
  }

  // componentDidMount() {
  //   this.state.input = 'rs';
  //   setTimeout(() => this.onKeyPress('2'), 500);
  // }

  onKeyPress(button) {
    console.log("Button pressed", button);
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
      console.log("search for " + this.state.input);
      this.informationService.stationQuery(input)
        .then(results => {
          console.log(results);

          const buttons = results.slice(0, 6).map(result => {
            const key = 'result_' + result.id;
            console.log(result);
            const handler = () => {
              console.log(result.id);
              this.settings.addFavorite(result.id);
              this.settings.saveActiveRadioId(result.id);
              this.props.toggle();
            };

            return <StationButton
              informationService={this.informationService}
              key={key}
              active={false}
              stationId={result.id}
              onClick={handler} />;
          });
          this.setState({ results: buttons });
        });
    }
    else {
      console.log(this.state.input.length);
    }
  }

  render() {
    return <SearchContainer>
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
    </SearchContainer>;
  }
}

const AddButton = styled(Button)`
  border-radius: 50% !important;
  font-size: 30px
  position: fixed;
  left: 90%;
  bottom: 10%; 
`;
export function SearchPanelToggleButton({ toggle }) {
  return <AddButton variant="light" size="lg" onClick={toggle}>+</AddButton>;
}
