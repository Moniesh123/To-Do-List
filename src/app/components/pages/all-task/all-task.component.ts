import { Component, inject } from '@angular/core';
import{FormsModule}from'@angular/forms';
import { HttpService } from '../../../services/http.service';
import { CommonModule, DatePipe } from '@angular/common';
import { PageTitleComponent } from "../../page-title/page-title.component";
import { TaskListComponent } from "../../task-list/task-list.component";
import { StateService } from '../../../services/state.service';
@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe, PageTitleComponent, TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.css'
})
export class AllTaskComponent {

newtask="";
intialTaskList:any[]=[];
tasklist:any[]=[];

httpservice=inject(HttpService);
stateServices=inject(StateService);


ngOnInit(){
this.stateServices.searchSubject.subscribe((value)=>{
  console.log("search",value);
  if(value){
    this.tasklist=this.intialTaskList.filter(x=>x.title.toLowerCase().includes(value.toLowerCase()));
  }else{
    this.tasklist=this.intialTaskList;
  }
});
  this.getalltask();
}

addTask(){
  console.log("addTask",this.newtask)
  this.httpservice.addTask(this.newtask).subscribe(()=>{
    this.newtask="";   
    this.getalltask(); 
  });
  }

  getalltask(){
    this.httpservice.getalltask().subscribe((result:any)=>{
    this.intialTaskList=this.tasklist=result;
    });
  }

  onCompleted(task:any){
    task.completed=true;
console.log("complete",task)
this.httpservice.updateTask(task).subscribe(()=>{
  this.getalltask(); 
});
}
  onImportant(task:any){
    task.important=true;
   
    this.httpservice.updateTask(task).subscribe(()=>{
      this.getalltask(); 
    })
    
  }
  search(searchTerm:any){
      console.log(searchTerm);
  }
  
}
