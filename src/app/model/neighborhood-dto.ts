import { City } from "./city-dto";

export class Neighborhood {
    constructor() {
    }
    public id: number;
    public name : string;
    public inactive : boolean;
    public cityID : number;
    public city : City;
}