import React from 'react';
export class OfflineReconnector extends React.Component {
    componentDidMount() {
        window.addEventListener('online', () => this.reconnect());
        console.info("reconnector configured");
    }
    reconnect() {
        const { handler, url } = this.props;
        console.debug("reconnect " + handler);
        handler(url);
    }
    render() {
        return "";
    }
}
