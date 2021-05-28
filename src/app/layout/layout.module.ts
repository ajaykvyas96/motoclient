import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '../components/alert/alert.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainlayoutComponent,
    AuthlayoutComponent,
    SidebarComponent,
    AlertComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([])
  ]
})
export class LayoutModule { }
