import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { SeatBookingComponent } from './components/seat-booking/seat-booking.component';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { RecommendPlacesComponent } from './components/recommend-places/recommend-places.component';
import { HopsComponent } from './components/hops/hops.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SeatBookingComponent,
    NewBookingComponent,
    RecommendPlacesComponent,
    HopsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
