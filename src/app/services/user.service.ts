import {Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

import {AuthService} from "./authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  baseUrl="http://localhost:8081/users"
  userEmail:string=""
  token:string;
  constructor(private http:HttpClient,private authService:AuthService) {
    this.token=localStorage.getItem('token') as string;
    this.userEmail=authService.currentUser();

  }

  getUserData():Observable<UserProfileData> | null {
    if(this.userEmail==null)
      return  null;
    return this.http.get(`${this.baseUrl}/${this.userEmail}`,{
      headers:{
        Authorization: "Bearer " + this.token
      }
    }) as Observable<UserProfileData>

  }



  updateName(firstName: string, lastName: string) {

    return this.http.put(this.baseUrl+"/update-by-fields",null,{params:{
        firstName:firstName,
        lastName:lastName,
        email:this.userEmail
      },
      headers: {
      Authorization: "Bearer " + this.token,
      'Content-Type':'application/json; charset=utf-8'}
    });


  }

  updateAboutMe(aboutMe: string) {
    return this.http.put(this.baseUrl+"/update-by-fields",null,
      {params:{
            aboutMe:aboutMe,
            email:this.userEmail
        },
              headers: {
              Authorization: "Bearer " + this.token,
              'Content-Type':'application/json; charset=utf-8'
      }
    });
  }

  updateJobTitle(jobTitle: string) {
    return this.http.put(this.baseUrl+"/update-by-fields",null,
      {params:{
          jobTitle:jobTitle,
          email:this.userEmail
        },
        headers: {
          Authorization: "Bearer " + this.token,
          'Content-Type':'application/json; charset=utf-8'
        }
      });
  }

  updateDepartment(department: string) {
    return this.http.put(this.baseUrl+"/update-by-fields",null,
      {params:{
          department: department,
          email:this.userEmail
        },
        headers: {
          Authorization: "Bearer " + this.token,
          'Content-Type':'application/json; charset=utf-8'
        }
      });
  }
}

export interface UserProfileData{
  jobTitle: string;
  firstName:string,
  lastName:string,
  department:string,
  email:string,
  aboutMe:string
}
