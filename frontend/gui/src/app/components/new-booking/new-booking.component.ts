import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.sass']
})
export class NewBookingComponent implements OnInit {
  flight;
  airports:any;
  mainAirport;
  hops:any;
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  getFlightDetails(flight){
    this.httpService.getFlightDetails(flight)
    .subscribe(
      data => {
        this.mainAirport = data.result[1].Airport
        //console.log(flight)
        this.getConnectingFlights(this.mainAirport)
      },
      error => {
        console.log("error"+error);
      });
  }


getConnectingFlights(flight){
  this.httpService.getFlightDetails(flight)
  .subscribe(
    data => {
     console.log(data.result)
     this.airports = data.result
     this.getHops('Lisbon')
    },
    error => {
      console.log("error"+error);
    });
}

getHops(to){

  this.httpService.getHops(to)
  .subscribe(
    data => {

      this.hops = data.result[0].segments
    //  ar.forEach(element => {
    //   console.log(element.end.properties.airport)
    //  });
    },
    error => {
      console.log("error"+error);
    });
}

}


// this.getFlightDetails(flight){
//   this.httpService.getFlightDetails(flight)
//   .subscribe(
//     data => {
//      console.log(data.result)
//     },
//     error => {
//       console.log("error"+error);
//     });
// }