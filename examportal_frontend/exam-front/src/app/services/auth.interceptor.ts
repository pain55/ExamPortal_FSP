import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


// const TOKEN_HEADER:String = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = request;

    const token = this.loginService.getToken();

    if(token!=null) {
      authReq = authReq.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      });
    }


    return next.handle(authReq);
  }

}

export const AuthInterceptorProvider=[
  {
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true,
  }
]
