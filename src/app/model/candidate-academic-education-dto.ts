import { NumberValueAccessor } from "@angular/forms"
import { AcademicEducation } from "./academic-education-dto";
import { CourseSituation } from "./course-situation-dto";

export class CandidateAcademicEducation {
    constructor() {
    }

    public id : number;
    public candidateID: number;
    public academicEducationID : number;
    public academicEducation : AcademicEducation;
    public situationCourseID : number;
    public courseSituation : CourseSituation;
    public dtStart : Date;
    public dtFinish : Date;

}