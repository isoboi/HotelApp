import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpDataResp } from '../_models/http-data-resp';
import { HotelModel } from '../_models/hotel-model';
import { HotelCategoryModel } from '../_models/hotel-category-model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private _url = environment.apis.default.url;

  constructor(
    private _http: HttpClient
  ) {
  }

  getAllHotels(): Observable<HttpDataResp<HotelModel>> {

    return this._http.get<HttpDataResp<HotelModel>>(this._url + '/api/app/hotel');
  }

  createHotel(body: Partial<HotelModel>): Observable<HotelModel> {
    return this._http.post<HotelModel>(this._url + '/api/app/hotel', body);
  }

  deleteHotel(hotelId: string): Observable<any> {
    return this._http.delete<any>(this._url + `/api/app/hotel/${hotelId}`);
  }

  getHotelCategories(hotelId: string): Observable<HttpDataResp<HotelCategoryModel>> {
    return this._http.get<HttpDataResp<HotelCategoryModel>>(this._url + `/api/app/category?${hotelId}`);
  }

  createHotelCategory(body: Partial<HotelCategoryModel>): Observable<HotelCategoryModel> {
    return this._http.post<HotelCategoryModel>(this._url + '/api/app/category', body);
  }

}
