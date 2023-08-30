import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Notify} from 'notiflix'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  datalogged?:any
  auth = getAuth();
  user?:any = []
  Form: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });
  datos: string[] = [];
  resultados: { usuario: string, existe: boolean, password:string }[] = [];

  constructor(
    private adminsrv:AdminService,
    private cookisrv:CookieService,
  ){}

  async login(){
    const user = {
      usuario:this.Form.get('usuario')?.value,
      password:this.Form.get('password')?.value
    }
      try {
        const get = await this.adminsrv.getadmins(this.Form.value);
        if (get.size > 0 ) {
          get.forEach((doc) => {
            this.datalogged = doc.data();
          })
          signInWithEmailAndPassword(this.auth,user.usuario,user.password).then((usercredential)=>{
            this.user = usercredential.user;
            return this.user.getIdToken();
          }).then((token)=>{
            if (token) {
              this.cookisrv.set('token', token , 7 );
            }
          }).catch(()=>{
            createUserWithEmailAndPassword(this.auth,user.usuario,user.password).then((usercredential)=>{
              this.user = usercredential.user;
              return this.user.getIdToken();
            }).then((token)=>{
              if (token) {
                this.cookisrv.set('token', token , 7);
              }
            })  
          })
          if (this.datalogged) {
            Notify.success("Bienvenido", this.user);
            setTimeout(() => {
             location.href = 'admin/noticias'
            }, 1000);
          }
        }else{
          Notify.failure("Datos incorrectos o inexistentes")
          this.Form.get('usuario')?.setValue(''),
          this.Form.get('password')?.setValue('')
        }
      } catch (error) {
        Notify.failure("Ha ocurrido un error inesperado")
      }
  }

  ngOnInit() {
    const token =this.cookisrv.get('token')
    if (token) {
      window.location.href = 'admin/noticias'
    }
  }
}
