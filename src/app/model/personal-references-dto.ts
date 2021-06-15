import { PersonalReferenceType } from "./personal-reference-type-dto";

export class PersonalReference {
    constructor() {
    }

    public id : number;
    public name : string;
    public telephone : string;
    public personalReferenceTypeID : number;
    public personalReferenceType : PersonalReferenceType;
}