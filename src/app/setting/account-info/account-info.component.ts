import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AccountInfo } from '../../models/user';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  profileImage:string = "";
  dataSource: AccountInfo;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.get().subscribe(user => {
      this.dataSource = user;
      this.profileImage = this.dataSource.profileImage;
    });
  }

  uploadFile(files) {
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.accountService.uploadProfile(formData).subscribe(res => {
      this.profileImage = res["filePath"];
    });
  }
}
