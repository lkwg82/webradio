
export class Settings {

    getActiveRadioId() {
        const value = localStorage.getItem("activeRadioId");
        return Number.parseInt(value) || -1;
    }

    saveActiveRadioId(activeRadioId) {
        localStorage.setItem("activeRadioId", activeRadioId);
    }

    getFavorites() {
        const value = localStorage.getItem("favorites") || "9013,9437,2459,2261";
        return value.split(",").map(e => Number.parseInt(e));
    }

    saveFavorites(ids) {
        localStorage.setItem("favorites", ids);
    }
}