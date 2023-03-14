import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { iLoginData } from '../model/iLoginData';
import { iUser } from '../model/iuser';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public loginStatusSubject = new Subject<Boolean>();


  constructor(private http: HttpClient) {}



  // generate token
  public generateToken(loginData: iLoginData) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // getting current user from api(principal)
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // login user set token in local storage
  public loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  // user loggedin or not
  public isLoggedin() {
    let tokenStr = localStorage.getItem('token');

    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    return true;
  }

  public getLoggedInUsername() {
    let currentUser = this.getUser();
    if (currentUser != null) return currentUser.username;

    return '';
  }

  // logout removing items from localstorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: iUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');

    if (userStr != null) {
      return JSON.parse(userStr);
    }
    this.logout();
    return null;
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
