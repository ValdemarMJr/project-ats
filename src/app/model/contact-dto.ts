import { ContactType } from "./contact-type-dto";

export class Contact {
    constructor() {
    }
    public id : number;
    public name : string;
    public information : string;
    public contactTypeID : number;
    public contactType : ContactType;
}