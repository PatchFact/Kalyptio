import { BrowserModule } from "@angular/platform-browser";
import { NgModule, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { IntroComponent } from "./components/intro/intro.component";
import { SecondIntroComponent } from "./components/second-intro/second-intro.component";
import { TechnologyComponent } from "./components/technology/technology.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ContactComponent } from "./components/contact/contact.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { ServicesComponent } from './components/services/services.component';

// AoT requires an exported function for factories
export function createTranslateHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function getWindow(): Window {
  return typeof window !== "undefined" ? window : null;
}

export function getDocument(): Document {
  return typeof document !== "undefined" ? document : null;
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    IntroComponent,
    SecondIntroComponent,
    TechnologyComponent,
    FooterComponent,
    ContactComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateHttpLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
  ],
  providers: [{ provide: "WINDOW", useFactory: getWindow }, { provide: "DOCUMENT", useFactory: getDocument }],
  bootstrap: [AppComponent]
})
export class AppModule {}
