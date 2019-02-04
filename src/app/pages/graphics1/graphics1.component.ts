import { Component } from '@angular/core';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html'
})
export class Graphics1Component {

  graphics: any = {
    'graphic1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'title': 'El pan se come con'
    },
    'graphic2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'title': 'Entrevistados'
    },
    'graphic3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'title': '¿Le dan gases los frijoles?'
    },
    'graphic4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'title': '¿Le importa que le den gases?'
    },
  };

}
