import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  url = 'https://txvx2bx8sb.execute-api.us-east-1.amazonaws.com/dev/send'

  constructor(private http: HttpClient) { }

  sendMail(body) {
    return this.http.post(this.url, body).toPromise()
  }
}
