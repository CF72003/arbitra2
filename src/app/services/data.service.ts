import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private minutesData: any;

  constructor() { }
  setData(minutes: any) {
    this.minutesData = minutes; // Guarda los datos en la variable privada
  }

  getData() {
    return this.minutesData; // Retorna los datos almacenados
  }
}