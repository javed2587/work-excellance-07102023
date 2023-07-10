import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardTask } from '../models/dashboard-task';
import { DashboardFocus } from '../models/DashboardFocus';
import { RatingTask } from '../models/common/rating';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl: string = environment.baseUrl
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  taskUrl = '/assets/data/dashboard-task.json';
  focusUrl = '/assets/data/dashboard-focus.json';

  productNames: string[] = [
      "Bamboo Watch",
      "Black Watch",
      "Blue Band",
      "Blue T-Shirt",
      "Bracelet",
      "Brown Purse",
      "Chakra Bracelet",
      "Galaxy Earrings",
      "Game Controller",
      "Gaming Set",
      "Gold Phone Case",
      "Green Earbuds",
      "Green T-Shirt",
      "Grey T-Shirt",
      "Headphones",
      "Light Green T-Shirt",
      "Lime Band",
      "Mini Speakers",
      "Painted Phone Case",
      "Pink Band",
      "Pink Purse",
      "Purple Band",
      "Purple Gemstone Necklace",
      "Purple T-Shirt",
      "Shoes",
      "Sneakers",
      "Teal T-Shirt",
      "Yellow Earbuds",
      "Yoga Mat",
      "Yoga Set",
  ];

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Array<RatingTask>> {
    return this.http.get<Array<RatingTask>>(`${this.baseUrl}/tasks`)
  }
  updateTask(task: RatingTask): Observable<RatingTask> {
    return this.http.put<RatingTask>(`${this.baseUrl}/tasks`, task)
  }
  getFocus() {
    return this.http.get<any>(this.focusUrl).toPromise()
    .then(res => <DashboardFocus[]>res.data)
    .then(data => { return data;})
  }

//   generatePrduct(): DashboardTask {
//     const task: DashboardTask =  {
//         id: this.generateId(),
//         status: this.generateStatus(),
//         periority: "Product Description",
//         dueDate: new Date(),
//         task: this.generateTask()
//     };
//     return task;
// }
// generateId() {
//   let text = "";
//   let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for (var i = 0; i < 5; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }
// generateTask() {
//   return this.productNames[Math.floor(Math.random() * Math.floor(30))];
// }
// generateStatus() {
//   return this.status[Math.floor(Math.random() * Math.floor(3))];
// }

}
