import { Component } from '@angular/core';
import { SidebarService } from '../../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor( public sidebar: SidebarService ) { }

}
