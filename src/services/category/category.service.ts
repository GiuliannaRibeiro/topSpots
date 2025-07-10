import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category/category.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  save(place: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, place);
  }

  list(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
}
