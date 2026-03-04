import { Routes } from '@angular/router';
import { StandaloneLvl1Component } from './standalone-lvl1/standalone-lvl1.component';

export const routes: Routes = [
  {
    path: 'lvl1Original',
    component: StandaloneLvl1Component,
    data: { discriminantPathKey: 'lvl1Original' },
    children: [
      { path: 'lvl2Original', loadChildren: () => import('./submodule/standalone-lvl2.routes').then((m) => m.routes) },
    ],
  },
];
