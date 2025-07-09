import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Category } from '../../models/category/category.model';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  save(place: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, place);
  }

  list(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
}
