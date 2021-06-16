import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommend-places',
  templateUrl: './recommend-places.component.html',
  styleUrls: ['./recommend-places.component.sass']
})
export class RecommendPlacesComponent implements OnInit {
  flight;
  mainAirport;
  flights:any;
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  getShortestAndFurthest(flight){
    this.httpService.getShortestAndFurthest(flight)
    .subscribe(
      data => {
        console.log(data.result)
        this.mainAirport = data.result[1].Airport
        // console.log(this.mainAirport)
        // this.getConnectingFlights(this.mainAirport)
      },
      error => {
        console.log("error"+error);
      });
  }

  getDirectFlights(){
    this.httpService.getDirectFlights()
    .subscribe(
      data => {
        console.log(data.result)
        this.flights = data.result
        // console.log(this.mainAirport)
        // this.getConnectingFlights(this.mainAirport)
      },
      error => {
        console.log("error"+error);
      });
  }

}

