import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  constructor(private http: HttpClient) { }

  getImages(query: string, page: number): Observable<any> {
    let queryString = (!query) ? `?query='cover'&page=${page}` : `?query=${query}&page=${page}`;

    return this.http.get(`http://localhost:3000/api/unsplash/${queryString}`);
  }
  
}
