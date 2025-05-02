import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.getUsers();
  }
  users: any;
  // The HttpClient is injected into the component using Angular's dependency injection system.
  // This allows the component to make HTTP requests to the server.
  http = inject(HttpClient);
  registerMode = false;
  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get('http://localhost:5000/api/users').subscribe({
      // next:()=>{},
      // error:() =>{},
      // complete:() =>{}
      next: (response) => (this.users = response),
      error: (error) => console.log(error),
      complete: () => {
        console.log('Request had Completed');
      },
    });

    
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
    console.log(event);
  }
}
