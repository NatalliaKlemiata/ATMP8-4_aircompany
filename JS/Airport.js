/* eslint-disable prefer-const */
const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const MilitaryType = require('./models/militaryType');
const experimentalPlane = require('./Planes/experimentalPlane');

class Airport {

    constructor(planes) {                                   //moved constructor to the top of class for visibility
        this.planes = planes;
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

    getPassengerPlaneWithMaxPassengersCapacity() {          // moved closer to getPassengerPlanes
        let max = [];
        let planeWithMaxCapacity = max[0];
        for (let i = 0; i < max.length; i++) {
            if (max[i].getPassengersCapacity() > planeWithMaxCapacity.getPassengersCapacity()) {  // TODO: review the function
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
            //else                                          - add error hanlding??            
        });
        return militaryPlanes;
    }

    getTransportMilitaryPlanes(){
        let transportMilitaryPlanes = [];
        let militaryPlanes = this.getMilitaryPlanes();
        for (let i = 0; i < militaryPlanes.length; i++) {
            if (militaryPlanes[i].getMilitaryType() === MilitaryType.TYPE_TRANSPORT) {          // Changed == to ===; Sources such as D. Crockford and MDN both advise that only triple
                transportMilitaryPlanes.push(militaryPlanes[i]);                                // Why no definition is found for getMilitaryType() ?
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
                                                                                                // TYPE_FIGHTER military planes are not used, to add?
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

    /**
     * Sorts by max speed
     * @return Airport
     */
    sortByMaxSpeed() {
        this.planes.sort((a, b) => (a.getMS() > b.getMS()) ? 1 : -1);
        return this;
    }

    sortByMaxLoadCapacity() {
        this.planes.sort((a, b) => (a.getMinLoadCapacity() > b.getMinLoadCapacity()) ? 1 : -1);
        return this;
    }

    getPlanes() {
        return this.planes;
    }


    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;
