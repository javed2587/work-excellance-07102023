import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-build-completeness',
  templateUrl: './build-completeness.component.html',
  styleUrls: ['./build-completeness.component.css']
})
export class BuildCompletenessComponent implements OnInit {

  constructor() {}
  ngOnInit(): void {}
  showBody: Boolean = false;
  changeShowBody() {
    if (this.showBody == false) {
      var popup = document.getElementById('displayContentBuild');
      popup.style.display = 'block';
      popup.classList.remove('buildContent');
      popup.classList.add('u--slideDown');
      this.showBody = true;
    } else {
      var popup = document.getElementById('displayContentBuild');
      popup.style.display = 'none';
      popup.classList.remove('u--slideDown');
      popup.classList.add('u-slideUp');
      this.showBody = false;
    }
  }
  buildCompleteness: any = [
    [
      {
        color1: 'gray',
        number1: '',
        level: '0',
      },
      {
        color1: 'gray',
        number1: '',
        level: '0',
      },
      {
        color1: 'gray',
        number1: '',
        level: '0',
      },
      {
        color1: 'gray',
        number1: '',
        level: '0',
      },
    ],
    [
      {
        color1: 'gray',
        number1: '',
        level: '1',
      },
      {
        color1: 'gray',
        number1: '',
        level: '1',
      },
      {
        color1: 'gray',
        number1: '',
        level: '1',
      },
      {
        color1: 'gray',
        number1: '',
        level: '1',
      },
    ],
    [
      {
        color1: '',
        number1: '3/3',
        level: '2',
      },
      {
        color1: '',
        number1: '1/1',
        level: '2',
      },
      {
        color1: '',
        number1: '0',
        level: '2',
      },
      {
        color1: '',
        number1: '1/3',
        level: '2',
      },
    ],
    [
      {
        color1: '',
        number1: '0/1',
        level: '3',
      },
      {
        color1: '',
        number1: '4/4',
        level: '3',
      },
      {
        color1: '',
        number1: '3/4',
        level: '3',
      },
      {
        color1: '',
        number1: '0',
        level: '3',
      },
    ],
    [
      {
        color1: '',
        number1: '0/1',
        level: '4',
      },
      {
        color1: '',
        number1: '2/2',
        level: '4',
      },
      {
        color1: '',
        number1: '0',
        level: '4',
      },
      {
        color1: '',
        number1: '4/5',
        level: '4',
      },
    ],
  ];

}
