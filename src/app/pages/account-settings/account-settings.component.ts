import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html'
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.setCheck();
  }

  onChangeTheme(theme: string) {
    this.settingsService.setTheme(theme);
    this.setCheck();
  }

  setCheck() {
    const themes: any = document.getElementsByClassName('selector');
    const theme = this.settingsService.settings.theme;

    for (const ref of themes) {
      ref.classList.remove('working');
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
      }
    }
  }

}
