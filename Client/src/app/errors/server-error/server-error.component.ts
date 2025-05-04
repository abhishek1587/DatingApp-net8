import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {

  error:any;
  // The error property is declared to hold the error object that will be passed to the component.
  
  constructor( private router:Router){
    const navigation =this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }
}
