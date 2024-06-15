import { UtilsService } from 'src/app/services/utils.service';
import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { Minutes } from 'src/app/models/minutes.model';
import { Timestamp } from 'firebase/firestore';
import { Router, RouterLink } from '@angular/router';
import { DataService} from 'src/app/services/data.service';
import { MinutesDetailsComponent } from 'src/app/shared/components/minutes-details/minutes-details.component';





@Component({
  selector: 'app-minutes',
  templateUrl: './minutes.page.html',
  styleUrls: ['./minutes.page.scss'],
})
export class MinutesPage implements OnInit {

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  router = inject(Router);
  dataService = inject(DataService);

  minutes: any[] = [];
  user = {} as User;
  loading: boolean = false;

  constructor() { }

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    this.loadActas();
  }

  doRefresh(event) {   
    setTimeout(() => {
      this.loadActas();
      event.target.complete();
    }, 1000);
  }

async loadActas() {
  const path = `users/${this.user.uid}/minutes`;
  this.firebaseSvc.getCollectionData(path).subscribe((data: any[]) => {
    this.minutes = data.map(minutes => {
      return {
        ...minutes,
        date: (minutes.date instanceof Timestamp) ? minutes.date.toDate() : minutes.date,
        startTime: (minutes.startTime instanceof Timestamp) ? minutes.startTime.toDate() : minutes.startTime,
        startSecondTime: (minutes.startSecondTime instanceof Timestamp) ? minutes.startSecondTime.toDate() : minutes.startSecondTime,
      };
    });
    this.loading = false;
  });
}

viewMinutesDetails(minutes: any){
  this.dataService.setData(minutes);
  this.router.navigateByUrl('main/minutes/details');
}


async confirmDeleteMinutes(actaId: string) {
    this.utilsSvc.presentAlert({
    header: 'Eliminar Acta',
    message: '¿Quieres eliminar esta Acta?',
    mode: 'ios',
    buttons: [
      {
        text: 'Cancelar',
    },
    {
      text: 'Sí, Eliminar esta Acta',
      handler: () => {
        this.deleteActa(actaId);
      }
    }
  ]
  });
}


async deleteActa(actaId: string) {
  const path = `users/${this.user.uid}/minutes/${actaId}`;
  const loading = await this.utilsSvc.loading();
  await loading.present();
  this.firebaseSvc.deleteDocument(path).then(() => {
    this.utilsSvc.presentToast({
      message: 'Acta eliminada correctamente',
      color: 'success',
      duration: 2000,
      position: 'middle',
      icon: 'checkmark-circle-outline'
    });
    this.loadActas(); 
    loading.dismiss();
  }).catch(err => {
    console.log(err);
    loading.dismiss();
    this.utilsSvc.presentToast({
      message: err.message,
      color: 'danger',
      duration: 3000,
      position: 'middle',
      icon: 'warning'
    });

  });
}

minuteDetails(minutes?: Minutes){
  this.utilsSvc.presentModal({
    component: MinutesDetailsComponent,
    cssClass: 'modal-class',
    componentProps: {
      minutes
    },
  })
}

}
