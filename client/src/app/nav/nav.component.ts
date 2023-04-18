import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.mode';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  model: any = {};

  constructor(public accounnService: AccountService){}

  ngOnInit(): void {
  
  }


  login(){
    this.accounnService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    })
  }

  logout(){
    this.accounnService.logout();
  }
}
