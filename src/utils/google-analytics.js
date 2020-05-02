export class GoogleAnalytics {
    constructor(){
        this.ga = window.ga;
    }
    
    eventStationSelection(name) {
        this.event('station','selection',name);
    }

    event(eventCategory,eventAction, eventLabel){
        this.ga('send', {
            hitType: 'event',
            eventCategory: eventCategory,
            eventAction: eventAction,
            eventLabel: eventLabel
        });
    }
}