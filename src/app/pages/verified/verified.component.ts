import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { HttpResponse } from '@angular/common/http';
import {count} from "rxjs";

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.css']
})
export class VerifiedComponent {


  isVerified:boolean=false;
  errorMessage:string="";
  countDown:number=5;


  constructor(private route:ActivatedRoute,private authService:AuthService,private router:Router){

  }
  ngOnInit(){
    const routeParams = this.route.snapshot.paramMap;
    let verificationLink=routeParams.get('id') as string;
    this.authService
      .verifyUser(verificationLink)
      .pipe()
      .subscribe({
        next:success=>{
          const interval=setInterval(()=>this.countDown--,1000);
          setTimeout(()=>{
            clearInterval(interval);
            this.router.navigate(['/signin'])
          },5000);
          this.isVerified=true;
        },
        error:res=>{
          console.log(res.error+"h")
          if(res.error.error==='verified')
            this.errorMessage="the email is already verified ";
          else if(res.error.error==='invalid')
            this.errorMessage="the provided link is invalid please try again with correct url or resend the email";
          else if(res.error.error==='expired')
            this.errorMessage="the link is expired";
        }})


  }
}
