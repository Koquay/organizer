import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { timer, interval, take } from 'rxjs';
import * as messageActions from './message.actions';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  public errorMessage;
  public infoMessage;
  public message;
  public title;
  public messageSubscriber;
  public progressIndex = 0;

  constructor(private store: Store<{ messageState }>) {}

  ngOnInit(): void {
    this.getMessage();
  }

  private getMessage = () => {
    const message$ = this.store.select((state) => {
      return state.messageState;
    });

    message$.subscribe((message) => {
      this.infoMessage = message.info;
      this.errorMessage = message.error;
      this.message = this.errorMessage || this.infoMessage;
      this.title = this.errorMessage ? 'Error' : 'Info';

      if (this.message) {
        this.initMessageDismissTimer();
      }
    });
  };

  private initMessageDismissTimer = () => {
    this.messageSubscriber = timer(30000).subscribe(() => {
      this.clearMessage();      
    });

    this.countDown(30);
  };

  public clearMessage = () => {
    this.store.dispatch(messageActions.ClearMessage());
    this.messageSubscriber.unsubscribe();
    this.progressIndex = 0;
  };

  private countDown = (startPoint) => {
    const intervalObs = interval(1500);
    this.progressIndex = 0;

    const progressInterval = intervalObs.pipe(take(startPoint));

    progressInterval.subscribe((second) => {
      this.progressIndex = startPoint - second;
    });
  }
}
