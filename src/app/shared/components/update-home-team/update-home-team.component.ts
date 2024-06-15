import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Minutes } from 'src/app/models/minutes.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-update-home-team',
  templateUrl: './update-home-team.component.html',
  styleUrls: ['./update-home-team.component.scss'],
})
export class UpdateHomeTeamComponent  implements OnInit {

  @Input() actaId: string;

  @Input() minutes: Minutes;


  form = new FormGroup({
    idActa: new FormControl(null),
    homeName: new FormControl(null, [Validators.required]),
    homePlayingColour: new FormControl(null, [Validators.required]),
    homeColourGKPlayer: new FormControl(null, [Validators.required]),
    homeDungareesColour: new FormControl(null, [Validators.required]),
  })
  
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    if (this.minutes) this.form.setValue(this.minutes);
  }
  


  async submit() {
    if (this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
        await this.firebaseSvc.updateUser(this.form.value.idActa);
        let uid = res.user.uid;

        console.log(res);
      }).catch(err => {
        console.log(err);
        this.utilsSvc.presentToast({message: err.message, color: 'danger', duration: 3000, position: 'middle', icon: 'warning'});
      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  async updateMinutes() {
    if (this.form.valid){
      
      let path = `users/${this.user.uid}/minutes/${this.actaId}`

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


        this.utilsSvc.dismissModal();
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

}
