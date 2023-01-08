import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit { 
  public loggedIn = false;

  constructor(
    private store:Store<{userState}>,
    // private userService:UserService
  ) { }

  ngOnInit(): void {
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {
    // const userState$ = this.store.select((state) => {
    //   return state.userState.loggedIn
    // })

    // userState$.subscribe(loggedIn=> {
    //   this.loggedIn = loggedIn;     
    //   console.log('loggedIn',this.loggedIn)     
    // })
  }

  public logout = () => {
    // this.userService.logout();
  };


}
