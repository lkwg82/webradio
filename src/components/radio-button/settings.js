
export class Settings {

    getActiveRadioId() {
        return localStorage.getItem("activeRadioId") || -1;
    }

    saveActiveRadioId(activeRadioId) {
        localStorage.setItem("activeRadioId", activeRadioId);
    }

    getFavorites() {
        const value = localStorage.getItem("favorites");
        return value.split(",").map(e => Number.parseInt(e));
    }

    saveFavorites(ids) {
        localStorage.setItem("favorites", ids);
    }
}