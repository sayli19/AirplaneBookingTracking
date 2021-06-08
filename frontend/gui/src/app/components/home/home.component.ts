import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
allDetails:any;
passport:"PXXXXXXXX";
relatedPassengers:any;
isFraudster : boolean = false;
fraudsterName;
relationship:any;
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
   // this.getPlaneDetails();
    
  }

  verifyPassenger(passport){
    this.httpService.verifyPassenger(passport)
    .subscribe(
      data => {
        if(data.result.length > 0){
          this.fraudsterName = data.result[0].passenger.properties
      
          this.getrelatedFraudsterPassengers(passport)
        }else{
          this.isFraudster = false;
        }
      },
      error => {
        console.log("error"+error);
      });
  }

  getrelatedFraudsterPassengers(num){
    this.httpService.relatedPassenger(num)
    .subscribe(
      data => {
        this.isFraudster = true;
        this.relatedPassengers = data.result    
        this.getrelationship(num)
      },
      error => {
        console.log("oops"+error);
      });
  }


  getrelationship(num){
    this.httpService.getrelationship(num)
    .subscribe(
      data => {
  this.relationship = data.result
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
