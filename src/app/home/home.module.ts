import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HotelListComponent } from '../components/hotel-list/hotel-list.component';

@NgModule({
  declarations: [HomeComponent, HotelListComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
