import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html'
})
export class AccountSettingsComponent {

  constructor(
    @Inject(DOCUMENT) private document
  ) {}

  onChangeTheme(theme: string, link: HTMLAnchorElement) {
    this.setCheck(link);

    const url = `assets/css/colors/${theme}.css`;
    this.document.getElementById('theme').setAttribute('href', url);
  }

  setCheck(link: HTMLAnchorElement) {
    const themes: any = document.getElementsByClassName('selector');
    for (const ref of themes) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

}
