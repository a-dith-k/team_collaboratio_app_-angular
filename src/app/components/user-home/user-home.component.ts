import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Task, TaskService} from "../../services/task/task.service";
import {AuthService} from "../../services/authentication/auth.service";
import {UserService} from "../../services/user.service";

interface Time {
  time: number;
  greeting: string;
}

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  dateArray=[
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
  ]

  timArray:Time[]=[
    {
      time:12,
      greeting:'Morning',
    },
    {
      time:17,
      greeting:'Afternoon',
    },
    {
      time:24,
      greeting:'Evening',
    },

  ]

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  localDate=new Date().getDate();
  localDay:string=this.dateArray[new Date().getDay()];
  localMonth=this.monthNames[new Date().getMonth()];
  greeting:string=this.timArray.find(time=>new Date().getHours()<time.time)?.greeting as string;

  items: MenuItem[] =[];

  tasks:TaskHome[]=[]
  activeItem!: MenuItem;
  $appUser=this.authService.currentUser$;




  constructor(private taskService:TaskService,private authService:AuthService,private userService:UserService){


  }

  ngOnInit(): void {
    this.items = [
      { label: 'Upcoming'},
      { label: 'Overdue' },
      { label: 'Completed' },
    ]

    this.activeItem=this.items[0];

    this.taskService.getTasks("").subscribe({next:res=>{
        res.forEach(t=> {
          if(!t.isCompleted && !t.isOverdue)
            this.tasks.push(new TaskHome(t))
        })
      },error:err=>{

      }})


  }



  switchTab($event: MenuItem) {
    console.log($event)
    this.tasks=[];
    if($event.label==='Upcoming')
      this.taskService.getTasks("").subscribe({next:res=>{
          res.forEach(t=> {
            if(!t.isCompleted && !t.isOverdue)
              this.tasks.push(new TaskHome(t))
          })
        },error:err=>{

        }})
    else if($event.label==='Completed')
      this.taskService.getTasks("").subscribe({next:res=>{
          res.forEach(t=> {
            if(t.isCompleted)
              this.tasks.push(new TaskHome(t))
          })
        },error:err=>{

        }})
    else
      this.taskService.getTasks("").subscribe({next:res=>{
          res.forEach(t=> {
            if(!t.isCompleted && t.isOverdue)
              this.tasks.push(new TaskHome(t))
          })
        },error:err=>{

        }})
  }

  taskCompleted(taskId: number) {
    console.log(taskId)
    let task=this.tasks.find(task=>task.id==taskId) as TaskHome;
    this.tasks.splice(this.tasks.indexOf(task as TaskHome),1)
    this.taskService.setTaskCompleted(task.id)

  }

  protected readonly indexedDB = indexedDB;





}

class TaskHome{
  id:number;
  name:string;
  projectName:string;
  deadline:string;
  isOverdue:boolean;
  isCompleted:boolean;

  constructor(task:Task) {
    this.id=task.id;
    this.name=task.name;
    this.projectName=task.projectName;
    this.deadline=task.deadline;
    this.isOverdue=task.isOverdue
    this.isCompleted=task.isCompleted;
  }
}




