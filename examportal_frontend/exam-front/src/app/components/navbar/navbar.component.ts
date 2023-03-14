import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService:LoginService) { }


  isLoggedin = false;
  user:any=null;

  ngOnInit(): void {
    // this.isLoggedin=this.loginService.isLoggedin();
    // this.user= this.loginService.getUser();


    this.loginService.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLoggedin=this.loginService.isLoggedin()
    this.user= this.loginService.getUser()
    })
  }


  public logout() {
    this.loginService.logout();
    // this.isLoggedin=false;
    // this.user=null;
    window.location.reload();
  }
}
