import { Component, OnInit } from '@angular/core';
import { HotelModel } from '../../_models/hotel-model';
import { HotelService } from '../../_services/hotel.service';
import { HttpErrResp } from '../../_models/http-err-resp';
import { catchError, of } from 'rxjs';
import { HttpDataResp } from '../../_models/http-data-resp';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  public hotelList: Array<HotelModel> = [];

  constructor(
    private _hotelService: HotelService
  ) {
  }

  ngOnInit() {
    this.getHotelList();
  }

  getHotelList(): void {
    this._hotelService.getAllHotels()
      .pipe(
        catchError((err: HttpErrResp) => {
          return of(false);
        })
      )
      .subscribe((res: HttpDataResp<HotelModel>) => {
        if (res) {
          this.hotelList = res.items;
        }
      });
  }
}
