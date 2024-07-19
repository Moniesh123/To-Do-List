import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';


@Component({
  selector: 'app-important-task',
  standalone: true,
  imports: [PageTitleComponent,TaskListComponent],
  templateUrl: './important-task.component.html',
  styleUrl: './important-task.component.css'
})
export class ImportantTaskComponent {
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
      this.tasklist=result.filter((x:any)=>x.important==true);
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
