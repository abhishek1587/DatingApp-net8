import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  model:any ={};
  private accountService = inject(AccountService);
  //@Input()  usersFromHomeComponent:any;
  //@Output() cancelRegister = new EventEmitter();
  cancelRegister = output<boolean>();
  //usersFromHomeComponent= input.required<any>();
  register(){
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
        //this.cancelRegister.emit(false);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Request had Completed');
      },
    });


  }
  cancel(){
    console.log("cancelled");
    this.cancelRegister.emit(false);
  }

 

}
