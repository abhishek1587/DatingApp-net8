import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive,TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  // The accountService is injected into the component using Angular's dependency injection system.
  model: any = {};
  //loggedIn = false;

  login() {
    this.accountService.login(this.model).subscribe({
      next: (_) => {
        this.router.navigateByUrl('/members');
        //console.log(response);
        //this.loggedIn = true;
      },
      error: (error) => {
        console.log(error), this.toastr.error(error.error);
      },
      complete: () => console.log('Login complete'),
    });
  }

  logout() {
    //this.loggedIn = false;
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
