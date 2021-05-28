import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from 'src/app/layout/mainlayout/mainlayout.component';
import { ProductComponent } from '../product/product.component';
import { ProductFormComponent } from '../product/product-form.component';
import { AuthGuard } from 'src/app/helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      { path: 'product', component: ProductComponent }
    ],
    canActivate:[AuthGuard]
  }
];

@NgModule({
  declarations: [ProductFormComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductModule { }
