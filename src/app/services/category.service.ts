import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  post(category : Category) {
    return this.http.post<Category>(`${environment.apiUrl}/category`, category)
        .pipe(map(catregory => {
            return catregory;
        }));
  }

  put(category : Category) {
    return this.http.put<Category>(`${environment.apiUrl}/category`, category)
        .pipe(map(catregory => {
            return catregory;
        }));
  }

  getall() : Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/category`);
  }

  get(id : number): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/category/${id}`);
  }

  delete(id: number): Observable<Category> {
    return this.http.delete<Category>(`${environment.apiUrl}/category/${id}`);
  }
}
