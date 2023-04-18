import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './models/user.mode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ){}

  title = 'Dating App';

  ngOnInit(): void {
    this.setCurrentUser();
  }



  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
