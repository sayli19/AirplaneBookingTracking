import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hops',
  templateUrl: './hops.component.html',
  styleUrls: ['./hops.component.sass']
})
export class HopsComponent implements OnInit {
  airline;
  hops;
  flight;
  time;
  plane;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  getNumberOfHops(airline){
    this.httpService.getNumberOfHops(airline)
    .subscribe(
      data => {
        console.log(data.result[0].hops.low)
        this.hops = data.result[0].hops.low;
        // console.log(this.mainAirport)
        // this.getConnectingFlights(this.mainAirport)
      },
      error => {
        console.log("error"+error);
      });
  }

  getFLightsByLayoverDuration(airline){
    this.httpService.getFLightsByLayoverDuration(airline)
    .subscribe(
      data => {
        console.log(data.result)
        this.plane = data.result;
        // console.log(this.mainAirport)
        // this.getConnectingFlights(this.mainAirport)
      },
      error => {
        console.log("error"+error);
      });
  }

}
