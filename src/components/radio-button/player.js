import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import React from 'react';
import ReactPlayer from 'react-audio-player';
import { Settings } from './settings';
import { OfflineHint } from './offline-hint';
import { Favorites } from './favorites';
import { InformationService } from './information-service';
import { OfflineReconnector } from './offline-reconnector';
import styled from 'styled-components';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';


function SearchPanelToggleButton({ toggle }) {
  const AddButton = styled(Button)`
    border-radius: 50% !important;
    font-size: 30px
    position: fixed;
    left: 90%;
    bottom: 10%; 
  `;
  return <AddButton
    variant="light"
    size="lg"
    onClick={toggle}>+</AddButton>;
}

class SearchPanel extends React.Component {
  constructor() {
    super();
    this.informationService = new InformationService();
    this.state = {
      input: '',
    };
  }

  componentDidMount() {
    // this.state.input = 'rs2';

    // setInterval(() => this.onKeyPress('r'), 500);
  }

  onKeyPress(button) {
    console.log("Button pressed", button);
    const input = this.state.input;
    if (button === 'DEL') {
      this.setState({ input: input.substring(0, input.length - 1) });
    } else {
      this.setState({ input: input + button });
    }

    if (this.state.input.length > 2) {
      console.log("search for " + this.state.input);
      this.informationService.stationQuery(input);
    }
    else {
      console.log(this.state.input.length);
    }
  }

  render() {
    const StyledKeyboard = styled.div`
      position: fixed;
      bottom:0;
      left:0;
      width:100%;
      padding:10px;
    `;

    const SearchContainer = styled.div`
    `;

    const Results = styled.div`
      height: 50vh;
    `;
    return <SearchContainer>
      <Results>
        {this.state.hasResults ? this.state.results : 'no result'}
      </Results>
      <StyledKeyboard>
        <InputGroup className="sm-1">
          <FormControl size="lg" placeholder="Suche" value={this.state.input} readOnly />
        </InputGroup>
        <Keyboard
          useButtonTag={true}
          useMouseEvents={true}
          autoUseTouchEvents={true}
          onKeyPress={button => this.onKeyPress(button)}
          maxLength={10}
          layout={{
            'default': [
              '0 1 2 3 4 5 6 7 8 9 DEL',
              'q w e r t z u i o p',
              'a s d f g h j k l',
              'y x c v b n m ö ä ü',
            ],
          }}
        />
      </StyledKeyboard>
    </SearchContainer>;
  }
}

const RadioPanel = styled.div``;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.settings = new Settings();
    this.informationService = new InformationService();
    this.offlineReconnector = new OfflineReconnector();

    this.state = {
      showRadioPanel: true,
      streamUrl: ''
    };
  }

  toggle() {
    this.setState({ showRadioPanel: !this.state.showRadioPanel });
  }

  render() {
    const toggle = this.toggle.bind(this);
    return (
      <div>
        {
          this.state.showRadioPanel ?
            <RadioPanel>
              <Favorites
                settings={this.settings}
                informationService={this.informationService}
                click={(i) => this.handleClick(i)} />
              <ReactPlayer
                src={this.state.streamUrl}
                ref={(element) => { this.rap = element; }}
                autoPlay
                controls
                onError={(e) => console.debug("error:" + JSON.stringify(e))}
                onPlay={() => console.debug("playing " + this.state.streamUrl)}
                onPause={() => console.debug("paused")}
              />
              <SearchPanelToggleButton toggle={toggle} />
            </RadioPanel>
            :
            <SearchPanel />
        }
        <OfflineHint />
      </div>
    );
  }

  handleClick(url) {
    console.debug("play " + url);
    this.setState({ streamUrl: url });
  }
}

export default Player;