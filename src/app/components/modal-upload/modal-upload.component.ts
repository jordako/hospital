import { Component, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { UploadFileService } from 'src/app/services';
import { ModalUploadService } from './modal-upload.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html'
})
export class ModalUploadComponent {

  @ViewChild('file') inputFile: ElementRef;

  uploadImage: File;
  imageTemp: string;

  constructor(
    public uploadFileService: UploadFileService,
    public modalUploadService: ModalUploadService
  ) { }

  closeModal() {
    this.uploadImage = null;
    this.imageTemp = null;
    this.inputFile.nativeElement.value = '';

    this.modalUploadService.hideModal();
  }

  onChangeFile(file: File) {
    if (!file) {
      this.uploadImage = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.uploadImage = null;
      return;
    }

    this.uploadImage = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.imageTemp = <string>reader.result;
  }

  onUploadImage() {
    this.uploadFileService.uploadFile(this.uploadImage, this.modalUploadService.type, this.modalUploadService.id)
      .subscribe(resp => {
        this.modalUploadService.notification.emit(resp);
        this.closeModal();
      });
  }

}
