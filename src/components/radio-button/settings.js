
export class Settings {

    getActiveRadioId() {
        const value = localStorage.getItem("activeRadioId");
        const parsed = Number.parseInt(value);
        return parsed === 'NaN' ? -1 : parsed;
    }

    saveActiveRadioId(activeRadioId) {
        localStorage.setItem("activeRadioId", activeRadioId);
    }

    getFavorites() {
        const value = localStorage.getItem("favorites") || "9013,9437,2459,2261,2106,1382,2111,22077";
        return value.split(",")
            .map(e => Number.parseInt(e))
            .map(parsed => 'NaN' === parsed ? -1 : parsed);
    }

    addFavorite(stationId) {
        let newFavorites = [stationId];
        this.getFavorites().slice(0, 9).map(i => newFavorites.push(i));
        this.saveFavorites(newFavorites);
    }

    saveFavorites(ids) {
        localStorage.setItem("favorites", ids);
    }
}