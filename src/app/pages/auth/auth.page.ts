import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
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

      this.firebaseSvc.signIn(this.form.value as User).then(res => {
        this.getUserInfo(res.user.uid);
      }).catch(err => {
        console.log(err);
        this.utilsSvc.presentToast({message: err.message, color: 'danger', duration: 3000, position: 'middle', icon: 'warning'});
      }).finally(() => {
        loading.dismiss();
      })
    }
  }


  async getUserInfo(Uid: string){ {
    if (this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${Uid}`

      this.firebaseSvc.getDocument(path).then((user: User) => {
        
        this.utilsSvc.saveInLocalStorage('user', user);
        this.utilsSvc.routerLink('/main/home');
        this.form.reset();

        this.utilsSvc.presentToast({message: `Te damos la bienvenida ${user.username}`, color: 'success', duration: 2000, position: 'middle', icon: 'success'});

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
