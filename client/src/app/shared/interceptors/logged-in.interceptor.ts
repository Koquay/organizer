import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class LoggedInInterceptor implements HttpInterceptor {
  private loggedIn;

  constructor(private store: Store<{userState}>) {
    this.subscribeToUserStore();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.loggedIn) {
      const authReq = request.clone({setHeaders: {Authorization: "loggedIn"}});
      return next.handle(authReq);
    }
    return next.handle(request);
  }

  private subscribeToUserStore = () => {
    const user$ = this.store.select((state) => {
      return state.userState;
    });

    user$.subscribe((userState) => {
      this.loggedIn = userState?.loggedIn;
    });
  };
}
