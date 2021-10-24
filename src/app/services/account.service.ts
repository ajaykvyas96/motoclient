import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountInfo, User } from '../models/user';
import { LoginViewModel } from '../models/LoginViewModel';
import { RegisterViewModel } from '../models/RegisterViewModel';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
    
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    private apiUrl: string= `${environment.apiUrl}/auth`;
    private accountApi: string = `${environment.apiUrl}/account`;

    constructor(
        private router: Router,
        private http: HttpClient,
        private snackbarService: SnackbarService
    ) {
        const user = localStorage.user === undefined ? new User() : JSON.parse(localStorage.user);
        this.userSubject = new BehaviorSubject<User>(user);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(login : LoginViewModel) {
        return this.http.post<User>(`${this.apiUrl}/login`, login)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(new User());
        this.router.navigate(['/login']);
        this.snackbarService.success('Successfully Logged Out','Logout');
    }

    register(user: RegisterViewModel) {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }

    get() : Observable<AccountInfo>{
        return this.http.get<AccountInfo>(`${this.accountApi}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    // delete(id: string) {
    //     return this.http.delete(`${environment.apiUrl}/users/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (id == this.userValue.id) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }

    uploadProfile(formData: FormData) {
        
        return this.http.post(`${this.accountApi}/uploadprofile`,formData);

    }
}