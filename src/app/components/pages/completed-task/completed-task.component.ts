import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from "../../task-list/task-list.component";

@Component({
  selector: 'app-completed-task',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.css'
})
export class CompletedTaskComponent {
  newtask="";
  tasklist:any[]=[];
  
  httpservice=inject(HttpService)
  task: any;
  ngOnInit(){
    this.getalltask();
  }
  
  addTask(){
    console.log("addTask",this.newtask)
    this.httpservice.addTask(this.newtask).subscribe(()=>{
      this.newtask="";   
      this.getalltask(); 
    })
    }
  
    getalltask(){
      this.httpservice.getalltask().subscribe((result:any)=>{
      this.tasklist=result.filter((x:any)=>x.completed==true);
      })
    }
    onCompleted(task:any){
      task.completed=true;
  console.log("complete",task)
  this.httpservice.updateTask(task).subscribe(()=>{
    this.getalltask(); 
  })
  }
    onImportant(task:any){
      task.important=true;
     
      this.httpservice.updateTask(task).subscribe(()=>{
        this.getalltask(); 
      })
      
    }
}
