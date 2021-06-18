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
  airports:any;
  flights:any;
  likes;
  place;
  website;
  venue;
  showHopsVar;
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  getPlacesBasedOnLikes(likes){
    this.httpService.getPlacesBasedOnLikes(likes)
    .subscribe(
      data => {
        console.log(data.result)
        this.place = data.result
        // console.log(this.mainAirport)
        // this.getConnectingFlights(this.mainAirport)
      },
      error => {
        console.log("error"+error);
      });
  }

  getPlacesBasedOnPreviousWebsitesVisited(website){
    this.httpService.getPlacesBasedOnPreviousWebsitesVisited(website)
    .subscribe(
      data => {
        console.log(data.result)
        this.venue = data.result
        // console.log(this.mainAirport)
        // this.getConnectingFlights(this.mainAirport)
      },
      error => {
        console.log("error"+error);
      });
  }

  getShortestAndFurthest(flight){
    this.httpService.getShortestAndFurthest(flight)
    .subscribe(
      data => {
        console.log(data.result)
        this.airports = data.result
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

  showHops(){
    this.showHopsVar = true;
    }

}

