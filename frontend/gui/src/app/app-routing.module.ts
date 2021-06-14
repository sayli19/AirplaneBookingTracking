import { newArray } from '@angular/compiler/src/util';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { SeatBookingComponent } from './components/seat-booking/seat-booking.component';
import { RecommendPlacesComponent } from './components/recommend-places/recommend-places.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'seat', component: SeatBookingComponent },
  { path: 'new-booking', component: NewBookingComponent },
  { path: 'recommend-places', component: RecommendPlacesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
