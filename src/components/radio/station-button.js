
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
        this.elementRef = React.createRef();
    }

    componentDidMount() {
        const { stationId } = this.props;
        this.informationService.stationInfo(stationId)
            .then(result => {
                this.setState({
                    logo: result.logo,
                    name: result.name,
                    swipe: {
                        start: 0,
                        moved: 0
                    },
                    url: result.url,
                });
            });
        // this.elementRef.addEventListener('mouseover', this.handleMouseOver);
    }

    componentWillUnmount() {
        // this.elementRef.removeEventListener('mouseover', this.handleMouseOver);
    }

    handleMouseOver() { alert('mouseover'); }
    handleTouchStart(e) {
        this.setState({
            swipe: {
                start: e.touches[0].clientX,
                moved: 0
            }
        });
    }

    handleTouchEnd() {
        console.log(this.state.swipe);
        if (this.state.swipe.moved > 150) /* left */ {
            alert("left" + this.state.swipe.moved);
        } else if (this.state.swipe.moved < -150) /* right */ {
            alert("right" + this.state.swipe.moved);
        }
        this.setState({
            swipe: {
                start: 0,
                moved: 0
            }
        });
    }

    handleTouchMove(e) {
        this.setState({
            swipe: {
                start: this.state.swipe.start,
                moved: this.state.swipe.start - e.touches[0].clientX
            }
        });
    }

    render() {
        const { active, stationId, onClick } = this.props;
        const stationInfo = {
            id: stationId,
            name: this.state.name,
            url: this.state.url
        };
        const handleTouchStart = this.handleTouchStart.bind(this);
        const handleTouchEnd = this.handleTouchEnd.bind(this);
        const handleTouchMove = this.handleTouchMove.bind(this);
        // const deleteVisible

        return (
            <RadioButton ref={this.elementRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                logo={this.state.logo}
                key={stationId}
                block
                variant={active ? 'primary' : 'secondary'}
                onClick={() => onClick(stationInfo)}>
                <StationName>{this.state.name}</StationName>

                {/* <div >
                    <h1>test</h1>
                </div> */}
            </RadioButton>
        );
    }
}