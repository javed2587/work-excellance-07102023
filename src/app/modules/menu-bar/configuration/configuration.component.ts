import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {


  display  = true;

  profileForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl('')
  });
  
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    console.log(this.profileForm.value);
  }
  closeClick(){
    this.display = false;
  }
}
