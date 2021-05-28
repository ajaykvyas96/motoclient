import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { ConfirmDialogModel } from 'src/app/models/ConfirmDialogModel';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConfirmdialogComponent } from 'src/app/shared/confirmdialog/confirmdialog.component';
import { CategoryFormComponent } from './category-form.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements AfterViewInit {

  dataSource: Category[];
  category: Category;
  displayedColumns: string[] = ['categoryName', 'action'];
  confirmModel: ConfirmDialogModel;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {

  }

  ngAfterViewInit(): void {
    this.categoryService.getall().subscribe(categories => {
      this.dataSource = categories;
    });
  }

  openDialog(id: number): void {
    this.category = this.dataSource.find(x => x.id === id);
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '250px',
      data: { title: id === 0 ? "Add" : "Edit", model: !this.category ? <Category>{ id : 0 } : this.category } 
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
        this.categoryService.delete(id)
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
