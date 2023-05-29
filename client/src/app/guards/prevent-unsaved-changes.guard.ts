import { Injectable } from '@angular/core';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { ConfirmService } from '../services/confirm.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard {

  constructor(private confirmServce: ConfirmService){}

  canDeactivate(component: MemberEditComponent): Observable<boolean> {
    if(component.editForm?.dirty){
      //return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
      return this.confirmServce.confirm();
    }
    return of(true);
  }
  
}
