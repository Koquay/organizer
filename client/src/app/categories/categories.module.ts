import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriesComponent
  ],
  exports: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
