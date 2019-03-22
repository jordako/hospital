import { Component, OnInit } from '@angular/core';

declare function init_pluggins(): void;

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent implements OnInit {
  year: number = new Date().getFullYear();

  ngOnInit() {
    init_pluggins();
  }
}
