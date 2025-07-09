import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user/user.interface';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google/auth-google.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  profile: User | undefined;
  imgProfile: string = '';

  constructor(
    private router: Router,
    private loginService: AuthGoogleService
  ) {}

  navigate() {
    this.router.navigate(['/dashboard/gallery'])
  }

  googleLogin() {
    this.loginService.login()
  }

  isLoggedIn() {
    const googleData = this.loginService.getLoggedProfile();
    console.log(googleData);
  
    if (googleData) {
      this.profile = googleData;
      this.imgProfile = googleData.picture;
      return true;
    }
  
    return false;
  }  
}
