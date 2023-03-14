import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iUser } from '../model/iuser';

import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  // Add User function

  public addUser(user: iUser) {
    return this.http.post(`${baseUrl}/user/`,user)
  }
}
