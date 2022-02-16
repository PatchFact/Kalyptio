import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  successMessage(title) {
    Swal.fire({
      title,
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}
