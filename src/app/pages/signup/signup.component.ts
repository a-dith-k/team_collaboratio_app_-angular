
import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import {RawFormValue, userRegistrationDto} from 'src/app/dtos/userRegistrationDto';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';





@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  loading: boolean = false;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router, private dataService: DataService) {
  }


  ngOnInit() {
    if (this.authService.isLoggedIn())
      this.router.navigate(['dashboard'])


  }


  signUpForm = new FormGroup({
    emailId: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}')])
  });

  get emailId() {
    return this.signUpForm.get("emailId");
  }

  get password() {
    return this.signUpForm.get("password");
  }


  formSubmit() {
    this.loading = true;
    if (this.emailId != null && this.emailId.value != null) {
      let userRegistrationRequest = new userRegistrationDto(this.signUpForm.value as RawFormValue);

      this.authService.registerUser(userRegistrationRequest).subscribe({
        next: data => {
          if (data.id) {
            console.log(data.id)
            this.alertSuccess();
            this.loading = false;
          }
        },
        error: err => {
          console.log(err)
          this.loading = false;
          setTimeout(() => {
            if (err.status == 409)
              this.showMessage('error','Invalid Request',err.error as string)
            if(err.status >= 500)
              this.showMessage('error','Server Error',"Something went wrong")
          }, 1)

        }
      })
    }
  }


  alertSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Registered'});
    this.dataService.setMessage(this.emailId?.value as string);
    this.router.navigate(['/thankyou']);
  }

  alertDuplicateUser(error: string) {
    this.messageService.add({severity: 'error', summary: 'Invalid Request', detail: error});
  }

  showMessage(type:string,summary: string,detail:string) {
    this.messageService.add({severity: type, summary:summary , detail: detail});
  }


}


