import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import tooltips from '../../../../assets/data/tooltips.json';
import tooltipsWorkSystem from '../../../../assets/data/tooltips-worksystem.json';
import tooltipsWorkImprovement from '../../../../assets/data/tooltips-workimprovement.json';

@Component({
  selector: 'app-side-notes',
  templateUrl: './side-notes.component.html',
  styleUrls: ['./side-notes.component.css'],
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`]
})
export class SideNotesComponent implements OnInit, OnChanges {

  @Input() paintbyletters;
  @Input() moduleNameVal;
  showSidebar = false

  tooltipsJSON: any = tooltips.tooltipsworksystem;
  tooltipsJSON1: any = tooltips.tooltipsworkimprovement;
  tooltipsWorkSystem: any = tooltipsWorkSystem;
  tooltipsWorkImprovement: any = tooltipsWorkImprovement;

  constructor(private primengConfig: PrimeNGConfig) {
    console.log(this.moduleNameVal);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.paintbyletters) {
      if (this.moduleNameVal == 'Work System' || this.moduleNameVal == 'Work Improvement')
        this.showSidebar = true
      else this.showSidebar = false
    }
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    // console.log(this.moduleNameVal);
    // console.log(tooltipsWorkSystem[0].text);
  }

}
