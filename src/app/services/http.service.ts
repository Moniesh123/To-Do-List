import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpClient = inject(HttpClient);
  constructor() { }
  addTask(task:string):Observable<any>{
    return this.httpClient.post("http://localhost:3000/tasks", {
      title: task
    });
  }
  getalltask(): Observable<any>{
    return this.httpClient.get("http://localhost:3000/tasks");
  }
  updateTask(task:any): Observable<any>{
    return this.httpClient.put("http://localhost:3000/tasks/"+task.id,task)
  }
}

