import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ConfirmationService, Message, PrimeNGConfig} from 'primeng/api';
@Component({
  selector: 'app-prime-alert',
  templateUrl: './prime-alert.component.html',
  styleUrls: ['./prime-alert.component.css'],
  providers: [ConfirmationService]
})
export class PrimeAlertComponent implements OnInit {

  msgs: Message[] = [];

  position: string;
  modelPosition:string = "center";
  // info:string=''
  headerName:string=''
  btnName:string =''
  text1: string

  @Input() alertMessage : string;
  @Input() isDisplayPrimeAlertModal: Boolean;
  // @Input() type: string;
  @Input() messagTypeOfAlertModal : string
  // @Output() sendDisplayVlaueFlag = new EventEmitter();
  @Output() sendIsValueSubmit = new EventEmitter();


  constructor(private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {

    this.primengConfig.ripple = true;
    console.log("...."+this.alertMessage)
    if(this.messagTypeOfAlertModal == "warning") {
      this.btnName  = "OK"
      this.headerName = "Warning"
    } else {
      this.btnName = "OK"
      this.headerName = this.messagTypeOfAlertModal+" - "+"Error"
    }
  }
  ngOnChanges() {
    console.log("....ngOnChnage in prime alret....")
  }
  accept() {

    this.isDisplayPrimeAlertModal = false;
  }
  closeClick() {

    this.isDisplayPrimeAlertModal = false;
    this.sendIsValueSubmit.emit(false);
    // this.onCancel.emit(true)
  }
}
