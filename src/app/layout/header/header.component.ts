import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username :string;
  
  constructor(
    private accountService: AccountService
  ) {
    const user = accountService.userValue;
    this.username = user.firstName + " " + user.lastName;
   }

  ngOnInit(): void {
  }
}
