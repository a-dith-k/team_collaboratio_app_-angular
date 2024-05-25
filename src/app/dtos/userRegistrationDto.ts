
export class userRegistrationDto{
  email: string;
  password: string;
  firstName:string;
  lastName:string;

  constructor(formValue: RawFormValue) {
    this.email = formValue.emailId;
    this.password = formValue.password;
	this.firstName=formValue.emailId.slice(0,formValue.emailId.indexOf("@"));
	this.lastName="";
   
  }
}

export interface RawFormValue {
  emailId: string;
  password: string;
}