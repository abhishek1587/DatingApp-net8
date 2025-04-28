import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users :any;
  // The HttpClient is injected into the component using Angular's dependency injection system.
  // This allows the component to make HTTP requests to the server.
  http=inject(HttpClient);
 
  ngOnInit(): void {
    this.http.get("http://localhost:5000/api/users").subscribe({
       // next:()=>{},
    // error:() =>{},
    // complete:() =>{}
      next:response =>
        this.users=response,
      error:error =>console.log(error),
      complete:() =>{
        console.log("Request had Completed");
      }
    });
  }


}
