import { Component } from '@angular/core';
import {Task, TaskService} from "../../services/task/task.service";


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks:Task[] = [];
  files!: TreeNode[];

  cols!: Column[];

  constructor(private taskService: TaskService){

  }







  ngOnInit() {
    this.taskService.getTasks('adithk1308@gmail.com').subscribe(
      {
        next:res=>{
          console.table(res)
          this.tasks=res;
          this.files=[
            {
              "data":{
                "name":"Documents",
              },
              "children":[
                {
                  "data":{
                    "name":res[0].name,
                    "size":"55kb",
                    "type":"Folder"
                  },
                }
              ]
            }
          ];
        },
        error:res=>console.error(res)
      }
    );

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Description' },
      { field: 'type', header: 'Deadline' }
    ];
  }

}

export interface TreeNode {
  data?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
}
