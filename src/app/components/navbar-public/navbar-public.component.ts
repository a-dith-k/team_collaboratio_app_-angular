import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../services/authentication/auth.service";

@Component({
  selector: 'app-navbar-public',
  templateUrl: './navbar-public.component.html',
  styleUrls: ['./navbar-public.component.css']
})
export class NavbarPublicComponent {

  // isLoggedIn$:Observable<boolean>=new Observable<boolean>();
  // currentUser$:Observable<string>=new Observable<string>();
  constructor(private AuthService:AuthService) {
  }
  //
  // ngOnInit(){
  //   this.isLoggedIn$=this.authService.isLoggedIn$;
  //   this.currentUser$=this.authService.currentUser$;
  //
  //   // this.authService.currentUser$.subscribe(currentUser=>{
  //   //   this.currentUser=currentUser;
  //   // })
  //
  // }
  get authService(){
    return this.AuthService;
  }

}
