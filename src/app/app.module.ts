import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared';
import { CoursesModule } from './courses';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    SharedModule,
    CoursesModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
