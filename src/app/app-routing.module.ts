import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './components/barchart.component';
import { StackedBarChartComponent } from './components/stacked-barchart.component';
import { SunBurstComponent } from './components/sun-brust.component';

const routes: Routes = [
  {
    path: 'barchart',
    component: BarChartComponent
  },
  {
    path: 'stacked',
    component: StackedBarChartComponent
  },
  {
    path: 'sunburst',
    component: SunBurstComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
