import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';
import { Notify } from 'notiflix';
@Component({
  selector: 'app-navadmin',
  templateUrl: './navadmin.component.html',
  styleUrls: ['./navadmin.component.scss']
})
export class NavadminComponent {
  logo:string = "../../../../assets/img/yolotl.webp";
  lista:any = [
    {url: '/admin/noticias', icon:'bi bi-newspaper me-2', name:'Noticias'},
    {url: '/admin/noticias/crear', icon:'bi bi-patch-plus-fill me-2', name:'Agregar'},
  ]
  constructor(
    private afAuth:Auth,
    private cooksrv:CookieService
  ){

  }
   logout() {
    this.afAuth.signOut().then(() => {
      // La sesión se cerró correctamente
      try {
        this.cooksrv.deleteAll('/','localhost')
        Notify.success("Cesión cerrado correctamente")
        setTimeout(() => {
          window.location.href='login'
        }, 200);
      } catch (error) {

      }
      // Aquí puedes realizar cualquier otra acción que necesites después de cerrar la sesión
    }).catch(() => {
      // Ocurrió un error al cerrar la sesión
      Notify.failure('Error al cerrar la sesión');
    });
  }
}
