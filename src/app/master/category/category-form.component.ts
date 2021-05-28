import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { FormDialogModel } from '../../models/FormDialogModel';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
    selector: 'category-form-dialog',
    templateUrl: 'category-form-dialog.html',
})
export class CategoryFormComponent {

    categoryForm: FormGroup;
    loading = false;
    submitted = false;
   
    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        public dialogRef: MatDialogRef<CategoryFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FormDialogModel<Category>,
        private snackbarService: SnackbarService
    ) {
        this.categoryForm = new FormGroup({
            categoryName: new FormControl(data.model.categoryName, Validators.required),
            id: new FormControl(data.model.id)
        });
    }

    get f() { return this.categoryForm.controls; }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.submitted = true;
        if (this.categoryForm.invalid) {
            return;
        }
        this.loading = true;
        if(this.data.model.id === 0) {
            this.categoryService.post(this.categoryForm.value)
            .pipe(first())
            .subscribe({
                next: (category) => {
                    this.loading = false;
                    this.dialogRef.close(this.categoryForm.value)
                    this.snackbarService.success('Inserted successfully!','Insert');
                },
                error: error => {
                    this.loading = false;
                    this.snackbarService.danger("Couldn't Insert!",'Insert');
                }
            });
        } else {
            this.categoryService.put(this.categoryForm.value)
            .pipe(first())
            .subscribe({
                next: (category) => {
                    this.loading = false;
                    this.dialogRef.close(this.categoryForm.value);
                    this.snackbarService.success('Updated successfully!','Update');
                },
                error: error => {
                    this.loading = false;
                    this.snackbarService.danger("Couldn't Update!",'Update');
                }
            });
        }   
    }
}