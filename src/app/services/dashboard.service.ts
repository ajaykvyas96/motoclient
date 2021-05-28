import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  Weather() {
    return this.http.get(`${environment.apiUrl}/WeatherForecast/get`)
        .pipe(map(whether => {
            console.log(whether);
            return whether;
        }));
}
}
