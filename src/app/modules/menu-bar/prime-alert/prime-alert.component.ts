import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';

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

  @Input() alertMessage : string;
  @Input() displayVal: Boolean;
  @Input() type:string;

  constructor(private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {

    this.primengConfig.ripple = true;
    console.log("...."+this.alertMessage)
    if(this.type=="warning") {
      this.btnName  = "OK"
      this.headerName = "Warning"
    }else{
      this.btnName = "Yes"
      this.headerName = "Confirmation"
    }
  }

  accept() {

    this.displayVal = false;
  }
  closeClick() {

    this.displayVal = false;
    // this.onCancel.emit(true)
  }
}

