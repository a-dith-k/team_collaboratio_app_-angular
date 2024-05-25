import {Component, ViewChild} from '@angular/core';
import {Sidebar} from "primeng/sidebar";
import {AuthService} from "../../services/authentication/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  taskLink= ['/dashboard', { outlets: {
      'dash': ['tasks']
    }}];
  homeLink:string[]=['/dashboard'];
  inboxLink= ['/dashboard', { outlets: {
      'dash': ['inbox']
    }}];

  constructor(private authService:AuthService,private router:Router) {

  }

  ngOnInit() {

  }

}
