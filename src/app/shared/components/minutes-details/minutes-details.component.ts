import { FormControl, FormGroup } from '@angular/forms';
import { Minutes } from './../../../models/minutes.model';
import { Component, Input, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { PdfService } from 'src/app/services/pdf.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-minutes-details',
  templateUrl: './minutes-details.component.html',
  styleUrls: ['./minutes-details.component.scss'],
})
export class MinutesDetailsComponent  implements OnInit {

  @Input() minutes: Minutes;

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  router = inject(Router);
  dataService = inject(DataService);
  pdfSvc = inject(PdfService);
  user = {} as User;
  event: any[] = [];
  loading : boolean = false;

  form = new FormGroup({
    id: new FormControl(''),
    place: new FormControl(''),
    category: new FormControl(''),
    journey: new FormControl(0),
    date: new FormControl(new Date),
    startTime: new FormControl(new Date()),
    startSecondTime: new FormControl(new Date()),
    homeName: new FormControl(''),
    homePlayingColour: new FormControl(''),
    homeColourGKPlayer: new FormControl(''),
    homeDungareesColour: new FormControl(''),
    visitorName: new FormControl(''),
    visitorPlayingColour: new FormControl(''),
    visitorColourGKPlayer: new FormControl(''),
    visitorDungareesColour: new FormControl(''),
    localScore:new FormControl(0),
    localFoulScore: new FormControl(0),
    visitorScore: new FormControl(0),
    visitorFoulScore: new FormControl(0),
    localTimeoutUsed: new FormControl(false),
    visitorTimeoutUsed: new FormControl(false),
    incidents: new FormControl(''),
  })

  constructor() { }

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    if (this.minutes) {
      this.form.setValue(this.minutes)
    }
    this.loadEvents();
  }

  generatePdf() {
    this.pdfSvc.generatePDF(this.minutes, this.event , this.user.username);
  }


  async loadEvents() {
    const path = `users/${this.user.uid}/minutes/${this.minutes.id}/events`;
    this.firebaseSvc.getCollectionData(path).subscribe((data: any[]) => {
      this.event = data.map(event => {
        return {
          ...event,
        };
      });
      this.loading = false;
      console.log(this.event);
    });
  }

  exitButton() {
    this.utilsSvc.dismissModal();
  }

}
