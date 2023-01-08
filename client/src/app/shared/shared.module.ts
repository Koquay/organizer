import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MessageComponent } from './components/message/message.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MessageComponent,
    HeaderComponent,
  ],
  exports: [
    MessageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
