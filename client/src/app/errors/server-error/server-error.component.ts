import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent {
  errorFromState: any;
  constructor(
    private router: Router
  ){
    const currentNavigation = this.router.getCurrentNavigation();
    this.errorFromState = currentNavigation?.extras?.state?.['error'];
  }

}
