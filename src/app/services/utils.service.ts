import { Injectable, inject, Component } from '@angular/core';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  router = inject(Router);
  alertCtrl = inject(AlertController);


  async presentAlert(opts?: AlertOptions){
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }

  // =================== Loading =====================
  loading() {
    return this.loadingCtrl.create({ spinner: 'circles' });
  }

  // =================== Toast =====================
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // =================== Enruta a cualquier página disponible =====================
  routerLink(url) {
    return this.router.navigateByUrl(url);
  }

  // =================== Guardar en LocalStorage =====================
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // =================== Obetener de LocalStorage =====================
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  // =================== Modal =====================
  async presentModal(opts: {component: any; cssClass?: string; componentProps?: any}) {
    const modal = await this.modalCtrl.create({
      component: opts.component,
      cssClass: opts.cssClass,
      componentProps: opts.componentProps
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if(data) return data;

  }

  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }
}

