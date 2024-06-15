import { Component, Input, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  
  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal: boolean;

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);

  ngOnInit() {}

  dismissModal(){
    this.utilsSvc.dismissModal();
  }

  async confirmExitModal() {
    this.utilsSvc.presentAlert({
    header: 'Salir',
    message: '¿Estas seguro de querer salir?. Los cambios no guardados se perderán.',
    mode: 'ios',
    buttons: [
      {
        text: 'Cancelar',
    },
    {
      text: 'Sí, Salir',
      handler: () => {
        this.dismissModal();
      }
    }
  ]
  });

}

  logOut() {
    this.firebaseSvc.signOut();
  }
}
