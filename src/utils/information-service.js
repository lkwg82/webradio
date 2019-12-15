export class InformationService {
    constructor() {
        this.baseUrl = 'https://api-webradio.lgohlke.de/';
    }

    stationInfo(stationId) {
        if (!Number.parseInt(stationId)) {
            const err = new Error("invalid stationId:" + stationId);
            throw err;
        }
        const url = this.baseUrl + 'stationInfo?stationId=' + stationId;
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                console.debug(json);
                return {
                    'logo': json['logo300x300'],
                    'name': json.name,
                    'url': this.findFirstNonPlsEntryInStreamList(json.streamUrls)
                };
            });
    }

    findFirstNonPlsEntryInStreamList(streamUrls) {
        return streamUrls
            .map(e => e.streamUrl)
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
                    .filter(item => item.station.streamUrls.length > 0)
                    .map(item => {
                        console.debug(item);
                        return {
                            'id': item.id,
                            'logo': item.station['logo300x300'],
                            'name': item.station.name,
                            'url': this.findFirstNonPlsEntryInStreamList(item.station.streamUrls)
                        };
                    });
            });
    }
}
