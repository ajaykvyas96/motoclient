import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { FormDialogModel } from '../../models/FormDialogModel';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
    selector: 'product-form-dialog',
    templateUrl: 'product-form-dialog.html',
    styleUrls: ['./product.component.css']
})
export class ProductFormComponent implements AfterViewInit {

    categories: Category[];
    productForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private categoryService: CategoryService,
        public dialogRef: MatDialogRef<ProductFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FormDialogModel<Product>,
        private snackbarService: SnackbarService
    ) {
        this.productForm = new FormGroup({
            categoryId: new FormControl(data.model.categoryId, Validators.required),
            productName: new FormControl(data.model.productName, Validators.required),
            price: new FormControl(data.model.price, Validators.required),
            weight: new FormControl(data.model.weight, Validators.required),
            description: new FormControl(data.model.description, Validators.required)
        });
    }

    get f() { return this.productForm.controls; }

    ngAfterViewInit(): void {
        this.categoryService.getall().subscribe(categories => {
            this.categories = categories;
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.submitted = true;
        if (this.productForm.invalid) {
            return;
        }
        this.loading = true;
        if (this.data.model.id === 0) {
            this.productService.post(this.productForm.value)
                .pipe(first())
                .subscribe({
                    next: (product) => {
                        this.loading = false;
                        this.dialogRef.close(this.productForm.value)
                        this.snackbarService.success('Inserted successfully!', 'Insert');
                    },
                    error: error => {
                        this.loading = false;
                        this.snackbarService.danger("Couldn't Insert!", 'Insert');
                    }
                });
        } else {
            this.productService.put(this.productForm.value)
                .pipe(first())
                .subscribe({
                    next: (product) => {
                        this.loading = false;
                        this.dialogRef.close(this.productForm.value);
                        this.snackbarService.success('Updated successfully!', 'Update');
                    },
                    error: error => {
                        this.loading = false;
                        this.snackbarService.danger("Couldn't Update!", 'Update');
                    }
                });
        }
    }
}