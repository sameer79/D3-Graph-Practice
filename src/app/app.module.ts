import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './components/barchart.component';
import { StackedBarChartComponent } from './components/stacked-barchart.component';
@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    StackedBarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
