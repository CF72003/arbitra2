import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinutesPage } from './minutes.page';

const routes: Routes = [
  {
    path: '',
    component: MinutesPage
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinutesPageRoutingModule {}
