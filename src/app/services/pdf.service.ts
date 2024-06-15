import { Event } from 'src/app/models/event.model';
import { Injectable, inject } from '@angular/core';
import  { jsPDF, jsPDFAPI } from 'jspdf';
import { Minutes } from '../models/minutes.model';
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  router = inject(Router);
  dataService = inject(DataService);
  user = {} as User;
  event: any[] = [];  
  loading: boolean = false;


  constructor() { }

  generatePDF(minutes: Minutes, events: Event[], user: string) {
    const documentDefinition = {
      content: [
        { text: 'Acta del Partido', style: 'header' },
        { text: `Árbitro: ${user}` },
        { text: `Resultado: ${minutes.homeName} ${minutes.localScore} - ${minutes.visitorScore} ${minutes.visitorName}` },
        { text: `Jornada: ${minutes.journey}` },
        { text: `Fecha: ${new Date(minutes.date).toLocaleDateString()}` },
        { text: `Hora Inicio: ${minutes.startTime}` },
        { text: `Hora Inicio Segunda Parte: ${minutes.startSecondTime}` },
        { text: 'Equipo Local', style: 'subheader' },
        { text: `Nombre: ${minutes.homeName}` },
        { text: `Color: ${minutes.homePlayingColour}` },
        { text: `Color del Portero: ${minutes.homeColourGKPlayer}` },
        { text: `Color de los Petos: ${minutes.homeDungareesColour}` },
        { text: `Faltas: ${minutes.localFoulScore}` },
        { text: `¿Usó Tiempo de Descanso?: ${minutes.localTimeoutUsed ? 'Sí' : 'No'}` },
        { text: 'Equipo Visitante', style: 'subheader' },
        { text: `Nombre: ${minutes.visitorName}` },
        { text: `Color: ${minutes.visitorPlayingColour}` },
        { text: `Color del Portero: ${minutes.visitorColourGKPlayer}` },
        { text: `Color de los Petos: ${minutes.visitorDungareesColour}` },
        { text: `Faltas: ${minutes.visitorFoulScore}` },
        { text: `¿Usó Tiempo de Descanso?: ${minutes.visitorTimeoutUsed ? 'Sí' : 'No'}` },
        { text: `Incidentes: ${minutes.incidents}`, style: 'incidents' },
        { text: 'EVENTOS', style: 'subheader' },
        { text: 'Eventos del Equipo Local', style: 'subheader' },
        ...this.formatEvents(events.filter(event => event.team === 'local')),
        { text: 'Eventos del Equipo Visitante', style: 'subheader' },
        ...this.formatEvents(events.filter(event => event.team === 'visitor')),
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        incidents: {
          fontSize: 12,
          margin: [0, 10, 0, 10]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download(`acta-${minutes.homeName}-vs-${minutes.visitorName}-jornada-${minutes.journey}.pdf`);
  }

  private formatEvents(events: Event[]) {
    return events.map(event => {
      if (event.typeEvent === 'goal') {
        return `Gol del Jugador Nº ${event.player} (Minuto: ${event.minute})`;
      }
      if (event.typeEvent === 'redCard') {
        return `Tarjeta Roja al Jugador Nº ${event.player} (Minuto: ${event.minute}, Motivo: ${event.reason})`;
      }
      if (event.typeEvent === 'yellowCard') {
        return `Tarjeta Amarilla al Jugador Nº ${event.player} (Minuto: ${event.minute}, Motivo: ${event.reason})`;
      }
      return '';
    });
  }
}


