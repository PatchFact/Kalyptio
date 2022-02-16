import { BrowserModule } from "@angular/platform-browser";
import { NgModule, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavBarComponent } from "./home/nav-bar/nav-bar.component";
import { IntroComponent } from "./home/intro/intro.component";
import { TrustedByComponent } from "./home/trusted-by/trusted-by.component";
import { FooterComponent } from "./home/footer/footer.component";
import { ContactComponent } from "./home/contact/contact.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { ServicesComponent } from './home/services/services.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';

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
    TrustedByComponent,
    FooterComponent,
    ContactComponent,
    ServicesComponent,
    ProjectsComponent,
    HomeComponent
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
