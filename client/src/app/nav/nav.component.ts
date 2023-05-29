import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  model: any = {};

  constructor(
    public accounnService: AccountService,
    private router: Router,
    private toastr: ToastrService
    ){}

  ngOnInit(): void {
  
  }


  login(){
    this.accounnService.login(this.model).subscribe(() => {
      this.router.navigateByUrl('/members');
      this.model = {};
    });
  }

  logout(){
    this.accounnService.logout();
    this.router.navigateByUrl('/');
  }
}
