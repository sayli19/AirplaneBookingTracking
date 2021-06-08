
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.sass']
})
export class SeatBookingComponent implements OnInit {
seat;
prefer;
loc;
allSeats:any;
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getAllSeats();
  }

  seats(seat){
  this.seat = seat
  console.log(this.seat)
  }

  pref(pref){
    this.prefer = pref
    console.log(this.prefer)
  }

  location(loc){
    this.loc = loc
    console.log(this.loc, this.seat, this.prefer)
  }

  getAllSeats(){
    this.httpService.getAllSeats()
    .subscribe(
      data => {
   
        this.allSeats = data.result;
        console.log(this.allSeats[0].properties)
      },
      error => {
        console.log("sayli error"+error);
      });
  }


}
