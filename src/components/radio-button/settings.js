
export class Settings {

    getActiveRadioId() {
        return localStorage.getItem("activeRadioId2") || "cosmo";
    }

    saveActiveRadioId(activeRadioId) {
        localStorage.setItem("activeRadioId2", activeRadioId);
    }

    getFavorites() {
        const value = localStorage.getItem("favorites2") || "cosmo,1046rtl,rbbradioeins,1live,meinkinderradio,cosmoneu";
        const ids = value.split(",");
        return Array.from(new Set(ids));
    }

    addFavorite(stationId) {
        let newFavorites = [stationId];
        this.getFavorites().slice(0, 11).map(i => newFavorites.push(i));
        this.saveFavorites(newFavorites);
    }

    saveFavorites(ids) {
        localStorage.setItem("favorites2", ids);
    }
}