import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { start } from 'repl';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { NgForm,Validators,NgControl, FormGroup } from '@angular/forms';
import { iUser } from 'src/app/model/iuser';
import { stringify } from 'querystring';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})




export class RegisterPageComponent implements OnInit {

  hide = true;

  public user:iUser = {} as iUser;



  constructor(private userService:UserService, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  registerFormSubmit() {
    // alert("success");


    // add user

    this.userService.addUser(this.user).subscribe(
      (data) => {
        // success api call
        console.log(data);
        Swal.fire("Success","User is Registered "+ this.user.username , "success");


        // this._snackBar.open("User Added Successfully","ok",{
        //   duration:3000
        // });
      },
      (error) => {
        console.log("Something went wrong!",error);
        this._snackBar.open(JSON.stringify(error.error),"ok",{
          duration:3000
        });
      }
    )

  }

}
