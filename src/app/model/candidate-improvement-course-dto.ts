import { CourseSituation } from "./course-situation-dto";
import { ImprovementCourse } from "./improvement-course-dto";

export class CandidateImprovementCourse{
    constructor() {
    }

    public id: number;
    public candidateID : number;
    public improvementCourseID : number;
    public improvementCourse : ImprovementCourse;
    public situationCourseID : number;
    public situationCourse : CourseSituation;
    public dtStart : Date;
    public dtFinish : Date;
}