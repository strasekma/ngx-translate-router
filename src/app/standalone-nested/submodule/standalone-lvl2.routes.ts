import { Routes } from '@angular/router';
import { StandaloneLvl2Component } from './standalone-lvl2/standalone-lvl2.component';

export const routes: Routes = [
  {
    path: '',
    component: StandaloneLvl2Component,
    data: { discriminantPathKey: 'SUB' },
  },
];
