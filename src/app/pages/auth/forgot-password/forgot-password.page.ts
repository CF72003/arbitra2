import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);


  ngOnInit() {
  }


  async submit() {
    if (this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {
        this.utilsSvc.routerLink('/auth');
        this.utilsSvc.presentToast({message: `Se ha enviado un correo a ${this.form.value.email}`, color: 'success', duration: 2000, position: 'middle', icon: 'send-outline'});
        this.form.reset();
      }).catch(err => {
        console.log(err);
        this.utilsSvc.presentToast({message: err.message, color: 'danger', duration: 3000, position: 'middle', icon: 'warning'});
      }).finally(() => {
        loading.dismiss();
      })
    }
  }
}
