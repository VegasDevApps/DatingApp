import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ){}


  register(){
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => {
        if(error.error.errors){
          Object.entries(error.error.errors).forEach((message) => {
            this.toastr.error(error.error.errors[message[0]]);
          });
        } else {
          this.toastr.error('Something went wrong!');
        }
      }
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
