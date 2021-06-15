import { PersonalReference } from "./personal-references-dto";

export class CandidatePersonalReference{
    constructor() {
    }
    public id: number;
    public candidateID : number;
    public personalReferenceID : number;
    public personalReference : PersonalReference;
}