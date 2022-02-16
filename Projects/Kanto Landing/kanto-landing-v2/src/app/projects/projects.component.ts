import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  

  ngOnInit() {

  }

  openPdf(project: string){
    let language = '';
    console.log(this.translate.currentLang)
    if (this.translate.currentLang === 'en') {
      language = 'ENGLISH';
    }
    else if(this.translate.currentLang === 'es'){
      language = 'ESPA';
    }
    window.open('https://kanto-landing-pdfs.s3.amazonaws.com/' + project + '_' + language + '.pdf', '_blank');
  }

}
