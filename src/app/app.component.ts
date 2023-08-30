import { Component, Injectable, OnInit, inject } from '@angular/core';
  import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class AppComponent implements OnInit {
  // private auth: Auth = inject(Auth);
  constructor(
    private auth:Auth
  ){}
  title = 'yolotl-ng';
  ngOnInit(): void {
  }
}
