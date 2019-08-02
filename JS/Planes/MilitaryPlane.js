const Plane = require('./Plane');

class MilitaryPlane extends Plane {

    constructor(model, maxSpeed, maxFlightDistance, maxLoadCapacity, militaryType) {
        super(model, maxSpeed, maxFlightDistance, maxLoadCapacity);
        this._militaryType = militaryType;
    }

    getMilitaryType() {
        return this._militaryType;
    }

    /* set MilitaryType(value) {
        this._militaryType = value;
     }*/
}

module.exports = MilitaryPlane;
