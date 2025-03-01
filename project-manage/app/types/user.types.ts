export interface User {
    userId?: number;
    username: string;
    email: string;
    profilePictureUrl?: string;
    teamId?: number;
    cognitoId?: string;
}