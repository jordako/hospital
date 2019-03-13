import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  previewImage = 'no-image';
  type: string;
  id: string;

  hide = 'd-none';

  notification = new EventEmitter<any>();

  constructor() { }

  hideModal() {
    this.hide = 'd-none';
    this.type = null;
    this.id = null;
    this.previewImage = 'no-image';
  }

  showModal(type: string, id: string, previewImage: string = 'no-image') {
    this.hide = '';
    this.type = type;
    this.id = id;
    this.previewImage = previewImage;
  }
}
