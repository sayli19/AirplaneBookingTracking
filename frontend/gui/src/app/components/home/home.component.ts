import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
allDetails:any;
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getPlaneDetails();
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
