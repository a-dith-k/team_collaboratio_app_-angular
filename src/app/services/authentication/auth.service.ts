import { userRegistrationDto } from '../../dtos/userRegistrationDto';
import {BehaviorSubject, Observable, Observer, of} from 'rxjs';
import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { UserRegistrationResponse} from '../../dtos/userRegistrationResponse';
import {LoginRequestDto} from "../../dtos/LoginRequestDto";
import {LoginResponseDto} from "../../dtos/LoginResponseDto";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private  baseUrl="http://localhost:8081/auth";

  private isLoggedInSubject=new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$=this.isLoggedInSubject.asObservable();

  private currentUserSubject=new BehaviorSubject<string>(this.currentUser());
  currentUser$=this.currentUserSubject.asObservable();

  private jwtHelper;
  private readonly token;

  constructor(private httpClient:HttpClient,private router:Router,private injector:Injector) {
    this.token=localStorage.getItem('token') as string;
    this.jwtHelper=new JwtHelperService();

  }

  get IsLoggedInSubject(){
    return this.isLoggedInSubject;
  }

  get CurrentUserSubject (){
    return this.currentUserSubject;
  }



  //  headers= new HttpHeaders()
  // .set('content-type', 'application/json')
  // .set('Access-Control-Allow-Origin', '*');

  private  options={
    headers:{
      'content-Type': "application/json",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods":"POST, GET, PUT",
      // "Access-Control-Allow-Headers": "Content-Type"
    }
  }



  registerUser(userRegistrationRequest:userRegistrationDto):Observable<UserRegistrationResponse>{
    console.log("confirmation email request for "+userRegistrationRequest.email);
    console.log(this.options)
    let headers:HttpHeaders=new HttpHeaders();
    headers.set('content-Type',"application/json");
   return this.httpClient
   .post(this.baseUrl+"/register",JSON.stringify(userRegistrationRequest),{
     headers: {'Content-Type':'application/json; charset=utf-8'}
   }
   ) as Observable<UserRegistrationResponse>;


  }

  verifyUser(verificationLink: string) {
    console.log(verificationLink)

   return this.httpClient.post(this.baseUrl+"/verify",null,{params:{
     verificationString:verificationLink
     },
     headers: {'Content-Type':'application/json; charset=utf-8'}
   });
  }


  authenticateUser(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {


    return this.httpClient
      .post(this.baseUrl+"/authenticate",JSON.stringify(loginRequest),
      {headers: {'Content-Type': 'application/json; charset=utf-8'}}) as Observable<LoginResponseDto>
  }



  isLoggedIn():boolean {
    let token= localStorage.getItem('token');
    if(!token)return false;

    this.jwtHelper=new JwtHelperService();
    let isExpired=this.jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  logOut() {
    this.router.navigateByUrl("/",).then(res=>console.log(res)).catch(err=>console.log(err))
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    // this.CurrentUserSubject.next("");
  }

  currentUser(){
    let token= localStorage.getItem('token');
    if(!token)return null;

    let helper
      =new JwtHelperService();
    return helper.decodeToken(token).sub;
  }

  resendEmail(email: string) {
    return this.httpClient.post(this.baseUrl+'/resend',
      {params:{email: email}});
  }

  getCurrentUserEmail(){
    let decodeToken =this.jwtHelper.decodeToken(this.token);
    return decodeToken.sub;
  }
}

