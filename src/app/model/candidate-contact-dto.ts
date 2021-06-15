import { Contact } from "./contact-dto";

export class CandidateContact {
    constructor() {
    }
    public id : number;
    public candidateID : number;
    public contactID : number;
    public contact : Contact;
}