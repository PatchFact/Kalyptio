import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
})
export class TechnologyComponent implements OnInit {
  private timer;

  constructor() { }

  ngOnInit() {

  }

}
