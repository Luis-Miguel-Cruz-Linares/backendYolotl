import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { Noticia } from 'src/app/interfaces/noticia/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(
    private firestore:Firestore
  ) { }
  getnoticia(){
    const ref = collection(this.firestore,'noticias')
    const get = getDocs(ref);
  }
  addnoticia(noticia:Noticia){
    const ref = collection(this.firestore,'noticias')
    const añadir = addDoc(ref,noticia);
    return añadir
  }
  updatenoticia(){

  }
  deletenoticia(){

  }
}
