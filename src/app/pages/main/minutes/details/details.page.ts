import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { DataService} from 'src/app/services/data.service';
import { User } from 'src/app/models/user.model';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  actaId: string;
  user = {} as User;
  actaData: any;
  minutes: any;

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  dataService = inject(DataService);

  loading: boolean = false;
  



  constructor() { }

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    this.minutes = this.dataService.getData(); // Recupera los datos del servicio
    console.log(this.minutes); // Verifica en la consola si los datos se han recuperado correctamente
  }



}


