export class RegisterViewModel {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber:string;

    constructor(obj: RegisterViewModel) {
        this.username = obj.username;
        this.password = obj.password;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.phoneNumber = obj.phoneNumber;
      }
}