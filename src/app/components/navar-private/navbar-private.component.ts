import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../services/authentication/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, PrimeIcons} from "primeng/api";


@Component({
  selector: 'app-navar-private',
  templateUrl: './navbar-private.component.html',
  styleUrls: ['./navbar-private.component.css']
})
export class NavbarPrivateComponent implements OnInit{


  constructor(private AuthService:AuthService) {
  }

  $userIconName=this.authService.currentUser$
  addButton:MenuItem={}
  searchInput: string="";
  isSearching: boolean=false;
  teams: Team[] = [];
  profileLink= ['/dashboard', { outlets: {
    'dash': ['profile']
  }}];

  ngOnInit() {

      this.addButton={
        label: 'New',
        icon: PrimeIcons.PLUS,
      }

      this.teams=[
        {name:'Teams1',profileUrl:"url"},
        {name:'Teams2',profileUrl:"url"}
      ]
  }

  get authService(){
    return this.AuthService;
  }

  search() {
    this.isSearching=true;
    console.log(this.searchInput)
  }
}

interface  Team{
  name:string;
  profileUrl:string;
}
