import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { toArray } from 'rxjs/operators';
import { Organization } from 'src/app/models/organization/organization-main';



@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  data: Array<Organization>; 


  constructor(private OrganizationService : OrganizationService) { }


  


  ngOnInit(): void {
     this.OrganizationService.getOrganization().subscribe( (response: Array<Organization>)  => {
      this.data = response;
      console.log(this.data);
    })
    // console.log(this.data)
  //   this.data.pipe(
  //     toArray()
  //   ).subscribe((array: number[]) => {
  //     console.log(array); // The emitted values as an array
  //   },
  //   (error: any) => {
  //     console.error(error); // Handle any errors
  //   }
  // );
  }


}
