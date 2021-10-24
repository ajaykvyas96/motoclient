export class User {
    id: string | undefined;
    userName: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    token: string | undefined;

    // constructor(user:User){
    //     this.id = user.id;
    //     this.userName = user.userName;
    //     this.firstName = user.firstName;
    //     this.lastName = user.lastName;
    //     this.token = user.token;
    // }
}

export class AccountInfo {
    accessFailedCount: number;
    email: string;
    emailConfirmed: boolean;
    firstName: string;
    gender: string;
    lastName: string;
    lockoutEnabled: boolean;
    lockoutEnd: number;
    normalizedEmail: string;
    normalizedUserName: string;
    phoneNumber: string;
    phoneNumberConfirmed: false
    profileImage: string;
    userName: string;
}