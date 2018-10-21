import { HttpRequest } from "@angular/common/http";
import { HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { AuthService } from "src/app/auth/auth.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import *as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log('Intercepted', req);
    // const copiedReq = req.clone({ headers: req.headers.set('', '') });
    //const copiedReq = req.clone({ params: req.params.set('auth', this.authService.getToken() )});
   // return next.handle(copiedReq);
    // return next.handle(req);
    //return null;

    return this.store.select('auth')
      .take(1)
      .switchMap((authState: fromAuth.State) => {
        const copiedReq = req.clone({ params: req.params.set('auth', authState.token)});
        return next.handle(copiedReq);
      })
  }
}
