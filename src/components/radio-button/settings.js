
export class Settings {

    getActiveRadioId() {
        return localStorage.getItem("activeRadioId") || -1;
    }

    saveActiveRadioId(activeRadioId) {
        localStorage.setItem("activeRadioId", activeRadioId);
    }
}