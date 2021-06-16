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

  getAllSeats(): Observable<any> {
    return this.http.get('http://localhost:3000/seats');
  }

  getWindowSeat(): Observable<any> {
    return this.http.get('http://localhost:3000/seats/window');
  }

  getSeatLocation(): Observable<any> {
    return this.http.get('http://localhost:3000/seats/location');
  }

  getFlightDetails(flight): Observable<any> {
    let baseUrl = 'http://localhost:3000/booking';
    return this.http.get(`${baseUrl}/${flight}`);
  }

  getHops(to): Observable<any> {
    let baseUrl = 'http://localhost:3000/flight-hops';
    return this.http.get(`${baseUrl}/${to}`);
  }

  getShortestAndFurthest(flight): Observable<any> {
    let baseUrl = 'http://localhost:3000/getShortestAndFurthest';
    return this.http.get(`${baseUrl}/${flight}`);
  }

  getDirectFlights(): Observable<any> {
    // let baseUrl = 'http://localhost:3000/getDirectFlights';
    return this.http.get('http://localhost:3000/getDirectFlights');
  }
  

}
