import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Firestore, collection, where,query, doc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { Loading, Notify } from 'notiflix';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  @Input()dato?:any = null
  @Output()cerrar = new EventEmitter;
  constructor(
    private firestore:Firestore
  ){}
  close(){
    // this.cerrar.emit()
    setTimeout(() => {
      this.cerrar.emit()
    }, 400);
  }
  delete(){
    const id = this.dato
    const r = doc(this.firestore,'noticias',id)
    deleteDoc(r)
    try {
      Loading.arrows("Eliminando");
      Notify.success("Eliminado con éxito");
      try {
        setTimeout(() => {
        Loading.remove();
          window.location.reload()
        }, 2000);
      } catch (error) {

      }

    } catch (error) {
      Notify.failure("Error al obtener el documento")
    }
  }

}
