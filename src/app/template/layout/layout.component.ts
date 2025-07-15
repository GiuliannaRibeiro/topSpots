import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutProps } from './layout.props';
import { filter, map } from 'rxjs';
import { AuthGoogleService } from '../../../services/auth-google/auth-google.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  props: LayoutProps = {title: '', subTitle: ''}
  private authService = inject(AuthGoogleService);
  profile = computed(() => this.authService.getLoggedProfile());

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private loginService: AuthGoogleService,
    private snackBar: MatSnackBar
   ) {}

   ngOnInit(): void {
    this.router.events.pipe(
      filter(() => this.activatedRouter.firstChild !== null),
      map(() => this.getTitleSubTitle())
    ).subscribe((props: LayoutProps) => this.props = props);
  }

   getTitleSubTitle() : LayoutProps {
    let routeChild = this.activatedRouter.firstChild;

    while(routeChild?.firstChild) {
      routeChild = routeChild?.firstChild;
    }

    return routeChild?.snapshot.data as LayoutProps;
   }

   logout() {
    const userName = this.profile()?.given_name || 'you';
  
    this.loginService.logout();
  
    this.snackBar.open(`See you next time, ${userName}! 👋`, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }
  
}
