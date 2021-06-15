export class TokenDTO {
    constructor() {
    }
    public authenticated: boolean;
    public created: string;
    public expiration: string;
    public accessToken: string;
    public refreshToken: string;
}