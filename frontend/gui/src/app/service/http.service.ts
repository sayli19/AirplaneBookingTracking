import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getPlaneDetails(): Observable<any> {
    return this.http.get('http://localhost:3000/');
  }

  verifyPassenger(pnum): Observable<any> {
    let baseUrl = 'http://localhost:3000/verify';
    return this.http.get(`${baseUrl}/${pnum}`);
  }

  relatedPassenger(pnum): Observable<any> {
    let baseUrl = 'http://localhost:3000/related-passenger';
    return this.http.get(`${baseUrl}/${pnum}`);
  }

  getrelationship(pnum): Observable<any> {
    let baseUrl = 'http://localhost:3000/relationship';
    return this.http.get(`${baseUrl}/${pnum}`);
  }

}
