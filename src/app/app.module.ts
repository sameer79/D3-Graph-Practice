import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './components/barchart.component';
import { StackedBarChartComponent } from './components/stacked-barchart.component';
import { SunBurstComponent } from './components/sun-brust.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    StackedBarChartComponent,
    SunBurstComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
