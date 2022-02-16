import {Component, OnInit, Input, Output, Inject, EventEmitter, PLATFORM_ID} from '@angular/core';
import {NavBarLanguage} from './nav-bar-language.model';
import {fromEvent, Observable, of} from 'rxjs';
import {throttleTime, map, pairwise, switchMap} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() languageConfig: NavBarLanguage;
  @Output() languageChanged: EventEmitter<string> = new EventEmitter<string>();
  beyondOffset$: Observable<boolean>;
  headerTopOffsetLimit = 200;
  windowWidth = 0;
  currentSection = 'page-top';
  isHoveringLanguage = false;
  navBarExpanded = false;

  constructor(@Inject(PLATFORM_ID) private platformId,
              @Inject('WINDOW') private _window: Window,
              @Inject('DOCUMENT') private _document: Document) {
  }

  currentLanguage(): string {
    return this.languageConfig ? this.languageConfig.currentlySelectedLanguage : 'es';
  }

  get isMobile(): boolean {
    return this._window.innerWidth < 800;
  }

  availableLanguages(): string[] {
    if (this.languageConfig) {
      const currentLanguages = this.currentLanguage();
      return this.languageConfig.languages.filter(l => l !== currentLanguages);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.beyondOffset$ = fromEvent(this._window, 'scroll').pipe(
        map(() => this._window.pageYOffset),
        pairwise(),
        map(([prev, curr]) => Math.abs(prev - curr) > 20),
        switchMap(isFast => {
          if (isFast) {
            return of({}).pipe(throttleTime(20));
          } else {
            return of({});
          }
        }),
        map(() => {
          this.navBarExpanded = false;
          const offset = this._window.pageYOffset + this._window.screen.height / 2;
          const offsets = ['services', 'technology', 'contact'].map(id => this._document.getElementById(id).offsetTop);
          if (offset >= offsets[0] && offset < offsets[1]) {
            this.currentSection = 'services';
          } else if (offset >= offsets[1] && offset < offsets[2]) {
            this.currentSection = 'technology';
          } else if (offset >= offsets[2]) {
            this.currentSection = 'contact';
          } else {
            this.currentSection = 'offset-top';
          }
          return this._window.pageYOffset > 100;
        })
      );
      this.windowWidth = this._window.innerWidth;
    } else {
      this.beyondOffset$ = of(false);
    }
  }

  onChangeLanguage(language: string) {
    this.languageChanged.next(language);
    this.isHoveringLanguage = false;
  }

  onLanguageHover(b) {
    console.log({b});
    this.isHoveringLanguage = b;
  }

  expandNavBar() {
    this.navBarExpanded = !this.navBarExpanded;
  }


  onChangeNextLanguage() {
    this.currentLanguage() === 'en'
      ? this.onChangeLanguage('es')
      : this.onChangeLanguage('en');
  }
}

