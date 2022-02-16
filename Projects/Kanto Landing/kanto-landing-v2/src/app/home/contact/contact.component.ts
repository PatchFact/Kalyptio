import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MailingService } from 'src/app/services/mailing.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public service: string;
  public email: string;
  public contactForm: FormGroup;
  public hasSendEmail = false;

  constructor(private translate: TranslateService, 
              private mailing: MailingService,
              private swal: SwalService) { }
  
    ngOnInit() {
      this.contactForm = new FormGroup({
        service: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,7}$')]),
      })

      //this.hasSendEmail = !!localStorage.getItem('hasSendEmail')
  }

  async onSubmit(){

    this.touchForms();
    
    if(this.contactForm.status === 'INVALID'){
      return;
    }

    // todo: cloud function

    const body = {
      email: this.contactForm.controls['email'].value,
      message: this.contactForm.controls['service'].value,
      description: this.contactForm.controls['description'].value,
      lang: this.translate.currentLang
    }

    try {
      const result = await this.mailing.sendMail(body);
      this.hasSendEmail = true;
      const text = this.translate.instant('EMAIL_SENT_SUCCESS')
      this.swal.successMessage(text);
      this.contactForm.reset();
      localStorage.setItem('hasSendEmail', '1');
    } 
    catch(err) {
      console.log('error', err)
    }
    
  }

  touchForms() {
    this.contactForm.controls['email'].markAsTouched();
  }

}
