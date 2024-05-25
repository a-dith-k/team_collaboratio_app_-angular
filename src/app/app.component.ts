import { Component } from '@angular/core';
import {NavbarPublicComponent} from "./components/navbar-public/navbar-public.component";
import {NavbarPrivateComponent} from "./components/navar-private/navbar-private.component";
import {AuthService} from "./services/authentication/auth.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn$:Observable<boolean>=new Observable<boolean>();
  currentUser$:Observable<string>=new Observable<string>();

  constructor(private AuthService:AuthService) {
  }

  ngOnInit(){
    this.isLoggedIn$=this.authService.isLoggedIn$;
    this.currentUser$=this.authService.currentUser$;

    // this.authService.currentUser$.subscribe(currentUser=>{
    //   this.currentUser=currentUser;
    // })

  }
  get authService(){
    return this.AuthService;
  }

  protected readonly NavbarPublicComponent = NavbarPublicComponent;
  protected readonly NavbarPrivateComponent = NavbarPrivateComponent;
}
