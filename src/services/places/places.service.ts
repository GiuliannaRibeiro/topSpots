import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Places } from '../../models/places/places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  baseUrl: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  save(place: Places) : Observable<Places>{
    return this.http.post<Places>(`${this.baseUrl}/places`, place)
  } 

  list(): Observable<Places[]> {
    return this.http.get<Places[]>(`${this.baseUrl}/places`)
  }

  filter(name: string, place: string):Observable<Places[]> {
    let params = new HttpParams();

    if(name) {
      params = params.set('name_like', name);
    }

    if(place && place !== '-1') {
      params = params.set('place', place);
    }

    return this.http.get<Places[]>(`${this.baseUrl}/places`, {
      params: params
    })
  }
}
