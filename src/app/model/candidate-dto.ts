import { Address } from "./address-dto";
import { CandidateAcademicEducation } from "./candidate-academic-education-dto";
import { CandidateContact } from "./candidate-contact-dto";
import { CandidateExperience } from "./candidate-experience-dto";
import { CandidateImprovementCourse } from "./candidate-improvement-course-dto";
import { CandidatePersonalReference } from "./candidate-personal-reference-dto";
import { CandidateRole } from "./candidate-role-dto";
import { City } from "./city-dto";
import { CivilState } from "./civil-state-dto";
import { Gender } from "./gender-dto";
import { User } from "./user";

export class Candidate {
    constructor() {
    }
    public id: number;
    public userID : number;
    public user	: User;
    public birthDate : Date;
    public rg : string;
    public carteiraTrabalho: string;
    public serieCarteiraTrabalho : string;
    public ufCarteiraTrabalho: string;
    public cnh: string;
    public categoriaCNH	: string;
    public expirationDateCNH: Date;
    public genderID: number;
    public gender : Gender;
    public addressID : number;
    public address : Address;
    public nacionality : string;
    public placeOfBirthID : number;
    public placeOfBirth	: City;
    public civilStateID	: number;
    public civilState : CivilState;
    public academicsEducation : CandidateAcademicEducation[];
    public contacts	: CandidateContact[];
    public experiences : CandidateExperience[];
    public improvementCourses : CandidateImprovementCourse[];
    public personalReferences : CandidatePersonalReference[];
    public roles : CandidateRole[];
   
}