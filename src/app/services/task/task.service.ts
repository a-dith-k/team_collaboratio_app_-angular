import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnInit {

  private readonly baseUrl:string;

  tasks:Task[] = [];

  private authToken:string="";
  constructor(private httpClient:HttpClient) {
    this.baseUrl='http://localhost:8081/tasks'
    let authToken=localStorage.getItem('token');
    if(authToken!=null)
        this.authToken=authToken;

  }

  ngOnInit() {

  }

  getTasks(email:string):Observable<Task[]>{
    return of([{id:2,name:"First Task",projectName:"Demo 2",deadline:"Mar 13",isCompleted:false,isOverdue:false}]) as Observable<Task[]> ;
    // return this
    //   .httpClient
    //   .get(`${this.baseUrl}`,
    //     {headers:
    //                 {'Content-Type': 'application/json',
    //                   Authorization: 'Bearer ' + this.authToken
    //                 },
    //               params:{
    //                   email:email
    //               }
    //         }) as Observable<Task[]>
  }


  setTaskCompleted(id: number) {

    // this.httpClient.post()
  }
}

export interface Task{
  id:number;
  isOverdue: boolean;
  isCompleted: boolean;
  name:string;
  description:string;
  deadline:string;
  projectName:string;

}
