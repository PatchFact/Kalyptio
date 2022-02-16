import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavBarLanguage} from './components/nav-bar/nav-bar-language.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kanto-landing';
  languages = ['es', 'en'];
  languageConfig$: Observable<NavBarLanguage>;

  get defaultLang() {
    const browserLang = this.translate.getBrowserLang();
    if (this.languages.includes(browserLang)) {
      return browserLang;
    }
    return this.translate.getDefaultLang();
  }

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(this.defaultLang);
    this.languageConfig$ = this.translate.onLangChange.asObservable().pipe(
      map(() => ({
        languages: this.languages,
        currentlySelectedLanguage: this.translate.currentLang
      }))
    );
  }

  onLanguageChanged(e: string) {
    if (e === this.translate.currentLang) {
      return;
    }
    this.translate.use(e);
  }

}
