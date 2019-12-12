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
}
