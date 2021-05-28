import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private accountService: AccountService,
        private snackbarService:SnackbarService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.accountService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.accountService.logout();
            }
            
            let errorMessage = "unknown error occuered!";
            // if server is not runnig, status will be zero in the response. 
            if(err.status !== 0){
                errorMessage = err.error?.errorMessage || err.statusText;
            }
            this.snackbarService.danger(errorMessage,';)');        
            return throwError(errorMessage);
        }))
    }
}