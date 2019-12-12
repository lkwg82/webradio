
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
        // localStorage.getItem("favorites") ||
        const value = "9013,9437,2459,2261,2106,1382,2111,22077";
        return value.split(",")
            .map(e => Number.parseInt(e))
            .map(parsed => 'NaN' === parsed ? -1 : parsed);
    }

    saveFavorites(ids) {
        localStorage.setItem("favorites", ids);
    }
}