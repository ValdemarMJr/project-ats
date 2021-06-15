export class User {

    public id : number;
    public userName: string;
    public password : string;
    public cpf : string;
    public name : string;
    public email : string;
    public inactive! : boolean;
    public refreshToken : string;
    public refreshTokenExpiryTime : Date;
    
}