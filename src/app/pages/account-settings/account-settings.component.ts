import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html'
})
export class AccountSettingsComponent {

  constructor(
    private settingsService: SettingsService
  ) {}

  onChangeTheme(theme: string, link: HTMLAnchorElement) {
    this.setCheck(link);

    this.settingsService.setTheme(theme);
  }

  setCheck(link: HTMLAnchorElement) {
    const themes: any = document.getElementsByClassName('selector');
    for (const ref of themes) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

}
