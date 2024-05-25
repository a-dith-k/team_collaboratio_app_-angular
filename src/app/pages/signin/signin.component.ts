import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/authentication/auth.service";
import {LoginRequestDto} from "../../dtos/LoginRequestDto";
import {LoginResponseDto} from "../../dtos/LoginResponseDto";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  ngOnInit(){
    if(this.authService.isLoggedIn())
      this.router.navigate(['dashboard'])
  }


  constructor(private authService: AuthService,private router:Router, private messageService: MessageService) {
  }
  signInForm=new FormGroup({
    username:new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password:new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}')])
  });

  get username(){
    return this.signInForm.get('username');
  }

  get password(){
    return this.signInForm.get('password');
  }

  authenticate(){
    this.authService.authenticateUser(this.signInForm.value as LoginRequestDto).pipe().subscribe(
      {
        next:(res:LoginResponseDto)=>{
          console.log(res)
          localStorage.setItem('token',res.token);
          this.authService.IsLoggedInSubject.next(true);
          this.router.navigate(['/dashboard'])
        },
        error:err=>{
          console.log(err)
          if(err.status ===423){
            if((err.error as string).includes('unverified'))
              this.showMessage('error','Disabled',"you have not verified your email");
          else
              this.showMessage('error','Disabled',"your account is disabled");
          }

          if(err.status ===404)
            this.showMessage('error','Not Found',"user not found with given email");
          if(err.status >=500)
              this.showMessage('error','Server Error',"Something went wrong");
          if(err.status ===400)
            this.showMessage('error','Bad Credentials',"Please enter the correct credentials");
        }
      }
    )
  }

  showMessage(type:string,summary: string,detail:string) {
    this.messageService.add({severity: type, summary:summary , detail: detail});
  }



}
