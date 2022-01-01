export class SpotifyWebsocket extends WebSocket {
    constructor() {
        super("ws://localhost:24879/events");
        this.onopen = () => {
            console.log("opened");
        };
        this.onclose = () => {
            console.log("closed");
        };

        this.onAnyEvent = (event) => {
            console.log("event: " + event);
        };
        this.onmessage = (msg) => {
            console.log("message received: " + msg);
            const data = msg.data;
            const json = JSON.parse(data);
            console.log(json);
            switch (json.event) {
                case 'playbackResumed':
                    if (typeof this.onPlaybackResumed === 'function') {
                        this.onPlaybackResumed();
                    }
                    break;
                case 'playbackPaused':
                    if (typeof this.onPlaybackPaused === 'function') {
                        this.onPlaybackPaused();
                    }
                    break;
                default:
                    console.log("unmatched event: " + json.event);
            }
            this.onAnyEvent(json.event);
        };
        // this.onerror = (e) => {
        //     console.log("error ");
        // };
    }
}
