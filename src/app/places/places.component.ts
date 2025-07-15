import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesService } from '../../services/places/places.service';
import { CategoryService } from '../../services/category/category.service';
import { FormsModule } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../models/category/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss',
})
export class PlacesComponent implements OnInit {
  fieldForm: FormGroup;
  categories: Category[] = [];
  reviews: Category[] = [];
  searchCategory: string = '';
  reviewPlace: string = '';

  constructor(
    private service: PlacesService,
    private placeService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.fieldForm = new FormGroup({
      name: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      review: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories() {
    this.placeService.list().subscribe({
      next: res => this.categories = res,
      error: err => console.error('An error has occurred', err)
    });
  }

  saveFields() {
    this.fieldForm.markAllAsTouched();

    if (this.fieldForm.valid) {
      this.service.save(this.fieldForm.value).subscribe({
        next: res => {
          const snack = this.snackBar.open('Place saved successfully!', 'Go to Gallery', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
    
          snack.onAction().subscribe(() => {
            this.router.navigate(['/dashboard/gallery']);
          });
    
          this.fieldForm.reset();
        },
        error: err => console.error('An error has occurred', err),
      });
    }
  }

  isInvalidField(nameField: string): boolean {
    const field = this.fieldForm.get(nameField);
    return field?.invalid && field?.touched && field?.errors?.['required'];
  }
}
