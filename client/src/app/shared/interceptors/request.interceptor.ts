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
export class RequestInterceptor implements HttpInterceptor {
  private token;

  constructor(private store: Store<{userState}>) {
    this.subscribeToUserStore();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('REQUEST INTERCEPTOR CALLED')
    if(this.token) {
      const authReq = request.clone({setHeaders: {Authorization: this.token}});
      return next.handle(authReq);
    }
    return next.handle(request);
  }

  private subscribeToUserStore = () => {
    const user$ = this.store.select((state) => {
      return state.userState;
    });

    user$.subscribe((userState) => {
      this.token = userState?.token;
    });
  };
}
