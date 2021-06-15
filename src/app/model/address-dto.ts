import { Neighborhood } from "./neighborhood-dto";

export class Address {
    constructor() {
    }
    public id: number;
    public zipCode : string;
    public street : string;
    public number : string;
    public complement : string;
    public referencePoint : string;
    public neighborhoodID: number;
    public neighborhood: Neighborhood;
}