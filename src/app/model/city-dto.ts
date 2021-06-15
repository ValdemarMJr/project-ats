import { State } from "./stateDTO";

export class City {
    constructor() {
    }
    public id: number;
    public name : string;
    public inactive : boolean;
    public stateID : number;
    public state : State;
}