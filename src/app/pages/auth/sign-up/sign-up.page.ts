import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new  FormControl(''),
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);


  ngOnInit() {
  }


  async submit() {
    if (this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
        await this.firebaseSvc.updateUser(this.form.value.username);
        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);
        this.setUserInfo(uid);
        console.log(res);
      }).catch(err => {
        console.log(err);
        this.utilsSvc.presentToast({message: err.message, color: 'danger', duration: 3000, position: 'middle', icon: 'warning'});
      }).finally(() => {
        loading.dismiss();
      })
    }
  }


  async setUserInfo(Uid: string){ {
    if (this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${Uid}`
      delete this.form.value['password'];

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {
        
        this.utilsSvc.saveInLocalStorage('user', this.form.value);
        this.utilsSvc.routerLink('/main/home');
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
}