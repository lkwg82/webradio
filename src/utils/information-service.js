export class InformationService {
    constructor() {
        this.baseUrl = 'https://api-webradio.lgohlke.de/';
//         this.baseUrl = 'http://localhost:8080/';
    }

    stationInfo(stationId) {
        const url = this.baseUrl + 'stationInfo?stationId=' + stationId;
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                console.debug(json);
                return {
                    'logo': json['logo300x300'],
                    'name': json.name,
                    'url': this.findFirstNonPlsEntryInStreamList(json.streams)
                };
            });
    }

    findFirstNonPlsEntryInStreamList(streamUrls) {
        return streamUrls
            .map(e => e.url)
            .find(url => !url.endsWith(".pls"));
    }

    stationQuery(query) {
        if (query === undefined || query.length < 2) {
            throw new Error('query invalid: ' + query);
        }

        const url = this.baseUrl + 'queryStations?query=' + query;
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                return json
                    .filter(item => item.streams.length > 0)
                    .map(item => {
                        console.debug(item);
                        return {
                            'id': item.id,
                            'logo': item['logo300x300'],
                            'name': item.name,
                            'url': this.findFirstNonPlsEntryInStreamList(item.streams)
                        };
                    });
            });
    }

    nowplaying(stationId){
        const url = this.baseUrl + 'nowPlaying?stationId=' + stationId;
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                console.debug(json);
                return json;
            });
    }
}
