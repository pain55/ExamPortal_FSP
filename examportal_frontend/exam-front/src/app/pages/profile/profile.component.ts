import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user:any = null;
  userRole = "";

  constructor(private loginService:LoginService) {
  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.userRole = this.loginService.getUserRole();
    console.log(this.user);
  }

}
