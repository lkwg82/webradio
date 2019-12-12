import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';

const Hint = styled(Alert)`
        font-size: 20px;
        position: fixed;
        width: 50%;
        left: 25%;
        bottom: 5%;
    `;

export class OfflineHint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'offline': false
        };
    }

    componentDidMount() {
        window.addEventListener('offline', () => this.setState({ offline: true }));
        window.addEventListener('online', () => this.setState({ offline: false }));
    }

    render() {
        if (this.state.offline) {
            return <Hint variant="info">
                <Spinner animation="border" role="status" />
                &nbsp;currently offline
                </Hint>;
        }
        return "";
    }
}