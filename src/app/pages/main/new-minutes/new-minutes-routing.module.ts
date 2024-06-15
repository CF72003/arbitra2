import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMinutesPage } from './new-minutes.page';

const routes: Routes = [
  {
    path: '',
    component: NewMinutesPage
  },  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMinutesPageRoutingModule {}
