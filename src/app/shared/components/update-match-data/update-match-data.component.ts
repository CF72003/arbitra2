import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-update-match-data',
  templateUrl: './update-match-data.component.html',
  styleUrls: ['./update-match-data.component.scss'],
})
export class UpdateMatchDataComponent  implements OnInit {

  @Input() actaId: string;

  form = new FormGroup({
    idActa: new FormControl(''),
    place: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    journey: new FormControl(0, [Validators.required]),
    date: new FormControl(new Date, [Validators.required]),
    startTime: new FormControl(new Date(), [Validators.required]),
    startSecondTime: new FormControl(new Date(), [Validators.required]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;


  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
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