import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
allDetails:any;
passport:"PXXXXXXXX"
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
   // this.getPlaneDetails();
    this.getrelatedFraudsterPassengers("N56435679")
  }

  verifyPassenger(passport){
    this.httpService.verifyPassenger(passport)
    .subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log("error"+error);
      });
  }

  getrelatedFraudsterPassengers(num){
    this.httpService.relatedPassenger("N56435679")
    .subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log("oops"+error);
      });
  }



  getPlaneDetails():void{
    this.httpService.getPlaneDetails()
    .subscribe(
      data => {
   
        this.allDetails = data.result;
        console.log(this.allDetails)
      },
      error => {
        console.log("sayli error"+error);
      });
  }


}
