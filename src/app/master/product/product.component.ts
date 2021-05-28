import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { ConfirmDialogModel } from 'src/app/models/ConfirmDialogModel';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConfirmdialogComponent } from 'src/app/shared/confirmdialog/confirmdialog.component';
import { ProductFormComponent } from './product-form.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dataSource: Product[];
  product: Product;
  displayedColumns: string[] = ['productName','price','weight', 'action'];
  confirmModel: ConfirmDialogModel;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {

   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.productService.getall().subscribe(products => {
      this.dataSource = products;
    });
  }

  openDialog(id: number): void {
    this.product = this.dataSource.find(x => x.id === id);
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '500px',
      data: { title: id === 0 ? "Add" : "Edit", model: !this.product ? <Product>{ id : 0 } : this.product },

    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngAfterViewInit();
    });
  }

  confirmDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      width: '250px',
      data: { title: 'Delete', content: 'Are you sure you want to delete?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        this.productService.delete(id)
        .pipe(first())
            .subscribe({
                next: (category) => {
                    this.ngAfterViewInit();
                    this.snackbarService.success('Deleted successfully!','Delete');
                },
                error: error => {
                  this.snackbarService.danger("Couldn't delete!",'Delete');
                }
            });
      }
    });
  }
}
