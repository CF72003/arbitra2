import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMinutesPageRoutingModule } from './new-minutes-routing.module';

import { NewMinutesPage } from './new-minutes.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewMinutesPageRoutingModule,
    SharedModule,
  ],
  declarations: [NewMinutesPage]
})
export class NewMinutesPageModule {}
