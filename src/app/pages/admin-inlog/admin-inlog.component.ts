import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminLogin } from '../../modules/admin-login';
import { AdminLoginService } from '../../services/admin-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-inlog',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-inlog.component.html',
  styleUrl: './admin-inlog.component.scss'
})
export class AdminInlogComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  constructor(private adminService: AdminLoginService, private router: Router) {}

  // metoder
  logIn() {
    let inLogAdmin: AdminLogin = {
      email: this.email,
      password: this.password
    }

    this.adminService.adminLogin(inLogAdmin).subscribe({
      next: (response) => {
        let token = response.token;
        localStorage.setItem('authtoken', token);
        this.error = '';
        this.router.navigate(['administration']);
      },
      error: err => {
        this.error = err.error.message || err.error.error;
      }
    });
    
  }
}
