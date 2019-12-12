export class OfflineReconnector {
    constructor() {
        window.addEventListener('online', () => window.location.reload());
        console.info("reconnector configured");
    }
}
