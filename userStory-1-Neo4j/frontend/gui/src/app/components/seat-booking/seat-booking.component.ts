
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
bothSelected:boolean = true;
windowSeat = [
  {
    name: "R3 A",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R3 B",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R3 C",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R3 D",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R3 E",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R3 F",
    windowAvailable:false,
    available: false,
    location: "",
  },
  {
    name: "R4 A",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R4 B",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R4 C",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R4 D",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R4 E",
    windowAvailable:false,
    available: false,
    location: "",
  },
  {
    name: "R4 F",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R10 A",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R10 B",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R10 C",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R10 D",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R10 E",
    windowAvailable:false,
    available: false,
    location: "",
  },
  {
    name: "R10 F",
    windowAvailable:false,
    available: false,
    location: "",
  },
  {
    name: "R11 A",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R11 B",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R11 C",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R11 D",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R11 E",
    windowAvailable: false,
    available: false,
    location: "",
  },
  {
    name: "R11 F",
    windowAvailable: false,
    available: false,
    location: "",
  },
];

isWindow: boolean = false
islocation : boolean = false;

  constructor(private httpService: HttpService) {
   console.log(this.windowSeat)
   }

  ngOnInit(): void {
    this.getAllSeats();
  }

  seats(seat){
  this.seat = seat
 
  }

  pref(pref){
    this.prefer = pref
    this.httpService.getWindowSeat()
    .subscribe(
      data => {
        this.isWindow = true
        this.bothSelected = false;
       // this.windowSeat = data.result;
       this.windowSeat.forEach((item)=>{
        data.result.forEach((value) =>{
          if(item.name == value.properties.name)
            {
              item.windowAvailable = true;
            }
        });
       });
      },
      error => {
        console.log("sayli error"+error);
      });
  }

  location(loc){
    this.loc = loc
    this.httpService.getSeatLocation()
    .subscribe(
      data => {
        console.log(data.result)

       // this.windowSeat = data.result;
       this.islocation = true
       this.isWindow = false
       this.bothSelected = false;
       
       this.windowSeat.forEach((item)=>{
        data.result.forEach((value) =>{
          if(item.name == value.windowside.properties.name)
            {
              item.location = 'washroom';
            }
        });
       });

       this.windowSeat.forEach((item)=>{
        data.result.forEach((value) =>{
          if(item.name == value.windowrow.properties.name && value.windowrow.properties.available == 'Yes')
            {
              item.available = true;
            }
        });
       });
console.log(this.windowSeat)
      },
      error => {
        console.log("sayli error"+error);
      });
  }

  getAllSeats(){
    this.httpService.getAllSeats()
    .subscribe(
      data => {
        this.allSeats = data.result;

        // this.windowSeat.forEach((item)=>{
        //   data.result.forEach((value) =>{
        //     if(item.name == value.properties.name && value.properties.available == 'Yes')
        //        {
        //         item.available = true;
        //        }
        //   });
        //  });
      },
      error => {
        console.log("sayli error"+error);
      });
  }


}
