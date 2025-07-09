import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlacesService } from '../../services/places/places.service';
import { CategoryService } from '../../services/category/category.service';
import { Places } from '../../models/places/places.model';
import { Category } from '../../models/category/category.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  places: Places[] = [];
  categories: Category[] = []
  searchName: string = '';
  searchCategory: string = '';

  constructor(
    private placesService: PlacesService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.listPlaces();
    this.listCategories();
  }
  
  listPlaces() {
    this.placesService.list().subscribe({
      next: res => this.places = res,
      error: err => console.error('An error has occurred:, ', err)
    });
  }

  listCategories() {
    this.categoryService.list().subscribe({
      next: res => this.categories = res,
      error: err => console.error('An error has occurred:, ', err)
    });
  }

  filterBySearch() {
    this.placesService.filter(this.searchName, this.searchCategory).subscribe({
      next: res => this.places = res,
      error: erro => console.error('An error has occurred: ', erro)
    });
  }

  totalReviews(place: Places): string {
    const rating = Number(place.review) || 0;
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}