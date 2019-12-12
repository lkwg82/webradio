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
                return {
                    'logo': json['logo300x300'],
                    'name': json.name,
                    'url': json.streamUrls.slice(0, 1)[0].streamUrl
                };
            });
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
                        console.log(item);
                        return {
                            'id': item.id,
                            'logo': item.station['logo300x300'],
                            'name': item.station.name,
                            'url': item.station.streamUrls.slice(0, 1)[0].streamUrl
                        };
                    });
            });
    }
}
