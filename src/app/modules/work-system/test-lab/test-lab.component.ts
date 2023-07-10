import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilterService, PrimeNGConfig } from "primeng/api";
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { AppConfigServiceService } from 'src/app/services/app-config-service.service';
import { WorkType } from 'src/app/models/work-type';
import { VoiceToTextServiceService } from 'src/app/services/voice-to-text-service.service';
import { TeamMembersService } from 'src/app/services/team-members.service';
import { Observable } from 'rxjs'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-test-lab',
  templateUrl: './test-lab.component.html',
  styleUrls: ['./test-lab.component.scss'],
  providers: [TeamMembersService, FilterService]
  // encapsulation: ViewEncapsulation.None
})
export class TestLabComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  items2: any = [1,2,3,4,5,6,7,8,9]
  date14 :Date
  showCalender: Boolean =  false;
  // name  = new FormControl('');
  profileForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl('')
  });

 

  items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
