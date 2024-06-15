
import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UpdateMatchDataComponent } from 'src/app/shared/components/update-match-data/update-match-data.component';
import { UpdateHomeTeamComponent } from 'src/app/shared/components/update-home-team/update-home-team.component';
import {UpdateAwayTeamComponent} from 'src/app/shared/components/update-away-team/update-away-team.component';
import { FormGroup } from '@angular/forms';
import { FormControl,  Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-new-minutes',
  templateUrl: './new-minutes.page.html',
  styleUrls: ['./new-minutes.page.scss'],
})
export class NewMinutesPage implements OnInit {

  form = new FormGroup({
    place: new FormControl(''),
    category: new FormControl(''),
    journey: new FormControl(0),
    date: new FormControl(new Date),
    startTime: new FormControl(new Date()),
    startSecondTime: new FormControl(new Date()),
    homeName: new FormControl(''),
    homePlayingColour: new FormControl(''),
    homeColourGKPlayer: new FormControl(''),
    homeDungareesColour: new FormControl(''),
    visitorName: new FormControl(''),
    visitorPlayingColour: new FormControl(''),
    visitorColourGKPlayer: new FormControl(''),
    visitorDungareesColour: new FormControl(''),
    localScore:new FormControl(0),
    localFoulScore: new FormControl(0),
    visitorScore: new FormControl(0),
    visitorFoulScore: new FormControl(0),
    localTimeoutUsed: new FormControl(false),
    visitorTimeoutUsed: new FormControl(false),
    incidents: new FormControl(''),
  })

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);

  actaId: string

  user = {} as User;

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    this.createMinutes();
  }

  async createMinutes() {
    if (this.form.valid){

      let path = `users/${this.user.uid}/minutes`

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {  
        this.actaId = res.id;
        this.utilsSvc.presentToast({
          message: 'Acta Generada, Rellene los datos para finalizarla', 
          color: 'success', 
          duration: 2000, 
          position: 'middle', 
          icon: 'checkmark-circle-outline'
        });

        console.log(res);
      }).catch(err => {
        console.log(err);

        this.utilsSvc.presentToast({
          message: err.message, 
          color: 'danger', 
          duration: 3000, 
          position: 'middle', 
          icon: 'warning'
        });

      }).finally(() => {
        loading.dismiss();
      })
    }
  }



  updateMatchData(){
    this.utilsSvc.presentModal({
      component: UpdateMatchDataComponent,
      cssClass: 'modal-class',
      componentProps: {
        actaId: this.actaId
      },
    })
  }

  updateHomeTeam(){
    this.utilsSvc.presentModal({
      component: UpdateHomeTeamComponent,
      cssClass: 'modal-class',
      componentProps: {
        actaId: this.actaId
      },
    })
  }

  updateAwayTeam(){
    this.utilsSvc.presentModal({
      component: UpdateAwayTeamComponent,
      cssClass: 'modal-class',
      componentProps: {
        actaId: this.actaId
      },
    })
  }
}
