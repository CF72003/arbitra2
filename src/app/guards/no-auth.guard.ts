import {
  CanActivate,
  UrlTree,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  GuardResult,
  MaybeAsync,
} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class noAuthGuard implements CanActivate {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<UrlTree | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return new Promise((resolve) => {
      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
        if (!auth) resolve(true); 
        
        else {
          this.utilsSvc.routerLink('/main/home');
          resolve(false);
        }
      });
    });
  }
}