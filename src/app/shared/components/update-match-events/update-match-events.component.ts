import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-update-match-events',
  templateUrl: './update-match-events.component.html',
  styleUrls: ['./update-match-events.component.scss'],
})
export class UpdateMatchEventsComponent  implements OnInit {

  @Input() teamToUpdate: string;
  @Input() typeOfEvent: string;

  user = {} as User;

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  mostRecentActaId: string;
  idEvent: string;

  form = new FormGroup({
    idActa: new FormControl(null, [Validators.required],),
    typeEvent: new FormControl(null, [Validators.required]),
    team: new FormControl(null,  [Validators.required]),
    player: new FormControl(0, [Validators.required]),
    minute: new FormControl(0, [Validators.required]),
    reason: new FormControl(null)
  })

  constructor() { }

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    const path = `users/${this.user.uid}/minutes`;
    this.getMinutesToUpdate(path);
    console.log(this.teamToUpdate);
    console.log(this.typeOfEvent);


    this.form.get('typeEvent').setValue(this.typeOfEvent); 
    this.form.get('team').setValue(this.teamToUpdate);

    console.log(this.form.value.team);
    console.log(this.form.value.typeEvent);
  }


  async getMinutesToUpdate(path: string) { 
    this.form.get('idActa').setValue(await this.firebaseSvc.getMostRecentActaId(path));
  }

  async createEvents() {


      let path = `users/${this.user.uid}/minutes/${this.form.value.idActa}/events`;

      const loading = await this.utilsSvc.loading();
      await loading.present();
      console.log(this.form.value);
      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {  
        this.idEvent = res.id;
        this.utilsSvc.presentToast({
          message: 'Se ha guardado el Evento Correctamente', 
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
        this.utilsSvc.dismissModal();

      }).finally(() => {
        this.utilsSvc.dismissModal();
        loading.dismiss();

      })

}


}
