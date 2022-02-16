import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import Typed from 'typed.js';
import * as particlesJS from 'particles.js';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

declare var particlesJS: any;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit, OnDestroy {
  typed;
  subs: Subscription[] = [];

  constructor(private translate: TranslateService,
              private router: Router,
              @Inject('WINDOW') private _window: Window) {
  }

  ngOnInit() {
    particlesJS.load(
      'particles-js',
      'assets/particles.json', () => {
      }
    );
    this.subs = [
      this.translate.onLangChange.asObservable().subscribe(() => {
        const options = {
          strings: [
            this.translate.instant('WEB'),
            this.translate.instant('MOBILE'),
            this.translate.instant('DESKTOP'),
            this.translate.instant('AI'),
            this.translate.instant('BLOCKCHAIN'),
            this.translate.instant('THAT')
          ],
          typeSpeed: 100,
          backSpeed: 50,
          showCursor: true,
          cursorChar: '|',
          loop: false
        };
        if (!!this.typed) this.typed.destroy();
        this.typed = new Typed('.typed-element', options);
      })
    ];
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
    this.subs = [];
  }

  get isMobile(): boolean {
    return this._window.innerWidth < 800;
  }

}
