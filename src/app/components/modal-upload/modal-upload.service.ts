import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  type: string;
  id: string;

  hide = 'd-none';

  notification = new EventEmitter<any>();

  constructor() { }

  hideModal() {
    this.hide = 'd-none';
    this.type = null;
    this.id = null;
  }

  showModal(type: string, id: string) {
    this.hide = '';
    this.type = type;
    this.id = id;
  }
}
