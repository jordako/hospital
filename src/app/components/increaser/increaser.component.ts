import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html'
})
export class IncreaserComponent {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() progress = 50;
  @Input() legend = 'Leyenda';

  @Output() changeProgress: EventEmitter<number> = new EventEmitter();

  onChangeProgress(value: number) {
    if (this.progress >= 100 && value > 0) {
      this.progress = 100;
    } else if (this.progress <= 0 && value < 0) {
      this.progress = 0;
    } else {
      this.progress += value;
    }

    this.txtProgress.nativeElement.focus();

    this.changeProgress.emit(this.progress);
  }

  onChanges(newValue: number) {

    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    const el = <HTMLInputElement>this.txtProgress.nativeElement;
    el.value = this.progress.toString();

    this.changeProgress.emit(this.progress);
  }

}
