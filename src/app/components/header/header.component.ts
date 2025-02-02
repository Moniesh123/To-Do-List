import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  stateService=inject(StateService)
searchControl=new FormControl();
@Output() search=new EventEmitter<string>();
ngOnInit(){
  this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe((value)=>{
   
    this.stateService.searchSubject.next(value|| '');
  })
}
}
