import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {UserProfileData, UserService} from "../../services/user.service";
import {first, last} from "rxjs";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements  OnInit{
  items: MenuItem[]=[];
  activeItem!: MenuItem;

  userData:UserProfileData |null = null;

  constructor(private userService:UserService,private messageService: MessageService) {

  }

  ngOnInit(): void {

    this.items=[
      {
        label:'profile'
      }
    ]
    this.activeItem=this.items[0];
    this.loadUserData();
  }

  loadUserData(){
    this.userData=null;
      this.userService.getUserData()?.pipe().subscribe({
        next:res=>{
          setTimeout(()=>{
            this.userData=res;
          },500)

          console.log('department'+this.userData?.department);
        },
        error:err=>{
          console.log(err)
        }
      })
  }


  changeName(value: string) {
    let firstName:string ,
        lastName:string= '';

    if(value.includes(' ')){
      firstName = value.trim().slice(0,value.indexOf(' '));
      lastName = value.trim().slice(value.indexOf(' '),value.length);
    }else{
      firstName=value;
    }


    this.userService.updateName(firstName,lastName).subscribe({
      next:res=> {
        this.showMessage('success','Success','Your name has been updated')
      },
      error:err=>this.showMessage('error','Server Error','something went wrong while updating please try again later')
    })

  }

  changeAboutMe(value: string) {
    this.userService.updateAboutMe(value).subscribe(
      {
        next:res=>this.showMessage('success','Success','about me has been updated')
      }
    )
  }

  changeDepartment(value: string) {
    this.userService.updateDepartment(value).subscribe(
      {
        next:res=>this.showMessage('success','Success','Your department  has been updated')
      }
    )
  }

  changeJobTitle(value: string) {
    this.userService.updateJobTitle(value).subscribe(
      {
        next:res=>this.showMessage('success','Success','Job Title  has been updated')
      }
    )
  }

  showMessage(type:string,summary: string,detail:string) {
    this.messageService.add({severity: type, summary:summary , detail: detail});
  }
}
