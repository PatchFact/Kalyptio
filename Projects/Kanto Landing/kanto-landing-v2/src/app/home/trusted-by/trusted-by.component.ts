import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-trusted-by',
  templateUrl: './trusted-by.component.html',
  styleUrls: ['./trusted-by.component.scss']
})
export class TrustedByComponent implements OnInit {
  private timer;

  constructor() { }

  ngOnInit() {

  }

}
