import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettinglayoutComponent } from './settinglayout/settinglayout.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { MainlayoutComponent } from '../layout/mainlayout/mainlayout.component';
import { SharedModule } from '../shared/shared/shared.module';
import { AccountInfoComponent } from './account-info/account-info.component';
import { PaymentSettingComponent } from './payment-setting/payment-setting.component';
import { PrivacySettingComponent } from './privacy-setting/privacy-setting.component';
import { HelpInfoComponent } from './help-info/help-info.component';
import { AboutInfoComponent } from './about-info/about-info.component';

const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: 'setting',
        component: SettinglayoutComponent,
        children: [
          { path: '',redirectTo: '/setting/account', pathMatch: 'full' },
          { path: 'account', component: AccountInfoComponent },
          { path: 'payment', component: PaymentSettingComponent },
          { path: 'privacy', component: PrivacySettingComponent },
          { path: 'help', component: HelpInfoComponent },
          { path: 'about', component: AboutInfoComponent }
        ]
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    SettinglayoutComponent,
    AccountInfoComponent,
    PaymentSettingComponent,
    PrivacySettingComponent,
    HelpInfoComponent,
    AboutInfoComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SettingModule { }
