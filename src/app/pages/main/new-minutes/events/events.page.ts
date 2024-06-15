import { UpdateMatchEventsComponent } from './../../../../shared/components/update-match-events/update-match-events.component';
import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  localTeamName = 'Local';
  visitorTeamName = 'Visitante';
  localScore = 0;
  localFoulScore = 0;
  visitorScore = 0;
  visitorFoulScore = 0;
  localTeamColor = 'var(--ion-color-primary)';
  visitorTeamColor = 'red';
  localTimeoutUsed: boolean = false;
  visitorTimeoutUsed: boolean = false;

  form = new FormGroup({
    idActa: new FormControl(''),
    localScore:new FormControl(0, [Validators.required]),
    localFoulScore: new FormControl(0, [Validators.required]),
    visitorScore: new FormControl(0, [Validators.required]),
    visitorFoulScore: new FormControl(0, [Validators.required]),
    localTimeoutUsed: new FormControl(false, [Validators.required]),
    visitorTimeoutUsed: new FormControl(false, [Validators.required]),
    incidents: new FormControl('', [Validators.required]),
  })
  
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  router = inject(Router);
  user = {} as User;
  mostRecentActaId: string;

  constructor() { }

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    this.loadMostRecentActa();
  }


  changeScore(team: 'local' | 'visitor', change: number) {
    if (team === 'local') {
      this.localScore += change;
      if (this.localScore < 0) this.localScore = 0; // Prevent negative score
      this.form.patchValue({ localScore: this.localScore });
    } else if (team === 'visitor') {
      this.visitorScore += change;
      if (this.visitorScore < 0) this.visitorScore = 0; // Prevent negative score
      this.form.patchValue({ visitorScore: this.visitorScore });
    }
  }

  changeScoreFoul(team: 'local' | 'visitor', change: number) {
    if (team === 'local') {
      this.localFoulScore += change;
      if (this.localFoulScore < 0) this.localFoulScore = 0; // Prevent negative score
      this.form.patchValue({ localFoulScore: this.localFoulScore });
    } else if (team === 'visitor') {
      this.visitorFoulScore += change;
      if (this.visitorFoulScore < 0) this.visitorFoulScore = 0; // Prevent negative score
      this.form.patchValue({ visitorFoulScore: this.visitorFoulScore });
    }
  }

  requestTimeout(team: 'local' | 'visitor') {
    if (team === 'local') {
      this.localTimeoutUsed = true;
    } else if (team === 'visitor') {
      this.visitorTimeoutUsed = true;
    }
    this.form.patchValue({ localTimeoutUsed: this.localTimeoutUsed, visitorTimeoutUsed: this.visitorTimeoutUsed });
  }

  localGoal(){
    this.changeScore('local', 1);
    this.UpdateMatchEventsComponent('local', 'goal');
  }

  visitorGoal(){
    this.changeScore('visitor', 1);
    this.UpdateMatchEventsComponent('visitor', 'goal');
  }

  async ExitEventsPage() {
    this.utilsSvc.presentAlert({
    header: 'Salir',
    message: 'Si sales de esta pantalla se guardará el acta pero no los cambios que hayas realizado en esta página. ¿Estás seguro de querer salir? ',
    mode: 'ios',
    buttons: [
      {
        text: 'Cancelar',
    },
    {
      text: 'Sí, Deseo Salir',
      handler: () => {
        this.router.navigateByUrl('/main/minutes');
      }
    }
  ]
  });

}

async saveButtonAlert() {
  this.utilsSvc.presentAlert({
  header: 'Guardar',
  message: '¿Estás seguro de querer guardar los cambios? Si guardas los cambios se guardará el acta.',
  mode: 'ios',
  buttons: [
    {
      text: 'Cancelar',
  },
  {
    text: 'Sí, Deseo Guardarlos',
    handler: () => {
      this.updateMinutes();
      this.router.navigateByUrl('/main/minutes');
    }
  }
]
});

}



  async loadMostRecentActa() {
    const path = `users/${this.user.uid}/minutes`;
    this.mostRecentActaId = await this.firebaseSvc.getMostRecentActaId(path);
  }

  async updateMinutes() {
    if (this.form.valid) {
      await this.loadMostRecentActa();

      if (!this.mostRecentActaId) {
        console.error("No se pudo obtener el ID de la acta más reciente.");
        return;
      }

      let path = `users/${this.user.uid}/minutes/${this.mostRecentActaId}`;

      const loading = await this.utilsSvc.loading();
      await loading.present();

      delete this.form.value.idActa;

      this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {  
        this.utilsSvc.presentToast({
          message: 'El producto ha sido actualizado', 
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
      });
    }
  }

  UpdateMatchEventsComponent(team: 'local' | 'visitor', event: 'goal' | 'redCard' | 'yellowCard') {
    this.utilsSvc.presentModal({
      component: UpdateMatchEventsComponent,
      cssClass: 'modal-class',
      componentProps: {
        teamToUpdate: team,
        typeOfEvent: event,
      },
    })
  }
}
