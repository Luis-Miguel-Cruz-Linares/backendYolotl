import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Admin } from 'src/app/interfaces/admin/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private firestore:Firestore
  ) { }

  getadmins(admin:Admin){
    const get = query(collection(this.firestore,'admins'),where("usuario","==",
    admin.usuario),where("password","==",admin.password));
    const q = getDocs(get)
    return q;
  }
}
