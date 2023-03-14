import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { iLoginData } from 'src/app/model/iLoginData';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public hide:boolean = false;

  public loginData:iLoginData ={} as iLoginData;

  constructor(private _snackBar:MatSnackBar,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  public loginFormSubmit() {

    if(this.loginData.username.trim()=="" || this.loginData.password.trim()=="")
    {
      this._snackBar.open("Invalid Creditials","X",{
        duration:3000
      })
      return;
    }

    // requesting server to generate jwt token
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {


        // login
        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe(
          (user:any) => {
            this.loginService.setUser(user);
            console.log(user);
            this.loginService.loginStatusSubject.next(true);
            // redirecting to admin dashboard
            if(this.loginService.getUserRole()=="ROLE_ADMIN") {
              this.router.navigate(["admin-dashboard"]);
            }
            else if(this.loginService.getUserRole()=="ROLE_USER"){
              this.router.navigate(["user-dashboard"]);
            }
            else {
              this.loginService.logout();
            }

          }

        )


      },
      (error) => {
        alert("something went wrong while generating token");
        console.log(error);
      }
      )


  }

}
