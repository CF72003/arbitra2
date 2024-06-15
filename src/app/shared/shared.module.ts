import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputsComponent } from './components/custom-inputs/custom-inputs.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateMatchDataComponent } from './components/update-match-data/update-match-data.component';
import { UpdateHomeTeamComponent } from './components/update-home-team/update-home-team.component';
import { UpdateAwayTeamComponent } from './components/update-away-team/update-away-team.component';
import { UpdateMatchEventsComponent } from './components/update-match-events/update-match-events.component';
import { MinutesDetailsComponent } from './components/minutes-details/minutes-details.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputsComponent,
    LogoComponent,
    UpdateMatchDataComponent,
    UpdateHomeTeamComponent,
    UpdateAwayTeamComponent,
    UpdateMatchEventsComponent,
    MinutesDetailsComponent,
  ],
  exports:  [
    HeaderComponent,
    CustomInputsComponent,
    ReactiveFormsModule,
    LogoComponent,
    UpdateMatchDataComponent,
    UpdateHomeTeamComponent,
    UpdateAwayTeamComponent,
    UpdateMatchEventsComponent,
    MinutesDetailsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
