import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category/category.service';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  fieldForm: FormGroup;

  constructor(private service: CategoryService) {
    this.fieldForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  saveFields() {
    this.fieldForm.markAllAsTouched();

    if (this.fieldForm.valid) {
      this.service.save(this.fieldForm.value).subscribe({
        next: res => {
          console.log('Category saved successfully!', res);
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
