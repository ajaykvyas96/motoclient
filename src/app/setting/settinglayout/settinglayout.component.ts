import { Component, OnInit } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatListOption } from '@angular/material/list';
import { MatMenuItem } from '@angular/material/menu';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

export interface Section {
  display: string,
  value: string,
  icon: string
}

@Component({
  selector: 'app-settinglayout',
  templateUrl: './settinglayout.component.html',
  styleUrls: ['./settinglayout.component.css']
})
export class SettinglayoutComponent implements OnInit {

  settingList: Section[] = [
    { display: 'Account', value: 'account', icon: 'account_circle' },
    { display: 'Payment', value: 'payment', icon: 'payment' },
    { display: 'Privacy', value: 'privacy', icon: 'privacy_tip' },
    { display: 'Help', value: 'help', icon: 'help' },
    { display: 'About', value: 'about', icon: 'info' }
  ];
  
  selectedSetting: Section[];

  constructor(private route: ActivatedRoute,private router: Router) { }
  
  ngOnInit(): void {
     this.selectedSetting = this.settingList.filter(x => x.value === this.route.routeConfig.path);
  }
}
