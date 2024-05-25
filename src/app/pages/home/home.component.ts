import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/authentication/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private router: Router,private authService: AuthService) {

  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn())
        this.router.navigate(['/dashboard'])
  }


}
