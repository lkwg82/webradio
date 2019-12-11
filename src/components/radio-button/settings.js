
export class Settings {
    getActiveRadio() {
        // eslint-disable-next-line no-undef
        return localStorage.getItem("activeRadio");
    }
    saveActiveRadio(activeRadio) {
        // eslint-disable-next-line no-undef
        localStorage.setItem("activeRadio", activeRadio);
    }
}