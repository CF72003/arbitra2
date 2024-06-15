import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, updateDoc, collection, collectionData, query, deleteDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { addDoc, getDocs, limit, orderBy } from 'firebase/firestore';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);
  storage = inject(AngularFireStorage);

  // ===================== Autenticación =====================

  // ===================== Acceso =====================
  getAuth() {
    return getAuth();
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  // ===================== Registro =====================
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ===================== Actualizar Usuario =====================
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  // ===================== Recuperar contraseña =====================
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // ===================== Cierre de sesión =====================
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/welcome');
  }

  // ===================== Base de datos =====================

  getActaDetails(userId: string, actaId: string): Observable<any> {
    const path = `users/${userId}/minutes/${actaId}`;
    return this.firestore.doc(path).valueChanges();
  }
  // ============= Obtener documento de una colección =====
  getCollectionData(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(), path);
    const q = query(ref, orderBy('date', 'desc'))
    return collectionData(query(ref, collectionQuery), {idField: 'id'});
  }

// Ajuste en el servicio de Firebase para obtener la acta más reciente
async getMostRecentActaId(path: string): Promise<string> {
  const ref = collection(getFirestore(), path);
  const q = query(ref, orderBy('date', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);
  const mostRecentDoc = querySnapshot.docs[0];
  return mostRecentDoc ? mostRecentDoc.id : null;
}


  // ===================== Setear un documento =====================
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  // ===================== Actualizar un documento =====================
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

    // ===================== Borrar un documento =====================
    deleteDocument(path: string) {
      return deleteDoc(doc(getFirestore(), path));
    }
  // ===================== Obtener un documento =====================
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // ===================== Agregar Documento =====================
  async addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }
  //==================== Eliminar Documento ====================

}
