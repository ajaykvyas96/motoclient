import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {

    constructor(private snackBar: MatSnackBar) { }

    success(message: string, action: string, duration?: number) {
        this.snackBar.open(message, action, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: duration ? duration : 3000,
            panelClass: ['text-light','bg-success']
        });
    }

    danger(message: string, action: string, duration?: number) {
        this.snackBar.open(message, action, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: duration ? duration : 3000,
            panelClass: ['text-light','bg-danger']
        });
    }

}