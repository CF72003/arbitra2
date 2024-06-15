import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinutesPageRoutingModule } from './minutes-routing.module';

import { MinutesPage } from './minutes.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinutesPageRoutingModule,
    SharedModule
  ],
  declarations: [MinutesPage]
})
export class MinutesPageModule {}
