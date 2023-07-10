import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IRatingColor } from 'src/app/models/common/rating';
@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit, OnChanges {

  // display = Boolean;

  @Output() onaddRating = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<Boolean>();
  @Output() doColor = new EventEmitter<Boolean>()
  @Input() isdisplayRatingModal: Boolean
  @Input() color: String
  // @Input() displayVal: Boolean
  // @Input() displayTooBar: Boolean
  @Input() displayToolbar: Boolean


  display: Boolean
  city: string;
  modelPosition: string = "center";
  colorsVal: string = ''
  selectedCategory: any = null;
  // doColor: any

  categories: any[] = [
    { name: 'Working well, no major problems, minor waste, go', color: { background: "RED", color: '#ffffff', code: "#FF0000" }, colorName: ' Red' },
    { name: 'Some issues, caution, some waste', color: { background: "YELLOW", color: '#000000', code: '#FFFF00' }, colorName: 'Yellow' },
    { name: 'Deeper issues, major concerns, more waste, act quickly', color: { background: "GREEN", color: '#000000', code: '#00FF00' }, colorName: 'Green' },
    { name: 'work step is new and cannot be rated, work step is currently on hold, work step has been cancelled', color: { background: 'BLUE', color: '#ffffff', code: "#00B0F0" }, colorName: 'Blue' },
    { name: 'Not rated at this time', color: { background: null, color: '#000000', code: '#fff' }, colorName: 'Blank' }
  ];

  // categories: any[] = [
  //   { name: 'Deeper issues, major concerns, more waste', color: { background: '#FF0000',color: '#ffffff' }, colorName:' Red'},
  //   { name: 'Some issues, caution, some waste',  color: { background: '#FFFF00',color: '#000000' }, colorName:'Yellow'},
  //   { name: 'Working well, no major problems, minor waste', color: { background: '#00FF00',color: '#ffffff' }, colorName:'Green'},
  //   { name: 'Work step is new and cannot be rated, work',  color: { background: '#00B0F0',color: '#ffffff' }, colorName:'Blue'},
  //   { name: 'Not rated at this time',  color: { background: '#fff',color: '#000000' }, colorName:'Blank'}
  // ];

  constructor(
    // private _rateService: RatingService
  ) {

  }
  ngOnInit(): void {
    this.display = this.isdisplayRatingModal;   //returns true
    console.log("displayVal...." + this.isdisplayRatingModal)
    console.log("displayToolbar...." + this.displayToolbar)
  }

  isRatingBind: Boolean = false
  ngOnChanges(changes: SimpleChanges): void {
    for(const prop in changes) {
      if (prop == 'color') {
        if (!this.isRatingBind && this.color) {
          this.categories.forEach(c => {
            if (c.color.background == this.color) {
              this.selectedCategory = c
              this.isRatingBind = true
            }
          })
        }
      }
    }
  }

  pickRatingColor(color: any) {
    this.onaddRating.emit(color)
  }
  saveRating() {
    this.onaddRating.emit(this.selectedCategory.color)
    this.isdisplayRatingModal = false;
    this.displayToolbar = false;
    this.onCancel.emit(true)
  }

  closeClick() {
    this.isdisplayRatingModal = false;
    this.onCancel.emit(true)
  }
}
