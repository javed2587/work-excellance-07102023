import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private sharedData = new Subject<any>();

  sendSharedData(data: any) {
    this.sharedData.next(data);
  }

  getSharedData() {
    return this.sharedData.asObservable();
  }
}
