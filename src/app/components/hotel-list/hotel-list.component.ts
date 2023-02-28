import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HotelModel } from '../../_models/hotel-model';
import { HotelService } from '../../_services/hotel.service';
import { HttpErrResp } from '../../_models/http-err-resp';
import { catchError, finalize, of, Subject, takeUntil } from 'rxjs';
import { HttpDataResp } from '../../_models/http-data-resp';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelCategoryModel } from '../../_models/hotel-category-model';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit, OnDestroy {
  @ViewChild('myTable') table: any;
  public hotelList: Array<HotelModel> = [];
  public hotelCategoryList: Array<HotelCategoryModel> = [];

  public isHotelModalOpen = false;
  public isCategoryModalOpen = false;
  public dataLoading = false;

  public hotelForm: FormGroup;
  public hotelCategoryForm: FormGroup;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _hotelService: HotelService,
    private _fb: FormBuilder,
    private _cdRef: ChangeDetectorRef,
    private _toaster: ToasterService
  ) {
  }

  ngOnInit() {
    this._getHotelList();
    this._initHotelForm();
    this._initHotelCategoryForm();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public createHotel(): void {
    if (this.hotelForm.invalid) return;

    this._hotelService.createHotel(this.hotelForm.value)
      .pipe(
        catchError((err: HttpErrResp) => {
          this._toaster.error(err.details, err.message)
          return of(false);
        }),
        finalize(() => {
          this.isHotelModalOpen = false;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((res: HotelModel) => {
        if (res) {
          this._toaster.success(`Гостиница "${res.name}" сохранена`);
          this.hotelList = [...this.hotelList, res]
        }
      });
  }

  public deleteHotel(row: HotelModel, index: number): void {
    this._hotelService.deleteHotel(row.id)
      .pipe(
        catchError((err: HttpErrResp) => {
          this._toaster.error(err.details, err.message)
          return of(false);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((res) => {
        this._toaster.success(`Гостиница "${row.name}" удалена`);
        this.hotelList.splice(index, 1);
      });
  }

  public toggleExpandRow(row): void {
    this.table.rowDetail.collapseAllRows();
    this.hotelCategoryForm.controls.hotelId.setValue(row.id);
    this._getHotelCategoryList(row);
  }

  public createHotelCategory(): void {
    if (this.hotelCategoryForm.invalid) return;

    this._hotelService.createHotelCategory(this.hotelCategoryForm.value)
      .pipe(
        catchError((err: HttpErrResp) => {
          this._toaster.error(err.details, err.message)
          return of(false);
        }),
        finalize(() => {
          this.isCategoryModalOpen = false;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((res: HotelCategoryModel) => {
        if (res) {
          this._toaster.success(`Категория "${res.name}" сохранена`);
          this.hotelCategoryList = [...this.hotelCategoryList, res];
        }
      });
  }

  private _getHotelList(): void {
    this.dataLoading = true;

    this._hotelService.getAllHotels()
      .pipe(
        catchError((err: HttpErrResp) => {
          this._toaster.error(err.details, err.message)
          return of(false);
        }),
        finalize(() => {
          this.dataLoading = false;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((res: HttpDataResp<HotelModel>) => {
        if (res) {
          this.hotelList = res.items;
        }
      });
  }

  private _getHotelCategoryList(row): void {
    this._hotelService.getHotelCategories(row.id)
      .pipe(
        catchError((err: HttpErrResp) => {
          this._toaster.error(err.details, err.message)
          return of(false);
        }),
        finalize(() => {
          this.table.rowDetail.toggleExpandRow(row);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((res: HttpDataResp<HotelCategoryModel>) => {
        if (res) {
          this.hotelCategoryList = res.items;
        }
      });
  }

  private _initHotelForm(): void {
    this.hotelForm = this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(20)]],
      siteUrl: [null, [Validators.required]],
      initialPrice: [0]
    });
  }

  private _initHotelCategoryForm(): void {
    this.hotelCategoryForm = this._fb.group({
      hotelId:[null],
      name: [null, [Validators.required, Validators.maxLength(20)]],
      area: [0, [Validators.required]],
    });
  }
}
