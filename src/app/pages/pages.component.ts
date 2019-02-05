import { Component, OnInit } from '@angular/core';

declare function init_pluggins(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  ngOnInit() {
    init_pluggins();
  }

}
