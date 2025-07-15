import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user/user.interface';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google/auth-google.service';
import { LottieComponent, provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  providers: [provideLottieOptions({ player: () => player })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  lottieOptions = {
    path: 'assets/animation.json',
    autoplay: true,
    loop: true
  };

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
  
    if (googleData) {
      this.profile = googleData;
      this.imgProfile = googleData.picture;
      return true;
    }
  
    return false;
  }

  logout(event?: Event) {
    if (event) event.preventDefault();
    this.loginService.logout();
  }
}
