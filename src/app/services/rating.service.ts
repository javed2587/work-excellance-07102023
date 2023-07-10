import { ConsoleLogger } from '@angular/compiler-cli/private/localize';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

   rateColor:any
  constructor() { }

  testfunc() {
    console.log('RatingService.....')
  }

  setColorRating(val:any) {
    console.log('RatingService.....val is here.')
     console.log(val);
     this.rateColor = val;
     console.log("setRatre method", this.rateColor)
  }
  fetchColorRating() {
    console.log("fetchRatre method", this.rateColor)
    return  this.rateColor
  }
}
