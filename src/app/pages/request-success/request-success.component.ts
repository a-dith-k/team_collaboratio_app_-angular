import { DataService } from 'src/app/services/data/data.service';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/authentication/auth.service";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

@Component({
  selector: 'app-request-success',
  templateUrl: './request-success.component.html',
  styleUrls: ['./request-success.component.css']
})
export class RequestSuccessComponent implements OnInit{

  email:string="";

  ngOnInit() {
    if(this.email==="")
      this.router.navigate(['/signup'])

  }
  constructor(dataService:DataService,private router:Router,private authService:AuthService){
    dataService.Message.subscribe(val=>this.email=val);
  }

  timer:number=0;

  isTimerRunning:boolean=false;

  count:number=0;



  resendEmail(){
    this.authService.resendEmail(this.email).pipe().subscribe(res=>console.log(res));
    this.count++;
    this.isTimerRunning=true;
    this.startTimer(this.count*60);

  }
  interval:any;
  startTimer(timeout:number){
    this.timer=timeout;
    setTimeout(()=>{
      this.isTimerRunning=false;
      this.stopTimer();
    },timeout*1000)

     this.interval= setInterval(()=>{
        this.timer--;
    },1000)

  }

  stopTimer(){
    clearInterval(this.interval)
  }

}
