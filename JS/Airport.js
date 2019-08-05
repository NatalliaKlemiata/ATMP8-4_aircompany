/* eslint-disable prefer-const */
const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const MilitaryType = require('./models/militaryType');
const experimentalPlane = require('./Planes/experimentalPlane');

class Airport {

    constructor(planes) {                                   //moved constructor to the top of class for visibility
        this.planes = planes;
    }

    getPlanes() {                                           // moved up for code readability
        return this.planes;
    }

    getPassengerPlanes() {                                  // renamed
        let passengerPlanes = [];                           // renamed
        for (let p of this.planes) {                        // removed 'let pl = this.planes' - no need to declare p outside the 'for' loop; pl is a mistake at all.
            if (p instanceof PassengerPlane) {
                passengerPlanes.push(p);
            }
        }
        return passengerPlanes;
    }

    getPassengerPlaneWithMaxPassengersCapacity() {              
        let max = this.getPassengerPlanes();
        let planeWithMaxCapacity = max[0];
        for (let i = 0; i < max.length; i++) {
            if (max[i].getPassengersCapacity() > planeWithMaxCapacity.getPassengersCapacity()) {  
                planeWithMaxCapacity = max[i];
            }
        }
        return planeWithMaxCapacity;
    }         

    getMilitaryPlanes() {
        let militaryPlanes = [];
        this.planes.forEach(mplane => {                     // which implementation suits here better, forEach or for/if?
            if (mplane instanceof MilitaryPlane) {
                militaryPlanes.push(mplane);
            }
        })
        return militaryPlanes;
    }

    getTransportMilitaryPlanes() {
        let transportMilitaryPlanes = [];
        let militaryPlanes = this.getMilitaryPlanes();
        for (let i = 0; i < militaryPlanes.length; i++) {
            if (militaryPlanes[i].getMilitaryType() === MilitaryType.TRANSPORT) {          // removed TYPE_; Changed == to ===; Sources such as D. Crockford and MDN both advise that only triple
                transportMilitaryPlanes.push(militaryPlanes[i]);                           // Why no definition is found for getMilitaryType() ?
            }
        }
        return transportMilitaryPlanes;
    }

    getBomberMilitaryPlanes() {
        let bomberMilitaryPlanes = [];
        let militaryPlanes = this.getMilitaryPlanes();
        for (let i = 0; i < militaryPlanes.length; i++) {
            if (militaryPlanes[i].getMilitaryType() === MilitaryType.BOMBER) {
                bomberMilitaryPlanes.push(militaryPlanes[i]);
            }
        }
        return bomberMilitaryPlanes;
    }
    
    getExperimentalPlanes() {
        let experimentalPlanes  = [];
        this.planes.forEach(ePlane => {
            if (ePlane instanceof experimentalPlane) {
                experimentalPlanes.push(ePlane);
            }
        });
        return experimentalPlanes;
    }

    sortByMaxDistance() {
        this.planes.sort((a, b) => (a.getMaxFlightDistance() > b.getMaxFlightDistance()) ? 1 : -1); // corrected method name after renaming in Plane
        return this;
    }

    sortByMaxSpeed() {
        this.planes.sort((a, b) => (a.getMaxSpeed() > b.getMaxSpeed()) ? 1 : -1);   // renamed 
        return this;
    }

    sortByMaxLoadCapacity() {
        this.planes.sort((a, b) => (a.getMaxLoadCapacity() > b.getMaxLoadCapacity()) ? 1 : -1);     // corrected Min to Max 
        return this;
    }

    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;

