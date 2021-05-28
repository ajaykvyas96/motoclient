import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  post(product : Product) {
    return this.http.post<Product>(`${environment.apiUrl}/product`, product)
        .pipe(map(product => {
            return product;
        }));
  }

  put(product : Product) {
    return this.http.put<Product>(`${environment.apiUrl}/product`, product)
        .pipe(map(product => {
            return product;
        }));
  }

  getall() : Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/product`);
  }

  get(id : number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/product/${id}`);
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiUrl}/product/${id}`);
  }
}
