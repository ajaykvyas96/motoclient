import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from 'src/app/layout/mainlayout/mainlayout.component';
import { CategoryComponent } from './category.component';
import { CategoryFormComponent } from './category-form.component'
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ProductComponent } from '../product/product.component';

const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      { path: 'category', component: CategoryComponent }
    ],
    canActivate:[AuthGuard]
  }
];

@NgModule({
  declarations: [CategoryComponent,ProductComponent,CategoryFormComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CategoryModule { }
