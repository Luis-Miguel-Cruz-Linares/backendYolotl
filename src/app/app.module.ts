import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavadminComponent } from './view/components/navadmin/navadmin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './view/pages/login/login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NoticiasComponent } from './view/pages/noticias/noticias.component';
import { ModificarComponent } from './view/pages/noticias/modificar/modificar.component';
import { CrearComponent } from './view/pages/noticias/crear/crear.component';
import { AuthModule} from '@angular/fire/auth';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { DeleteComponent } from './view/components/delete/delete.component';
import {HttpClientModule} from '@angular/common/http'
@NgModule({
  declarations: [
    AppComponent,
    NavadminComponent,
    LoginComponent,
    NoticiasComponent,
    ModificarComponent,
    CrearComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    AuthModule,
    CommonModule,
    HttpClientModule
    ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
