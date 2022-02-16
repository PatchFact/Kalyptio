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
  
  }

  onChangeLanguage(language: string) {
    this.languageChanged.next(language);
    this.isHoveringLanguage = false;
  }

  onLanguageHover(b) {
    this.isHoveringLanguage = b;
  }

  expandNavBar() {
    this.navBarExpanded = !this.navBarExpanded;
  }

  expandNavBar2() {
    if(this.navBarExpanded){
      this.navBarExpanded = !this.navBarExpanded;
    }
  }

  onChangeNextLanguage() {
    this.currentLanguage() === 'en'
      ? this.onChangeLanguage('es')
      : this.onChangeLanguage('en');
  }
}

